'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import CatalogContent from '@/components/Catalog/CatalogContent';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';
import Pagination from '@/components/Catalog/Pagination';
import { Button } from '@heroui/react';
import { ProductsProps } from '@/models/products';

interface Props {
	searchParams: string;
	pageFrom: number | null;
	pageTo: number | null;
	section: Section;
	slug?: string[];
	locale: Language;
	pageItem: number;
}

const GetProducts: FC<Props> = ({
																	searchParams,
																	pageFrom,
																	section,
																	slug,
																	locale,
																	pageItem
																}) => {
	const t = useTranslations('Main');
	const [ offset, setOffset ] = useState(1);
	const [ cachedData, setCachedData ] = useState<ProductsProps | null>(null);

	const currentPage = pageFrom ?? 1;
	const start = (currentPage - 1) * pageItem;

	const {
		data,
		isFetching,
		isLoading
	} = baseDataAPI.useFetchProductsQuery({
		id: searchParams,
		start,
		length: pageItem * offset,
	});

	useEffect(() => {
		if(data?.result) {
			setCachedData(data);
		}
	}, [ data ]);

	const totalCount = cachedData?.data?.total_count ?? 0;
	const totalPages = useMemo(() => Math.ceil(totalCount / pageItem), [ totalCount, pageItem ]);
	const canShowMore = (offset + currentPage) <= totalPages;

	return (
		<>
			<CatalogContent
				section={ section }
				locale={ locale }
				data={ cachedData?.data }
				slug={ slug }
				result={ cachedData?.result }
				isCatalog={ true }
				isFetching={ isFetching }
				isLoading={ isLoading }
			/>

			{ cachedData && canShowMore && (
				<Button
					variant='bordered'
					size='lg'
					radius='sm'
					className='mt-8 w-full bg-white text-black uppercase font-bold'
					onPress={ () => setOffset((prev) => prev + 1) }
				>
					{ t('show more') }
				</Button>
			) }

			{ cachedData?.result && totalCount > pageItem && (
				<div className='mt-10'>
					<Pagination
						initialPage={ currentPage }
						offset={ offset }
						total={ totalPages }
					/>
				</div>
			) }
		</>
	);
};

export default GetProducts;