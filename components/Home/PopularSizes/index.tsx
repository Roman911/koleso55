'use client';
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/react';
import { SettingsProps } from '@/models/settings';
import Title from '@/components/UI/Title';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { Language, LanguageCode } from '@/models/language';
import { ProductTiporazmerProps } from '@/models/featureParams';

const popularDiameter = ['12','13','14','15','16','17','18','19','20','21'];

interface Props {
	locale: Language
	settings: SettingsProps
	popularSizes: ProductTiporazmerProps[]
}

const PopularSizes: FC<Props> = ({ locale, settings, popularSizes }) => {
	const dispatch = useAppDispatch();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	return (
		<div className='mt-20'>
			<Title title={ settings[lang].h2_popular_tyre }/>
			<div className='grid grid-cols-2 lg:grid-cols-6 mt-12 gap-5'>
				{ popularSizes && popularDiameter.map(i => {
					const diameters = popularSizes.filter(item => item.radius === i);
					if(diameters.length === 0) return;
					return <div key={i} className='flex flex-col gap-4'>
						<div className='text-center text-lg font-bold'>R{i}</div>
						{diameters.map((item) => (
							<Button
								as={ Link }
								key={ item.tiporazmer_id }
								href={ `/catalog/tires/w-${item.width}/h-${item.height}/d-${item.radius}` }
								onPress={() => dispatch(setProgress(true))}
								color='default'
								radius='full'
								variant='bordered'
								size='lg'
								className='text-black bg-white dark:bg-gray-800 dark:text-gray-50 h-10 border-gray-700 dark:border-[#707070] border-1 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary'
							>
								{`${item.width}/${item.height} R${i}`}
							</Button>
						))}
					</div>
				}) }
			</div>
		</div>
	)
};

export default PopularSizes;
