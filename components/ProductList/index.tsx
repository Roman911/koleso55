import { FC } from 'react';
import ProductCard from './Card';
import type { Data } from '@/models/products';
import { twMerge } from 'tailwind-merge';

interface Props {
	classnames?: string
	data: Data
	isList?: boolean
}

const ProductList: FC<Props> = ({ classnames, data, isList }) => {
	const products = data.products.map(item => {
		return <ProductCard key={ item.group } item={ item } isList={ isList }/>
	})

	return (
		<div className={ twMerge('grid gap-1 lg:gap-4 -mx-5 md:mx-0', classnames) }>
			{ products }
		</div>
	)
};

export default ProductList;
