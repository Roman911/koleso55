'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setProducts } from '@/store/slices/productsSlice';
import CatalogContent from '@/components/Catalog/CatalogContent';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';
import Pagination from '@/components/Catalog/Pagination';
import { Button, Spinner } from '@heroui/react';
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

const GetProducts: FC<Props> = (
	{
		searchParams,
		pageFrom,
		section,
		slug,
		locale,
		pageItem
	}) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { products } = useAppSelector(state => state.productsReducer);
	const [ offset, setOffset ] = useState(1);
	// const [ cachedData, setCachedData ] = useState<ProductsProps | null>(null);
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
		if(data) {
			dispatch(setProducts(data));
		}
	}, [ data ]);

	const totalCount = products?.data?.total_count ?? 0;
	const totalPages = useMemo(() => Math.ceil(totalCount / pageItem), [ totalCount, pageItem ]);
	const canShowMore = (offset + currentPage) <= totalPages;

	const handleScroll = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const { ref, inView } = useInView(
		{
			trackVisibility: true, delay: 100, threshold: 1, rootMargin: '200px'
		}
	);

	return (
		<>
			{ (isLoading || (!data && isFetching)) && <div className='fixed top-0 left-0 bottom-0 right-0 bg-white/60 dark:bg-[#222]/40 z-20'>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					<Spinner size='lg' />
				</div>
			</div> }
			<div ref={ ref }></div>
			<CatalogContent
				section={ section }
				locale={ locale }
				data={ products?.data }
				slug={ slug }
				result={ products?.result }
				isCatalog={ true }
				isFetching={ isFetching }
				isLoading={ isLoading }
			/>
			{ products && canShowMore && (
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
			{ products?.result && totalCount > pageItem && (
				<div className='mt-10'>
					<Pagination
						initialPage={ currentPage }
						offset={ offset }
						total={ totalPages }
					/>
				</div>
			) }
			{ !inView && <Button isIconOnly size='lg' onPress={ handleScroll } className='fixed z-50 right-3 md:right-12 bottom-20 md:bottom-32 bg-gray-500 text-white shadow-lg'>
				<svg xmlns="http://www.w3.org/2000/svg" width={ 24 } height={ 24 } viewBox="0 0 512 512">
					<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" fill="currentColor"/>
				</svg>
			</Button> }
		</>
	);
};

export default GetProducts;