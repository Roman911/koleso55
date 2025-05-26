'use client';
import { FC, useState } from 'react';
import FilterActive from '@/components/Catalog/FilterActive';
import Tabs from '@/components/Catalog/Tabs';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';
import type { Data } from '@/models/products';

interface Props {
	section: Section
	slug?: string[]
	locale: Language
	result: boolean | undefined
	data: Data | undefined
	isCatalog?: boolean
}

const CatalogContent: FC<Props> = ({ section, slug, locale, data, result, isCatalog }) => {
	const [selected, setSelected] = useState('table');

  return (
		<>
			<div className='flex justify-between mb-2'>
				{ isCatalog && <FilterActive section={ section } locale={ locale } className='hidden lg:flex' slug={ slug } /> }
				<Tabs selected={ selected } setSelected={ setSelected } />
			</div>
			{ (result && data) ? <ProductList
				classnames={ selected === 'table' ? `grid-cols-2 lg:grid-cols-${ isCatalog ? 3 : 4 }` : 'grid-cols-1' }
				data={ data }
				isList={ selected === 'list' }
			/> : <NoResult noResultText='no result' /> }
		</>
	);
};

export default CatalogContent;
