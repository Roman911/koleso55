import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Subsection } from '@/models/filter';
import { Select } from '@/components/Catalog/FilterAlt/Select';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import type { BaseDataProps } from '@/models/baseData';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { typeDisc } from '@/components/Catalog/FilterAlt/customParamForSelector';
import { Language } from '@/models/language';

interface Props {
	filterData?: BaseDataProps
	onChange: (id: string, name: string, value: string[]) => void
}

const SectionDisks: FC<Props> = ({ filterData, onChange }) => {
	const t = useTranslations('Filters');
	const locale = useLocale();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);

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
			/>
		</>
	)
};

export default SectionDisks;
