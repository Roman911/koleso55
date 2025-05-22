'use client'
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import ImagesBlock from './ImagesBlock';
import { useAppDispatch } from '@/hooks/redux';
import { Language } from '@/models/language';
import { ProductProps } from '@/models/product';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import ActionsBlock from '@/components/Product/ActionsBlock';
import { Section } from '@/models/filter';
import Rating from '@/components/UI/Rating';
import Quantity from '@/components/UI/Quantity';
import DeliveryCalculation from '@/components/Product/DeliveryCalculation';
import { addCart } from '@/store/slices/cartSlice';
import CharacteristicsBlock from '@/components/Product/CharacteristicsBlock';
import InfoBlock from '@/components/Product/InfoBlock';
import { SettingsProps } from '@/models/settings';
import './index.scss';
import Offers from '@/components/Product/Offers';
import BuyActions from '@/components/Product/BuyActions';

interface Props {
	idProduct: string
	locale: Language
	data: ProductProps
	section: Section
	settings: SettingsProps
}

const ProductComponent: FC<Props> = ({ idProduct, locale, data, section, settings }) => {
	const dispatch = useAppDispatch();
	const [ offerId, setOfferId ] = useState(0);
	const [ quantity, setQuantity ] = useState(1);
	const t = useTranslations('Main');
	const { id = 0, full_name = '', offers = [], min_price = 0, photo, model, labels, offer_group } = data?.data || {};
	const offer = offers.find(item => item.offer_id === offerId);
	const review = data?.data.review;
	const commentsAvgRateSum = review && review.length > 0
		? review.reduce((sum, current) => sum + (current.score || 0), 0) : 0;
	const averageScore = review && review.length > 0 ? commentsAvgRateSum / review.length : undefined;

	useEffect(() => {
		const storage = getFromStorage('reducerRecentlyViewed');
		const updatedStorage = storage.filter((item: { id: number, section: Section }) => item.id !== Number(idProduct));
		const deleteElement = updatedStorage.length === 4 ? updatedStorage.slice(1, 3) : updatedStorage;
		addToStorage('reducerRecentlyViewed', [ ...deleteElement, { id: idProduct, section: section } ]);
	}, [id, idProduct, section]);

	useEffect(() => {
		if(data) setOfferId(data.data.offers[0].offer_id);
	}, [ data ]);

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < Number(offer?.quantity) ? numericValue : Number(offer?.quantity));
	}

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const onSubmit = () => {
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: offerId, section, quantity } ];
		dispatch(addCart({ id: offerId, section, quantity }));
		addToStorage('reducerCart', cart);
	}

	return (
		<section className='product-page flex flex-col lg:flex-row justify-between gap-1 xl:gap-x-6 mt-4 md:mt-6'>
			<div className='max-w-[900px] flex-1 md:pr-3 xl:pr-5'>
				{ data.result &&
					<div className='flex flex-col md:flex-row items-center md:items-start md:border-b border-gray-200'>
						<ImagesBlock
							labels={ labels }
							locale={ locale }
							images={ data.data.photos.urls || [] }
							photo={ photo }
							full_name={ full_name }
							vehicle_type={ data.data.offer_group.vehicle_type }
							season={ model.season }
						/>
						<ActionsBlock className='flex md:hidden' id={ id } section={ section } quantity={ quantity } />
						<div className='flex-1 md:ml-6 xl:ml-10'>
							<h1 className='text-2xl font-bold mt-8 md:mt-0'>{ full_name }</h1>
							<div className='flex mt-5 items-center'>
								<div className='text-[15px] text-[#707680] bg-gray-200 rounded-full py-1 px-3 mr-5 dark:bg-gray-500 dark:text-gray-50'>
									Артикул: { offer_group?.sku }
								</div>
								<Rating
									commentsCount={ review ? (review.length > 0 ? review.length : undefined) : undefined }
									commentsAvgRate={ averageScore || 0 }
								/>
							</div>
							<div className='flex justify-between mt-7 md:mt-8'>
								<div>
									<div className='flex items-end'>
										<div className='mr-2.5 text-xl font-medium lowercase'>{ t('from') }</div>
										<div className='text-4xl font-bold mr-2.5'>{ min_price } ₴</div>
										<div className='text-xl font-medium'>/шт.</div>
									</div>
								</div>
								<ActionsBlock className='hidden md:flex' id={ id } section={ section } quantity={ quantity } />
							</div>
							<Offers locale={ locale } offerId={ offerId } offers={ offers } setOfferId={ setOfferId } setQuantity={ setQuantity } />
						</div>
					</div> }
				<div className='purchase-information grid justify-self-stretch mt-5 md:mt-10'>
					<div className='mb-4 md:mb-0'>
						<Quantity id={ 0 } quantity={ quantity } offerQuantity={ (Number(offer?.quantity) || 0) }
											price={ offer?.price } onChange={ onChange } setQuantity={ onSetQuantity }/>
						<DeliveryCalculation offer_id={ offerId } quantity={ quantity } setQuantity={ setQuantity } price={ offer ? +offer?.price : 0 } />
					</div>
					<BuyActions offerId={ +offerId } quantity={ quantity } section={ section } onSubmit={ onSubmit } data={ data } />
				</div>
				<CharacteristicsBlock locale={ locale } data={ data } section={ section } />
			</div>
			<InfoBlock settings={ settings } />
		</section>
	)
};

export default ProductComponent;
