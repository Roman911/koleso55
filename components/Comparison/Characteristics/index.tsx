'use client'
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { characteristics } from './characteristics';
import { SeasonTransform, VehicleTypeTransform } from '@/lib/characteristicsTransform';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';

interface Item {
	season: string | false
	vehicle_type: string | false
	width: string | false
	height: string | false
	diameter: string | false
	homologation: string | false
}

interface CharacteristicsProps {
	name: 'tires' | 'cargo' | 'disks' | 'battery'
	item: Product
	params: string[]
}

const Item = ({ content, param }: { content: string, param: string }) => {
	return <>
		<div className='h-11 leading-[44px] bg-[#D0D4D9] text-black'>
			{ param }
		</div>
		<div className='h-11 leading-[44px]'>
			{ content }
		</div>
	</>
}

export const Characteristics: FC<CharacteristicsProps> = ({ name, item, params  }) => {
	const { locale } = useParams<{ locale: Language }>();
	const t = useTranslations('Filters');

	return characteristics[name].map((i, index) => {
		if(i === 'season') {
			return <Item key={ index } content={ item.season ? t(SeasonTransform(item.season)?.name || '-') : '-' } param={ t(params[index]) } />
		} else if(i === 'vehicle_type') {
			return <Item key={ index } content={ item.vehicle_type ? t(VehicleTypeTransform(item.vehicle_type)?.name || '-') : '-' } param={ t(params[index]) } />
		} else if(i === 'country') {
			return <Item key={ index } content={ item.best_offer.country ? locale === Language.UK ? item.best_offer.country : item.best_offer.country_ru : '-' } param={ t(params[index]) } />
		} else if(i === 'price') {
			return <div key={ index } className='h-11 leading-[44px] font-bold bg-black text-white mx-1'>
				{ item.best_offer.price } ₴
			</div>
		} else if(i === 'load_index') {
			return <Item key={ index } content={ (item.load_index && item.load_index_ru) ? locale === Language.UK ? item.load_index : item.load_index_ru : '-' } param={ t(params[index]) } />
		} else if(i === 'speed_index') {
			return <Item key={ index } content={ (item.speed_index && item.speed_index_ru) ? locale === Language.UK ? item.speed_index : item.speed_index_ru : '-' } param={ t(params[index]) } />
		} else if(i === 'strengthening') {
			return <Item key={ index } content={ item.run_flat ? 'RunFlat' : '-' } param={ t(params[index]) } />
		}
		return <Item key={index} content={item[i as keyof Item] || '-'} param={ t(params[index]) } />
	})
};
