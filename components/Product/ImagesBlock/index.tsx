import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Labels, Photo } from '@/models/product';
import { Language } from '@/models/language';
import { SeasonTransform, VehicleTypeTransform } from '@/lib/characteristicsTransform';
import * as Icons from '../../UI/Icons';
import { ReactSlick } from '@/components/Product/ImagesBlock/ReactSlick';

const IconsObj = {
	light: Icons.CarIcon,
	bus: Icons.BusIcon,
	cargo: Icons.CargoIcon,
	motorcycle: Icons.MotorcyclesIcon,
	special: Icons.SpecialEquipmentIcon,
	suv: Icons.SuvIcon,
};

interface Props {
	locale: Language;
	labels: Labels[]
	images: Photo[]
	full_name: string
	vehicle_type?: string
	season?: string
	photo: {
		url_part: string
		url_part2: string
	}
}

const ImagesBlock: FC<Props> = ({ locale, labels, images, photo, full_name, vehicle_type, season }) => {
	const vehicleTransform = vehicle_type ? VehicleTypeTransform(vehicle_type) : undefined;
	const IconComponent = vehicleTransform ? IconsObj[vehicleTransform.icon] : undefined;
	const seasonTransform = season && SeasonTransform(season)?.icon;

	return (
		<div className={ twMerge('gallery relative mb-2 md:mb-7 pt-10 pb-2 md:pb-5 dark:bg-white rounded-lg max-w-full md:max-w-72') }>
			<div className='-mt-8 px-4 mb-2 w-full flex justify-between items-start'>
				<div>
					{ labels?.length !== 0 && labels?.map(item => {
						return <div
							key={ item.label_id }
							className='text-center text-xs font-semibold text-white uppercase py-1.5 px-2.5 max-w-max rounded-full my-1'
							style={ { backgroundColor: item.label.color } }
						>
							{ locale === Language.UK ? item.label.name : item.label.name_ru }
						</div>
					}) }
					<div className='flex gap-x-2'>
						{ IconComponent && (
							<IconComponent className='text-gray-500' />) }
						{ seasonTransform && <Image src={ seasonTransform } height={ 24 } width={ 24 } alt=""/> }
					</div>
				</div>
			</div>
			{ photo?.url_part === '' ?
				<Image
					src={ locale === Language.UK ? '/images/no-photo.jpg' : '/images/no-photo-ru.jpg' }
					width={ 288 }
					height={ 288 }
					alt={ full_name }
				/> : <ReactSlick images={ images } photo={ photo } /> }
		</div>
	)
}

export default ImagesBlock;
