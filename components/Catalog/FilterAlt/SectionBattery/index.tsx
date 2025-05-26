import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '@/components/Catalog/FilterAlt/Select';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';

interface Props {
	onChange: (id: string, name: string, value: string[]) => void
}

const SectionBattery: FC<Props> = ({ onChange }) => {
	const t = useTranslations('Filters');
	const { filter } = useAppSelector(state => state.filterReducer);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');

	return (
		<>
			<Select
				id='ct'
				name='jemnist'
				label='capacity ah'
				options={ dataAkum?.jemnist.map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.jemnist ? filter.jemnist.split(',') : [] }
				search={ true }
			/>
			<Select
				id='sk'
				name='puskovii_strum'
				label='starting current a'
				options={ dataAkum?.['puskovii-strum'].map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.puskovii_strum ? filter.puskovii_strum.split(',') : [] }
				search={ true }
			/>
			<Select
				id='elt'
				name='tip_elektrolitu'
				label='type akb'
				options={ dataAkum?.['tip-elektrolitu'].map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.tip_elektrolitu ? filter.tip_elektrolitu.split(',') : [] }
				search={ true }
			/>
			<Select
				id='tk'
				name='tip_korpusu'
				label='body type'
				options={ dataAkum?.['tip-korpusu'].map(item => ({value: item.value, label: item.p, p: item.p})) || []}
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.tip_korpusu ? filter.tip_korpusu.split(',') : [] }
			/>
			<Select
				id='b'
				name='brand'
				label='brand'
				options={ dataAkum?.brand_akum?.map(item => ({value: item.value, label: item.label})) || []}
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.brand ? filter.brand.split(',') : [] }
				search={ true }
			/>
			<SelectFromTo name='sirina' idMin='wfrom' idMax='wto' from={0} to={600} title={`${t('width')} (см)`}
										btnTitle={t('to apply')} />
			<SelectFromTo name='visota' idMin='hfrom' idMax='hto' from={0} to={190} title={`${t('height')} (см)`}
										btnTitle={t('to apply')} />
			<SelectFromTo name='dovzina' idMin='lngfrom' idMax='lngto' from={0} to={600}
										title={`${t('length')} (см)`} btnTitle={t('to apply')} />
			<Select
				id='am'
				name='napruga'
				label='high-voltage v'
				options={ dataAkum?.napruga.map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChangeAction={ onChange }
				filterValue={ filter?.napruga ? filter.napruga.split(',') : [] }
			/>
			<Select
				id='pl'
				name='poliarnist'
				label='polarity'
				options={ dataAkum?.poliarnist.map(item => ({value: item.value, label: item.p, p: item.p})) || []}
				variant='white'
				onChangeAction={ onChange }
				filterValue={ filter?.poliarnist ? filter.poliarnist.split(',') : [] }
			/>
		</>
	)
};

export default SectionBattery;
