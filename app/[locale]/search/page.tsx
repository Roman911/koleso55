'use client'
import Head from 'next/head';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Pagination } from '@heroui/react';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { Section } from '@/models/filter';
import CatalogContent from '@/components/Catalog/CatalogContent';
import { Language } from '@/models/language';

const itemsProduct = 12;

export default function Search() {
	const locale = useLocale();
	const t = useTranslations('Search');
	const [ paginateCount, setPaginateCount ] = useState(0);
	const { search } = useAppSelector(state => state.searchReducer);
	const { data } = baseDataAPI.useFetchProductsQuery({
		id: `?name=${ search }`,
		length: itemsProduct,
		start: paginateCount > 0 ? (paginateCount -1) * itemsProduct : 0
	});

	const path = [
		{
			title: t('search'),
			href: '/'
		}
	]

	const onchange = (page: number) => {
		setPaginateCount(page)
	}

	return <LayoutWrapper>
		<Head>
			<title>{ t('search') }</title>
		</Head>
		<Breadcrumbs path={ path }/>
		<Title title={ t('search') } />
		<CatalogContent section={ Section.Tires } locale={ locale as Language } result={ data?.result } data={ data?.data } />
		{ data?.result && data.data.total_count > itemsProduct && <div className='mt-10 flex justify-start'>
			<Pagination
				size='lg'
				initialPage={ paginateCount + 1 }
				total={ Math.ceil(data?.data.total_count / itemsProduct) }
				variant='bordered'
				onChange={ onchange }
				radius='sm'
			/>
		</div> }
	</LayoutWrapper>
};
