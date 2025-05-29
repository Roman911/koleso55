import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IOpenFilter, Subsection } from '@/models/filter';
import { Select } from '@/components/Catalog/FilterAlt/Select';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { close, open, setScrollValue } from '@/store/slices/filterIsOpenSlice';
import type { BaseDataProps } from '@/models/baseData';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { typeDisc } from '@/components/Catalog/FilterAlt/customParamForSelector';
import { Language } from '@/models/language';

interface Props {
	filterData?: BaseDataProps
	onChange: (id: string, name: string, value: string[]) => void
}

const SectionDisks: FC<Props> = ({ filterData, onChange }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Filters');
	const locale = useLocale();
	const { filterIsOpen } = useAppSelector(state => state.filterIsOpenReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ filter.brand }`);

	const handleClickOpen = (name: keyof IOpenFilter, value: boolean) => {
		if (value) {
			dispatch(open({ key: name, value: true }));
		} else {
			dispatch(close(name));
		}
	};

	const handleScroll = (name: keyof IOpenFilter, value: number) => {
		dispatch(setScrollValue({ key: name, value }));
	}

	return (
		<>
			{ subsection === Subsection.ByParams && <>
				<Select
					id='w'
					name='width'
					label='width'
					options={ filterData?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
					variant='gray'
					onChangeAction={ onChange }
					filterValue={ filter?.width ? filter.width.split(',') : [] }
					search={ true }
					isOpened={ filterIsOpen.width.open }
					scroll={ filterIsOpen.width.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					id='d'
					name='radius'
					label='diameter'
					options={ filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || []}
					variant='gray'
					onChangeAction={ onChange }
					filterValue={ filter?.radius ? filter.radius.split(',') : [] }
					search={ true }
					isOpened={ filterIsOpen.radius.open }
					scroll={ filterIsOpen.radius.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			<Select
				id='kr'
				name='krepeg'
				label='fasteners'
				options={ data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.krepeg ? filter.krepeg.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.krepeg.open }
				scroll={ filterIsOpen.krepeg.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<SelectFromTo name='et' idMin='etfrom' idMax='etto' minus={ true } from={ -140 } to={ 500 }
										title={ `ET(${ t('departure') })` } btnTitle={ t('to apply') }/>
			<SelectFromTo name='dia' idMin='diafrom' idMax='diato' from={ 46 } to={ 500 } title='DIA'
										btnTitle={ t('to apply') }/>
			<Select
				id='td'
				name='typedisk'
				label='type'
				options={ typeDisc.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })) || []}
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.typedisk ? filter.typedisk.split(',') : [] }
				isOpened={ filterIsOpen.typedisk.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='clr'
				name='colir'
				label='color'
				options={ data?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.colir ? filter.colir.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.colir.open }
				scroll={ filterIsOpen.colir.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='b'
				name='brand'
				label='brand'
				options={ data?.brand_disc?.map(item => ({ value: item.value, label: item.label })) || []}
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.brand ? filter.brand.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.brand.open }
				scroll={ filterIsOpen.brand.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			{ filter.brand && !filter.brand.includes(',') && manufModels && manufModels.length > 0 && <Select
				id='m'
				name='model_id'
				label='model'
				options={ manufModels?.map(item => ({ value: item.value, label: item.label })) || [] }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.model_id ? filter.model_id.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.model_id.open }
				scroll={ filterIsOpen.model_id.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/> }
		</>
	)
};

export default SectionDisks;
