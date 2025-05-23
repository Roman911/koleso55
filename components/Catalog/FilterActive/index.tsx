import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Language } from '@/models/language';
import * as Icons from '../../UI/Icons';
import { Section } from '@/models/filter';
import { Link } from '@/i18n/routing';
import { twMerge } from 'tailwind-merge';
import { SeasonTransform, VehicleTypeTransform } from '@/lib/characteristicsTransform';

interface FilterActiveProps {
	locale: Language
	className: string
	slug?: string[]
	section: Section
}

const FilterActive: FC<FilterActiveProps> = ({ className, slug, section }) => {
	const t = useTranslations('Filters');

	const renderItem = (key: number, value: string, label: string) => {
		return (
			<div key={ key }
					 className="p-1 bg-[#393939] text-white text-sm font-medium rounded-full flex items-center gap-1">
				<span className="ml-1.5">{ label }</span>
				<Link href={ `/catalog/${section}/${slug?.filter(item => item !== value).join('/')}` } className='bg-[#A8AFB6] rounded-full p-1'>
					<Icons.CloseIcon className="stroke-[#393939] h-3 w-3"/>
				</Link>
			</div>
		);
	};

	return (
		<div
			className={
				twMerge('mb-3 flex-wrap justify-end gap-x-2 gap-y-3 lg:gap-4 text-end lg:bg-transparent p-4 lg:p-0', className,
					slug?.length !== 0 && 'bg-blue-50')
			}>
			{ slug && slug.length !== 0 && slug?.map((item, key) => {
				const split = item.split('-') || '';

				if(split && split[0] === 's') {
					return renderItem(key, item, t(SeasonTransform(split[1])?.name || '1'))
				}

				if(split && split[0] === 'vt') {
					return renderItem(key, item, t(VehicleTypeTransform(split[1])?.name || '1'))
				}

				return renderItem(key, item, split[1])
			}) }
			{ slug && slug.length !== 0 &&
				<Link href={ `/catalog/${section}` }>
					<button className='flex items-center gap-2 text-sm font-medium group text-gray-400'>
						<span className='underline'>
							{ t('reset everything') }
						</span>
						<span className='bg-gray-400 rounded-full p-1.5 hidden lg:block'>
							<Icons.CloseIcon className='stroke-white h-3 w-3'/>
						</span>
					</button>
				</Link> }
		</div>
	)
};

export default FilterActive;
