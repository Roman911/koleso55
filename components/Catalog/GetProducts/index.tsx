'use client';
import { FC, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import CatalogContent from '@/components/Catalog/CatalogContent';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';
import Pagination from '@/components/Catalog/Pagination';
import { Button } from '@heroui/react';

interface Props {
	searchParams: string;
	pageFrom: number | null;
	pageTo: number | null;
	section: Section;
	slug?: string[];
	locale: Language;
	pageItem: number;
}

const GetProducts: FC<Props> = ({ searchParams, pageFrom, section, slug, locale, pageItem }) => {
	const t = useTranslations('Main');
	const [offset, setOffset] = useState(1);
	const currentPage = pageFrom ?? 1;
	const start = (currentPage - 1) * pageItem;
	const { data } = baseDataAPI.useFetchProductsQuery({
		id: searchParams,
		start,
		length: pageItem * offset,
	});

	console.log(data);

	const totalCount = data?.result ? data?.data.total_count : 0;
	const totalPages = useMemo(() => Math.ceil(totalCount / pageItem), [totalCount, pageItem]);
	const canShowMore = (offset + currentPage) <= totalPages;

	return (
		<>
			<CatalogContent
				section={section}
				locale={locale}
				data={data?.data}
				slug={slug}
				result={data?.result}
				isCatalog={true}
			/>

			{canShowMore && (
				<Button
					variant='bordered'
					size='lg'
					radius='sm'
					className='mt-8 w-full bg-white text-black uppercase font-bold'
					onPress={() => setOffset((prev) => prev + 1)}
				>
					{t('show more')}
				</Button>
			)}

			{data?.result && totalCount > pageItem && (
				<div className='mt-10'>
					<Pagination
						initialPage={currentPage}
						offset={offset}
						total={totalPages}
					/>
				</div>
			)}
		</>
	);
};

export default GetProducts;