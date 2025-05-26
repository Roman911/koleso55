import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Language } from '@/models/language';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
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
	const { filter } = useAppSelector(state => state.filterReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ filter.brand }`);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');

	const renderItem = (key: number, id: string, value: string, label: string) => {
		const cleanArray = (arr: string[]): string[] => {
			return arr.reduce((acc: string[], item: string) => {
				if(item.startsWith(`${ id }-`)) {
					const values = decodeURIComponent(item).slice(2).split(',');
					if(values.length > 1) {
						const filtered = values.filter(v => v !== value);
						if(filtered.length) {
							acc.push(`${ id }-${ filtered.join(',') }`);
						}
					}
				} else {
					acc.push(item);
				}
				return acc;
			}, []);
		};

		return (
			<div key={ key }
					 className="p-1 bg-[#393939] text-white text-sm font-medium rounded-full flex items-center gap-1">
				<span className="ml-1.5">{ label }</span>
				<Link href={ `/catalog/${ section }/${ slug?.length ? cleanArray(slug).join('/') : '' }` }
							className='bg-[#A8AFB6] rounded-full p-1'>
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
			{ slug && slug.length !== 0 && slug?.map((item) => {
				const split = item.split('-') || '';

				if(split && split[0] === 's') {
					return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, t(SeasonTransform(i)?.name || '1')))
				}

				if(split && split[0] === 'vt') {
					return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, t(VehicleTypeTransform(i)?.name || '1')));
				}

				if(split && split[0] === 'b') {
					if(section === Section.Tires) {
						return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, data?.brand.find(b => b.value === +i)?.label || '1'));
					}
					if(section === Section.Disks) {
						return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, data?.brand_disc.find(b => b.value === +i)?.label || '1'));
					}
					if(section === Section.Battery) {
						return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, dataAkum?.brand_akum.find(b => b.value === +i)?.label || '1'));
					}
				}

				if(split && split[0] === 'm') {
					return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, manufModels?.find(b => b.value === +i)?.label || '1'));
				}

				return decodeURIComponent(split[1]).split(',').map((i, key) => renderItem(key, split[0], i, i))
			}) }
			{ slug && slug.length !== 0 &&
				<Link
					href={ `/catalog/${ section }` }
					className='flex items-center gap-2 text-sm font-medium group text-gray-400'
				>
					<span className='underline'>
						{ t('reset everything') }
					</span>
					<span className='bg-gray-400 rounded-full p-1.5 hidden lg:block'>
						<Icons.CloseIcon className='stroke-white h-3 w-3'/>
					</span>
				</Link> }
		</div>
	)
};

export default FilterActive;
