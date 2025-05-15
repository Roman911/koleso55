'use client'
import { FC, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { ScrollShadow } from '@heroui/scroll-shadow';
import CartItem from './CartItem';
import type { ProductsProps } from '@/models/products';
import { Language } from '@/models/language';
import Button from '@/components/UI/Button';

const totalQuantityLabel = {
	1: {
		uk: 'товар на суму:',
		ru: 'товар на сумму',
	},
	2: {
		uk: 'товара на суму:',
		ru: 'товара на сумму',
	},
	3: {
		uk: 'товарів на суму:',
		ru: 'товаров на сумму:',
	},
};

interface CarProps {
	data: ProductsProps | undefined
	removeProduct: (id: number) => void
	cartItems: { id: number; quantity: number }[]
	setQuantity: (id: number, quantity: number) => void
	isCartPage?: boolean
}

const CartComponent: FC<CarProps> = ({ data, cartItems, removeProduct, setQuantity, isCartPage }) => {
	const router = useRouter();
	const [ minQuantity, setMinQuantity ] = useState(false);
	const locale = useLocale();
	const lang = locale === Language.UK ? Language.UK : Language.RU;
	const t = useTranslations('Cart');
	const items = data?.data.products.map(item => {
		const id = item.best_offer.id;
		const price = item.best_offer.price;
		const quantity = cartItems.find(i => i.id === id)?.quantity;

		return { id, price, quantity }
	});

	const totalQuantity = items?.length;
	const totalQuantityPrice = items?.reduce((sum, item) => sum + (item.quantity ?? 0) * parseFloat(item.price), 0);

	const handleClick = () => {
		if(minQuantity) return;
		router.push(`/order`);
	}

	return <>
		<div className='flex flex-col p-2 rounded-sm gap-6'>
			<ScrollShadow className='max-h-[400px] border rounded-md border-gray-300 px-4'>
				{ data?.data.products.map((item, index) => {
					const quantity = cartItems?.find(i => i.id === item.best_offer.id)?.quantity || 1;
					return <CartItem
						key={ item.group }
						id={ item.best_offer.id }
						pageUrl={ item.page_url }
						quantity={ quantity }
						sku={ item.sku }
						default_photo={ item.default_photo }
						full_name={ item.full_name }
						price={ item.best_offer.price }
						country={ item.best_offer.country }
						country_ru={ item.best_offer.country_ru }
						year={ item.best_offer.year }
						offerQuantity={ item.offers[0]?.quantity }
						removeProduct={ removeProduct }
						setQuantity={ setQuantity }
						locale={ locale }
						isBattery={ !!item.jemnist }
						setMinQuantity={ setMinQuantity }
						isLastItem={ data ? data.data.products.length === index + 1 : true }
					/>
				}) }
			</ScrollShadow>
			<div className='w-full lg:w-80 px-5 h-max ml-auto pb-2'>
				<div className='flex justify-between text-lg'>
					<div>
						{ totalQuantity }
						{ ' ' }
						{
							totalQuantity === 1
								? totalQuantityLabel[1][lang]
								: (totalQuantity && totalQuantity > 1 && totalQuantity < 5)
									? totalQuantityLabel[2][lang]
									: totalQuantityLabel[3][lang]
						}
					</div>
					<div>{ totalQuantityPrice } ₴</div>
				</div>
				<div className='font-bold text-lg mt-4 flex justify-between'>
					<div>{ t('total payable') }:</div>
					<div>{ totalQuantityPrice } ₴</div>
				</div>
				{ isCartPage && <div className='mt-6 flex justify-end'>
					<Button onPress={ handleClick }>
						{ t('place an order') }
					</Button>
				</div> }
			</div>
		</div>
		<div className='flex justify-end border-t border-gray-200 py-6 gap-4'>
			<Button variant='bordered' color='default'
							className='uppercase font-bold hidden lg:block text-black dark:text-gray-50'
							onPress={ handleClick }>
				{ t('continue shopping') }
			</Button>
			<Button className='uppercase font-bold' onPress={ handleClick }>
				{ t('place an order') }
			</Button>
		</div>
	</>
};

export default CartComponent;
