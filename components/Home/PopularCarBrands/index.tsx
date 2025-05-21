'use client';
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/react';
import { SettingsProps } from '@/models/settings';
import Title from '@/components/UI/Title';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { Language, LanguageCode } from '@/models/language';
import { Car2BrandProps } from '@/models/featureParams';

interface Props {
	locale: Language
	settings: SettingsProps
	popularCarBrands: Car2BrandProps[]
}

const PopularCarBrands: FC<Props> = ({ locale, settings, popularCarBrands }) => {
	const dispatch = useAppDispatch();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const handleClick = () => {
		dispatch(setProgress(true));
	}

	return (
		<div className='mt-28'>
			<Title title={ settings[lang].h2_popular_auto }/>
			<div className='grid grid-cols-2 lg:grid-cols-6 mt-12 gap-5 mb-8'>
				{ popularCarBrands?.map((item, index) => (
					<Button
						as={ Link }
						key={ index }
						href={ `/catalog/tires/car-${ item.name.toLowerCase() }-${ item.id }` }
						onPress={ handleClick }
						color='default'
						radius='full'
						variant='bordered'
						size='lg'
						className='text-black bg-white dark:bg-gray-800 dark:text-gray-50 h-10 border-gray-700 dark:border-[#707070] border-1 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary'
					>
						{ item.name }
					</Button>
				)) }
			</div>
		</div>
	)
};

export default PopularCarBrands;
