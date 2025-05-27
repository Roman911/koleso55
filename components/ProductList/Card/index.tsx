'use client';
import { useRouter, usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/UI/Button';
import { Card, CardBody } from '@heroui/react';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';
import { setProgress } from '@/store/slices/progressSlice';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import Rating from '@/components/UI/Rating';
import IconsBlock from '@/components/ProductList/Card/IconsBlock';
import ActionsBlock from '@/components/ProductList/Card/ActionsBlock';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import CountryInfo from '@/components/UI/CountryInfo';
import * as Icons from '@/components/UI/Icons';
import { twMerge } from 'tailwind-merge';

const regex = /\/(auto-goods|services)/;
const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];

interface Props {
	item: Product
	isList?: boolean
}

const ProductCard: FC<Props> = ({ item, isList }) => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { default_photo, full_name, sku, min_price, season, vehicle_type, page_url, best_offer, group, model } = item;
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : item.diameter ? Section.Disks : Section.Battery;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;
	const countryCode = countryCodeTransform(best_offer.country);
	const hasMatch = regex.test(pathname);
	const url = hasMatch ? `#` : `/${page_url}`;

	const handleClick = () => {
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section }));
			addToStorage('reducerCart', cart);
		}
		router.push(`/${ locale }/cart`)
	};

	return (
		<Card radius='none' className='relative group mb-[1px] p-0 shadow-sm dark:shadow-sm/20 dark:shadow-primary !transition duration-150 ease-in-out hover:shadow-xl/20 dark:hover:shadow-xl/50 hover:z-10 hover:scale-105'>
			<CardBody className={ twMerge('p-0', isList && 'flex-row align-center justify-between') }>
				<div className={ twMerge('relative min-h-32 sm:min-h-52 dark:bg-white pb-0 lg:pb-5 p-5 text-center', isList && 'min-h-24 sm:min-h-36 min-w-36 md:min-w-60') }>
					<IconsBlock season={ season } vehicle_type={ vehicle_type }/>
					{ !hasMatch && <ActionsBlock sectionNew={ sectionNew } group={ group } /> }
					<Image
						className={ twMerge('mx-auto', model.model_images.length > 0 && 'group-hover:hidden') }
						src={ default_photo || (locale === Language.UK ? '/images/no-photo.jpg' : '/images/no-photo-ru.jpg') }
						alt={ full_name }
						width={ isList ? 160 : 220 }
						height={ isList ? 160 : 220 }
					/>
					{ model.model_images.length > 0 && <Image
						className='mx-auto hidden group-hover:block'
						src={ model.model_images[0].small }
						alt={ full_name }
						width={ isList ? 160 : 220 }
						height={ isList ? 160 : 220 }
					/> }
				</div>
				<div className='px-2 md:px-5 flex flex-col'>
					<Link
						href={ url }
						onClick={ () => { dispatch(setProgress(true)) }}
						className={ twMerge('font-medium text-gray-900 dark:text-gray-50 my-1 md:my-2.5 min-h-18 md:min-h-12 after:absolute after:inset-0', isList && 'min-h-auto') }
					>
						{ full_name }
					</Link>
					<div className='text-sm text-gray-400 mb-1 md:mb-2.5'>
						<span>Артикул: </span><span>{ sku }</span>
					</div>
					{ section !== Section.Battery && <div className='my-1.5 md:my-3.5'>
						<CountryInfo
							country={ locale === Language.UK ? best_offer.country : best_offer.country_ru }
							countryCode={ countryCode }
							year={ best_offer.year }
						/>
					</div> }
					<Rating commentsCount={ undefined } commentsAvgRate={ 0 }/>
				</div>
				{ section !== Section.Battery && !isList && <div className='flex text-sm text-gray-400 mt-2 px-2 md:px-5 md:hidden'>
					<div className='lowercase'>{ t('from') }</div>
					<div className='font-bold mx-1'>{ min_price * 4 } ₴</div>
					<div>за 4 шт.</div>
				</div> }
				<div className={ twMerge('px-2 md:px-5 pt-4 pb-5', isList && 'ml-auto') }>
					<div className={ twMerge('w-full flex items-center justify-between', isList && 'flex-col h-full justify-end gap-4') }>
						<div>
							<div className='flex items-end mb-0.5 text-gray-900 dark:text-gray-50'>
								<div className='hidden md:block text-sm font-medium mb-0.5 mr-1 lowercase'>{ t('from') }</div>
								<div className='text-xl md:text-2xl font-bold'>{ min_price } ₴</div>
							</div>
							{ section !== Section.Battery && <div className='hidden md:flex text-sm text-gray-400'>
								<div className='lowercase'>{ t('from') }</div>
								<div className='font-bold mx-1'>{ min_price * 4 } ₴</div>
								<div>за 4 шт.</div>
							</div> }
						</div>
						<Button onPress={ handleClick } aria-label={ t('cart') } className='min-w-16 md:min-w-24'>
							<Icons.CartIcon className='stroke-white'/>
						</Button>
					</div>
				</div>
			</CardBody>
		</Card>
	)
};

export default ProductCard;
