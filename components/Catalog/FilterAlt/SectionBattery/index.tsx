import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '@/components/Catalog/FilterAlt/Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { close, open, setScrollValue } from '@/store/slices/filterIsOpenSlice';
import { baseDataAPI } from '@/services/baseDataService';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { IOpenFilter } from '@/models/filter';

interface Props {
	onChange: (id: string, name: string, value: string[]) => void
}

const SectionBattery: FC<Props> = ({ onChange }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Filters');
	const { filterIsOpen } = useAppSelector(state => state.filterIsOpenReducer);
	const { filter } = useAppSelector(state => state.filterReducer);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
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
			<Select
				id='ct'
				name='jemnist'
				label='capacity ah'
				options={ dataAkum?.jemnist.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.jemnist ? filter.jemnist.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.jemnist.open }
				scroll={ filterIsOpen.jemnist.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='sk'
				name='puskovii_strum'
				label='starting current a'
				options={ dataAkum?.['puskovii-strum'].map(item => ({
					value: item.value,
					label: item.value,
					p: item.p
				})) || [] }
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.puskovii_strum ? filter.puskovii_strum.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.puskovii_strum.open }
				scroll={ filterIsOpen.puskovii_strum.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='elt'
				name='tip_elektrolitu'
				label='type akb'
				options={ dataAkum?.['tip-elektrolitu'].map(item => ({
					value: item.value,
					label: item.value,
					p: item.p
				})) || [] }
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.tip_elektrolitu ? filter.tip_elektrolitu.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.tip_elektrolitu.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='tk'
				name='tip_korpusu'
				label='body type'
				options={ dataAkum?.['tip-korpusu'].map(item => ({ value: item.value, label: item.p, p: item.p })) || [] }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.tip_korpusu ? filter.tip_korpusu.split(',') : [] }
				isOpened={ filterIsOpen.tip_korpusu.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='b'
				name='brand'
				label='brand'
				options={ dataAkum?.brand_akum?.map(item => ({ value: item.value, label: item.label })) || [] }
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
			<SelectFromTo name='sirina' idMin='wfrom' idMax='wto' from={ 0 } to={ 600 } title={ `${ t('width') } (см)` }
										btnTitle={ t('to apply') }/>
			<SelectFromTo name='visota' idMin='hfrom' idMax='hto' from={ 0 } to={ 190 } title={ `${ t('height') } (см)` }
										btnTitle={ t('to apply') }/>
			<SelectFromTo name='dovzina' idMin='lngfrom' idMax='lngto' from={ 0 } to={ 600 }
										title={ `${ t('length') } (см)` } btnTitle={ t('to apply') }/>
			<Select
				id='am'
				name='napruga'
				label='high-voltage v'
				options={ dataAkum?.napruga.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.napruga ? filter.napruga.split(',') : [] }
				isOpened={ filterIsOpen.napruga.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='pl'
				name='poliarnist'
				label='polarity'
				options={ dataAkum?.poliarnist.map(item => ({ value: item.value, label: item.p, p: item.p })) || [] }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.poliarnist ? filter.poliarnist.split(',') : [] }
				isOpened={ filterIsOpen.poliarnist.open }
				handleClickAction={ handleClickOpen }
			/>
		</>
	)
};

export default SectionBattery;
