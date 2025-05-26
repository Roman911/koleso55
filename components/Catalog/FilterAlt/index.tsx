'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
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
	filterData: BaseDataProps | undefined
	section: Section
	car: string | null
}

const FilterAlt: FC<Props> = ({ filterData, section, car }) => {
	const router = useRouter();
	const path = usePathname();
	const t = useTranslations('Filters')
	const { subsection } = useAppSelector(state => state.filterReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const updateParamInUrl = (url: string, param: string, newValue: string): string => {
		const regex = new RegExp(`${param}-\\d+(,\\d+)*`, 'g');
		return url.replace(regex, `${param}-${newValue}`);
	}

	const onChange = (id: string, name: string, value: string[]) => {
		const regex = new RegExp(`/${id}-[^/]+`);

		if(value.length === 0) {
			router.push(`${path.replace(regex, '')}`);
		} else if(path.includes(`${id}-`)) {
			router.push(updateParamInUrl(path, id, value.join(',')));
		} else {
			router.push(`${path}/${id}-${ value.join(',')}`);
		}
	}

	return (
		<div className='w-72'>
			<FilterBtn openFilter={ onOpen } title={ t('filters') }/>
			<div className='hidden lg:block'>
				{ section !== Section.Battery && <SwitchTabs section={ section } car={ car }/> }
				<div
					className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto lg:overflow-y-visible dark:border-[#333333] dark:bg-[#333333]'>
					{ section !== Section.Battery && <SwitchTabsByParams subsection={ subsection }/> }
					{ subsection === 'byCars' && <ByCar data={ data } car={ car } section={ section }/> }
					{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData }/> }
					{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData }/> }
					{ section === Section.Battery && <SectionBattery onChange={ onChange }/> }
					<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
												title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
				</div>
			</div>
			<Drawer isOpen={ isOpen } radius='none' placement='left' onOpenChange={ onOpenChange }>
				<DrawerContent>
					{ () => (
						<>
							<SwitchTabs section={ section } car={ car }/>
							<div
								className='relative pb-32 lg:pb-4 px-4 pt-4 z-10 overflow-y-auto lg:overflow-y-visible dark:bg-[#333333]'>
								<SwitchTabsByParams subsection={ subsection }/>
								{ subsection === 'byCars' && <ByCar data={ data } car={ car } section={ section }/> }
								{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData }/> }
								{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData }/> }
								{ section === Section.Battery && <SectionBattery onChange={ onChange }/> }
								<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
															title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
							</div>
						</>
					) }
				</DrawerContent>
			</Drawer>
		</div>
	)
};

export default FilterAlt;
