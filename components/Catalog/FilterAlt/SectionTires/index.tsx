import { FC } from 'react';
import { useLocale } from 'next-intl';
import { IOpenFilter, Subsection } from '@/models/filter';
import { Select } from '@/components/Catalog/FilterAlt/Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { close, open, setScrollValue } from '@/store/slices/filterIsOpenSlice';
import { baseDataAPI } from '@/services/baseDataService';
import type { BaseDataProps } from '@/models/baseData';
import { appointmentCargo, appointmentIndustrial, customTireSeason, others } from '../customParamForSelector';
import { Language } from '@/models/language';

const cargoTypes = [ '3', '4', '5', '6' ];
const industrialTypes = [ '9', '10', '11' ];

interface Props {
	filterData?: BaseDataProps
	onChange: (id: string, name: string, value: string[]) => void
}

export const SectionTires: FC<Props> = ({ filterData, onChange }) => {
	const locale = useLocale();
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const { filterIsOpen } = useAppSelector(state => state.filterIsOpenReducer);
	const appointmentCargoShow = filter.vehicle_type && cargoTypes.includes(filter.vehicle_type);
	const appointmentIndustrialShow = filter.vehicle_type && industrialTypes.includes(filter.vehicle_type);
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
					focusValue='175'
					options={ filterData?.tyre_width.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
					variant='gray'
					onChangeAction={ onChange }
					filterValue={ filter.width ? filter.width.split(',') : [] }
					search={ true }
					isOpened={ filterIsOpen.width.open }
					scroll={ filterIsOpen.width.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					id='h'
					name='height'
					label='height'
					focusValue='45'
					options={ filterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
					variant='gray'
					onChangeAction={ onChange }
					filterValue={ filter.height ? filter.height.split(',') : [] }
					search={ true }
					isOpened={ filterIsOpen.height.open }
					scroll={ filterIsOpen.height.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					id='d'
					name='radius'
					label='diameter'
					focusValue='R14'
					options={ filterData?.tyre_diameter?.map(item => ({
						value: item.value,
						label: `R${ item.value }`,
						p: item.p
					})) || [] }
					variant='gray'
					onChangeAction={ onChange }
					filterValue={ filter.radius ? filter.radius.split(',') : [] }
					search={ true }
					isOpened={ filterIsOpen.radius.open }
					scroll={ filterIsOpen.radius.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			{ !appointmentCargoShow && !appointmentIndustrialShow && <Select
				id='s'
				name='sezon'
				label='season'
				options={ customTireSeason.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				})) }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter.sezon ? filter.sezon.split(',') : [] }
				valueStudded={ filter?.only_studded }
				isOpened={ filterIsOpen.sezon.open }
				handleClickAction={ handleClickOpen }
			/> }
			{ appointmentCargoShow && <Select
				id='vt'
				name='vehicle_type'
				label='appointment'
				options={ appointmentCargo.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				})) }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.vehicle_type ? filter.vehicle_type.split(',') : [] }
				isOpened={ filterIsOpen.vehicle_type.open }
				handleClickAction={ handleClickOpen }
			/> }
			{ appointmentIndustrialShow && <Select
				id='vt'
				name='vehicle_type'
				label='appointment'
				options={ appointmentIndustrial.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				})) }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.vehicle_type ? filter.vehicle_type.split(',') : [] }
				isOpened={ filterIsOpen.vehicle_type.open }
				handleClickAction={ handleClickOpen }
			/> }
			<Select
				id='b'
				name='brand'
				label='brand'
				options={ data?.brand?.map(item => ({ value: item.value, label: item.label })) || [] }
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
			<Select
				id='li'
				name='li'
				label='load index'
				options={ data?.load.map(item => ({ value: item.value, label: item.value })) || [] }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.li ? filter.li.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.li.open }
				scroll={ filterIsOpen.li.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='si'
				name='si'
				label='speed index'
				options={ data?.speed.map(item => ({ value: item.value, label: item.value })) || [] }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.si ? filter.si.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.si.open }
				scroll={ filterIsOpen.si.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='hm'
				name='omolog'
				label='homologation'
				options={ data?.omolog.map(item => ({ value: item.value, label: item.value })) || [] }
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.omolog ? filter.omolog.split(',') : [] }
				search={ true }
				isOpened={ filterIsOpen.omolog.open }
				scroll={ filterIsOpen.omolog.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				id='other'
				name='other'
				label='other'
				options={ others.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				})) || [] }
				variant='white'
				onChangeAction={ onChange }
				isOpened={ filterIsOpen.other.open }
				handleClickAction={ handleClickOpen }
				filterOther={{
					only_c: filter?.only_c ?? null,
					only_xl: filter?.only_xl ?? null,
					only_owl: filter?.only_owl ?? null,
					only_run_flat: filter?.only_run_flat ?? null,
					only_off_road: filter?.only_off_road ?? null,
				}}
			/>
		</>
	)
};
