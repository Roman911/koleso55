import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/UI/Button';
import { Link } from '@/i18n/routing';
import { Language } from '@/models/language';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import CountryInfo from '@/components/UI/CountryInfo';
import Quantity from '@/components/UI/Quantity';
import { twMerge } from 'tailwind-merge';
import { Alert } from '@heroui/alert';
import { useTranslations } from 'next-intl';

interface CartItemProps {
	id: number
	pageUrl: string
	quantity: number
	default_photo: string
	full_name: string
	price: string
	sku: number
	country: string
	country_ru: string
	year: number
	locale: string
	offerQuantity: number,
	isLastItem: boolean
	isBattery: boolean
	setMinQuantity: Dispatch<SetStateAction<boolean>>
	removeProduct: (id: number) => void
	setQuantity: (id: number, quantity: number) => void
}

const CartItem: FC<CartItemProps> = (
	{
		id,
		pageUrl,
		quantity,
		default_photo,
		full_name,
		price,
		sku,
		country,
		country_ru,
		year,
		offerQuantity,
		setQuantity,
		removeProduct,
		locale,
		isBattery,
		isLastItem,
		setMinQuantity
	}) => {
	const t = useTranslations('Main');

	useEffect(() => {
		if(!isBattery && (quantity === 1 || quantity === 3)) {
			setMinQuantity(true);
		} else {
			setMinQuantity(false);
		}
	}, [quantity]);

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(id,numericValue < offerQuantity ? numericValue : offerQuantity);
	}

	return <div className={ twMerge('relative flex flex-col lg:flex-row py-4 items-center border-b border-gray-300', isLastItem && 'border-b-0') }>
		{ !isBattery && (quantity === 1 || quantity === 3) && <div className='flex items-center justify-center absolute -bottom-2 right-0'>
			<Alert radius='sm' description={ t('minimum quantity of goods') } title={ t('warning') } className='shadow-md py-1.5 px-2.5' />
		</div> }
		<Link href={`/${pageUrl}`}>
			<Image src={ default_photo } height={ 122 } width={ 122 } alt={ full_name } />
		</Link>
		<div className='flex flex-col lg:flex-row justify-between items-center w-full ml-4 pr-4 mt-4 lg:mt-0 lg:pr-0'>
			<div className='flex-1'>
				<Link href={ `/${pageUrl}` } className='font-bold lg:text-medium hover:text-primary transition'>
					{ full_name }
				</Link>
				<div className='font-bold text-lg mt-2'>{ price } ₴/шт.</div>
				<div className='text-sm text-gray-500 mt-1'>Арт: { sku }</div>
				<div className='country mt-2 lg:col-span-4'>
					{ (country || year) && <CountryInfo
						country={ country }
						countryCode={ countryCodeTransform( locale === Language.UK ? country : country_ru) }
						year={ year }
					/> }
				</div>
			</div>
			<div className='flex flex-col items-end mt-6 lg:mt-3 mr-4 gap-4'>
				<Quantity
					id={ id }
					price={ price }
					quantity={ quantity }
					offerQuantity={ offerQuantity }
					onChange={ onChange }
					setQuantity={ setQuantity }
				/>
			</div>
		</div>
		<Button
			isIconOnly
			variant='light'
			onPress={() => removeProduct(id)}
			className='absolute top-4 right-0 lg:right-3 p-2'
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-4 h-4 fill-gray-500'>
				<path
					d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
			</svg>
		</Button>
	</div>
};

export default CartItem;
