'use client';
import { FC, useState } from 'react';
import FilterActive from '@/components/Catalog/FilterActive';
import Tabs from '@/components/Catalog/Tabs';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';
import type { Data } from '@/models/products';
import { Spinner } from '@heroui/react';

interface Props {
	section: Section
	slug?: string[]
	locale: Language
	result: boolean | undefined
	data: Data | undefined
	isCatalog?: boolean
	isLoading: boolean
	isFetching: boolean
}

const CatalogContent: FC<Props> = ({ section, slug, locale, data, result, isCatalog, isFetching, isLoading }) => {
	const [selected, setSelected] = useState('table');

  return (
		<>
			<div className='flex justify-between mb-2'>
				{ isCatalog && <FilterActive section={ section } locale={ locale } className='hidden lg:flex' slug={ slug } /> }
				<Tabs selected={ selected } setSelected={ setSelected } />
			</div>
			{ (isLoading || (!data && isFetching)) && (
				<div className='my-10 h-96 flex items-center justify-center'>
					<Spinner size='lg' />
				</div>
			)}
			{ !result && !isLoading && !isFetching && !data && <NoResult noResultText='no result' /> }
			{ (result && data) && <ProductList
				classnames={ selected === 'table' ? `grid-cols-2 lg:grid-cols-${ isCatalog ? 3 : 4 }` : 'grid-cols-1' }
				data={ data }
				isList={ selected === 'list' }
			/> }
		</>
	);
};

export default CatalogContent;
