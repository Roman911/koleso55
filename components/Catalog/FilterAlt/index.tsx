'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Drawer, DrawerContent, useDisclosure } from '@heroui/react';
import { useAppSelector } from '@/hooks/redux';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import { Section } from '@/models/filter';
import type { BaseDataProps } from '@/models/baseData';
import { baseDataAPI } from '@/services/baseDataService';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import FilterBtn from '@/components/Catalog/FilterByCar/FilterBtn';
import SectionTires from '@/components/Catalog/FilterAlt/SectionTires';
import SectionDisks from '@/components/Catalog/FilterAlt/SectionDisks';
import SectionBattery from '@/components/Catalog/FilterAlt/SectionBattery';

interface Props {
	filterData: BaseDataProps | undefined;
	section: Section;
	car: string | null;
}

const FilterAlt: FC<Props> = ({ filterData, section, car }) => {
	const router = useRouter();
	const path = usePathname();
	const t = useTranslations('Filters');
	const { subsection } = useAppSelector(state => state.filterReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const updateParamInUrl = (url: string, param: string, newValue: string): string => {
		const regex = new RegExp(`${param}-\\d+(,\\d+)*`, 'g');
		return url.replace(regex, `${ param }-${ newValue }`);
	};

	const onChange = (id: string, name: string, value: string[]) => {
		let newPath = path;
		const hasParam = path.includes(`${ id }-`);
		const lastValue = value.at(-1);

		const removeParamSegment = (url: string, param: string) =>
			url.replace(new RegExp(`/${param}-[^/]+`), '');

		const removeSegment = (url: string, segment: string) =>
			url.split('/').filter(s => s !== segment).join('/');

		if(name === 'sezon' && !value.includes('2')) {
			newPath = removeSegment(newPath, 'stud-1');
		}

		if(name === 'vehicle_type') {
			newPath = removeParamSegment(newPath, id);

			if(lastValue) {
				newPath = `${ newPath }/${ id }-${ lastValue }`;
			}
			router.push(newPath);
			return;
		}

		if(value.length === 0) {
			newPath = removeParamSegment(newPath, id);
		} else if(hasParam) {
			newPath = updateParamInUrl(newPath, id, value.join(','));
		} else {
			newPath = `${ newPath }/${ id }-${ value.join(',') }`;
		}

		router.push(newPath);
	};

	const renderFilterContent = () => (
		<>
			{ section !== Section.Battery && <SwitchTabs section={ section } car={ car }/> }
			<div
				className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto lg:overflow-y-visible dark:border-[#333333] dark:bg-[#333333]'>
				{ section !== Section.Battery && <SwitchTabsByParams subsection={ subsection }/> }
				{ subsection === 'byCars' && <ByCar data={ data } car={ car } section={ section }/> }
				{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData }/> }
				{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData }/> }
				{ section === Section.Battery && <SectionBattery onChange={ onChange }/> }
				<SelectFromTo
					name='price'
					idMin='pfrom'
					idMax='pto'
					from={ 200 }
					to={ 10000 }
					title={ `${ t('price range') } (грн)` }
					btnTitle={ t('to apply') }
				/>
			</div>
		</>
	);

	return (
		<div className='w-72'>
			<FilterBtn openFilter={ onOpen } title={ t('filters') }/>
			<div className='hidden lg:block'>{ renderFilterContent() }</div>
			<Drawer isOpen={ isOpen } radius='none' placement='left' onOpenChange={ onOpenChange }>
				<DrawerContent>{ renderFilterContent() }</DrawerContent>
			</Drawer>
		</div>
	);
};

export default FilterAlt;
