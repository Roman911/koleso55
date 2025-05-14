'use client'
import { FC, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import MySelect from '../Select';
import { Section } from '@/models/filter';
import Button from '@/components/UI/Button';

interface CarFilters {
	brand?: string | number;
	model?: string | number;
	year?: string | number;
	modification?: string | number;
}

interface FilterConfig {
	label: string;
	name: keyof typeof filterNames;
	options?: Array<{ value: string | number; label: string }>;
	isDisabled?: boolean;
}

const filterNames = {
	brand: 'brand',
	model: 'model',
	year: 'graduation year',
	modification: 'modification',
} as const;

interface Props {
	section: Section;
}

const FilterByCar: FC<Props> = ({ section }) => {
	const [ isLoadingTires, setLoadingTires ] = useState(false);
	const [ isLoadingDisks, setLoadingDisks ] = useState(false);
	const [ carFilters, setCarFilters ] = useState<CarFilters>({ brand: 0, model: 0, modification: 0, year: 0 });
	const router = useRouter();
	const locale = useLocale();
	const t = useTranslations('Filters');
	const { data: baseData } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(carFilters.brand?.toString() ?? '');
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(carFilters.model?.toString() ?? '');
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(
		`${ carFilters.model }/${ carFilters.year }`
	);

	const filters: FilterConfig[] = useMemo(() => [
		{
			label: filterNames.brand,
			name: 'brand',
			options: baseData?.auto?.map(item => ({ value: item.value, label: item.label }))
		},
		{
			label: filterNames.model,
			name: 'model',
			options: model?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: !model?.length,
		},
		{
			label: filterNames.year,
			name: 'year',
			options: modelYear?.map(item => ({ value: item, label: String(item) })),
			isDisabled: !modelYear?.length,
		},
		{
			label: filterNames.modification,
			name: 'modification',
			options: modelKit?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: !modelKit?.length,
		}
	], [ baseData?.auto, model, modelYear, modelKit ]);

	const handleChange = useCallback((name: string, value: number | string | null) => {
		setCarFilters({ ...carFilters, [name]: value })
		if(name === 'model') {
			modelRefetch();
		} else if([ 'modification', 'year' ].includes(name)) {
			modelKitRefetch();
		}
	}, [ carFilters, modelRefetch, modelKitRefetch ]);

	const handleSubmit = useCallback((selectedSection: Section) => {
		const brandLabel = baseData?.auto.find(item => item.value == carFilters.brand)?.label.toLowerCase() ?? '';
		const link = `car-${ brandLabel } ${ carFilters.year } ${ carFilters.brand } ${ carFilters.model } ${ carFilters.modification }`;
		(selectedSection === Section.Disks ? setLoadingDisks : setLoadingTires)(true);
		router.push(`/${ locale }/catalog/${ selectedSection }/${ link.split(' ').join('-') }`);
	}, [ baseData?.auto, carFilters, router, locale ]);

	return (
		<>
			{ filters.map(({ name, label, options, isDisabled }) => (
				<MySelect
					key={ name }
					name={ name }
					label={ t(label) }
					options={ options }
					onChange={ handleChange }
					isDisabled={ isDisabled }
					section={ section }
				/>
			)) }

			{ [
				{ section: Section.Tires, label: 'choose tires', isLoading: isLoadingTires },
				{ section: Section.Disks, label: 'choose disks', isLoading: isLoadingDisks }
			].map(({ section: btnSection, label, isLoading }) => (
				<Button
					key={ btnSection }
					isDisabled={ !carFilters.modification }
					isLoading={ isLoading }
					onPress={ () => handleSubmit(btnSection) }
				>
					{ t(label) }
				</Button>
			)) }
		</>
	);
};

export default FilterByCar;
