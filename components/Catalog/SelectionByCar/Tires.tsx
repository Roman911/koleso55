import { Link } from '@/i18n/routing';
import { baseDataAPI } from '@/services/baseDataService';
import { useTranslations } from 'next-intl';
import CarBrand from './CarBrand';

const Tires = ({ modification, car }: { modification: number, car: string | null }) => {
	const t = useTranslations('Main');
	const { data } = baseDataAPI.useFetchKitTyreSizeQuery(`${ modification }`);

	return (
		<>
			{ data && <CarBrand data={ data[0] }/> }
			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>
				{ t('factory') }
			</h6>
			<div className='flex gap-2 text-sm font-bold mt-2'>
				{ data?.filter(i => i.type === 1).map(item => {
					return <Link className='text-primary' key={ item.value }
											 href={ `/catalog/tires/${ car }/w-${ item.width }/h-${ item.height }/d-${ item.diameter }` }>
						{ `${ item.width }/${ item.height } R${ item.diameter }` }
					</Link>
				}) }
			</div>
			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>Альтернатива</h6>
			<div className='flex flex-wrap gap-2 text-sm font-bold mt-2'>
				{ data?.filter(i => i.type === 2).map(item => {
					return <Link className='text-primary' key={ item.value }
											 href={ `/catalog/tires/${ car }/w-${ item.width }/h-${ item.height }/d-${ item.diameter }` }>
						{ `${ item.width }/${ item.height } R${ item.diameter }` }
					</Link>
				}) }
			</div>
		</>
	)
};

export default Tires;
