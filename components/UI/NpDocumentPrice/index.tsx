'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import Spinner from '@/components/UI/Spinner';

const postpaid = {
	const: 20,
	cof: 1.02
};

interface NpDocumentPriceProps {
	offer_id: number | undefined
	quantity: number
	price: number
}

const NpDocumentPrice: FC<NpDocumentPriceProps> = ({ offer_id, quantity, price }) => {
	const { city } = useAppSelector(state => state.orderReducer);
	const { data, isLoading } = baseDataAPI.useFetchNpDocumentPriceQuery({ offer_id, ref: city.value, count: quantity });
	const t = useTranslations('Delivery');
	const totalPrice = price * quantity;
	const num = (e: number) => {
		return (e % 1) === 0 ? e.toFixed(0) : e.toFixed(2);
	}

	return <Spinner height='h-40' show={ isLoading }>
		<p className='mt-4'>
			{ `${ t('estimated shipping') } ${ quantity } шт.` }
		</p>
		<h3 className="text-base font-semibold leading-6 mt-6">
			{ t('cost') + ':' } { data?.length && data[0].Cost } грн
		</h3>
		<h3 className="text-base font-semibold leading-6 mt-3">
			{ t('with cash') + ': ' }
			{ num(totalPrice * postpaid.cof + postpaid.const + (data?.length && data[0].Cost)) } грн
		</h3>
	</Spinner>
};

export default NpDocumentPrice;
