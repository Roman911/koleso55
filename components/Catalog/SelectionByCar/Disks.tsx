import { baseDataAPI } from '@/services/baseDataService';
import { useTranslations } from 'next-intl';
import CarBrand from './CarBrand';
import { Link } from '@/i18n/routing';
import { Section } from '@/models/filter';

const Disks = ({ modification, car }: { modification: number, car: string | null }) => {
	const t = useTranslations('Main');
	const { data } = baseDataAPI.useFetchKitDiskSizeQuery(`${ modification }`);

	return (
		<>
			{ data && <CarBrand data={ data[0] }/> }
			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>
				{ t('factory') }
			</h6>
			<div className='flex gap-2 text-sm font-bold mt-2'>
				{ data?.filter(i => i.type === 1).map(item => {
					return <Link className='text-primary' key={ item.value }
											 href={ `/catalog/disks/${ car }/w-${ item.width }/d-${ item.diameter }/kr-${ item.kits.bolt_count }x${ item.kits.pcd }/et-${ item.et }/dia-${ item.kits.dia }` }>
						{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
					</Link>
				}) }
			</div>
			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>Альтернатива</h6>
			<div className='flex flex-wrap gap-2 text-sm font-bold mt-2'>
				{data?.filter(i => i.type === 2).map(item => {
					return <Link className='text-primary' key={ item.value } href={ `/catalog/disks/${ car }/w-${ item.width }/d-${ item.diameter }/kr-${ item.kits.bolt_count }x${ item.kits.pcd }/et-${ item.et }/dia-${ item.kits.dia }` } >
						{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
					</Link>})}
			</div>
		</>
	)
};

export default Disks;
