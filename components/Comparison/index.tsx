import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import CloseButton from '@/components/UI/CloseButton';
import { ItemWrapper } from './ItemWrapper';
import { batteryParams, disksParams, tiresParams } from './params';
import type { Product } from '@/models/products';

interface ComparisonProps {
	defaultTab: string
	tires: Product[]
	cargo: Product[]
	disks: Product[]
	battery: Product[]
	resetEverything: () => void
	handleClick: (id: number) => void
	onClick: (offerId: number, section: string) => void
}

const ComparisonComponent: FC<ComparisonProps> = (
	{
		defaultTab,
		tires,
		cargo,
		disks,
		battery,
		resetEverything,
		handleClick,
		onClick
	}) => {
	const t = useTranslations('Filters');
	const [ tab, setTab ] = useState<string>('tires');

	useEffect(() => {
		setTab(defaultTab);
	}, [ defaultTab ]);

	const tabRender = (name: string, length: number) => {
		return <button
			onClick={ () => setTab(name) }
			className={
				twMerge('font-semibold text-lg py-2 relative hover:text-[#575C66] group transition text-[#575C66]', tab !== name && 'text-primary')
			}>
			{ t(name) } ({ length })
			<div className={
				twMerge('w-full h-0.5 absolute bottom-0 group-hover:bg-[#575C66] bg-[#575C66]', tab !== name && 'bg-transparent')
			}/>
		</button>
	}

	return <section className='comparison mt-4 md:mt-8'>
		<div className='flex gap-x-4 md:gap-x-8 mb-6'>
			{ tires.length > 0 && tabRender('tires', tires.length) }
			{ cargo.length > 0 && tabRender('cargo', cargo.length) }
			{ disks.length > 0 && tabRender('disks', disks.length) }
			{ battery.length > 0 && tabRender('battery', battery.length) }
		</div>
		<div className='relative pt-9 md:pt-2 pb-2 w-32 mb-4 text-sm'>
			{ t('reset everything') }
			<CloseButton handleClick={ resetEverything }/>
		</div>
		<div className='flex overflow-x-auto overflow-y-hidden whitespace-nowrap max-w-full'>
			{ tab === 'tires' && <ItemWrapper characteristics={ tires } name={ 'tires' } tab={ tab } onClickAction={ onClick } handleClickAction={ handleClick } params={ tiresParams }/> }
			{ tab === 'cargo' && <ItemWrapper characteristics={ cargo } name={ 'cargo' } tab={ tab } onClickAction={ onClick } handleClickAction={ handleClick } params={ tiresParams }/> }
			{ tab === 'disks' && <ItemWrapper characteristics={ disks } name={ 'disks' } tab={ tab } onClickAction={ onClick } handleClickAction={ handleClick } params={ disksParams }/> }
			{ tab === 'battery' && <ItemWrapper characteristics={ battery } name={ 'battery' } tab={ tab } onClickAction={ onClick } handleClickAction={ handleClick } params={ batteryParams }/> }
		</div>
	</section>
};

export default ComparisonComponent;
