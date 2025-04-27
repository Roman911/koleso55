'use client'
import { FC, JSX, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { Button, ButtonGroup } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { changeSection, reset as resetFilter } from '@/store/slices/filterSlice';
import { reset as resetFilterCar } from '@/store/slices/filterCarSlice';
import { Section } from '@/models/section';
import CarIcon from './Icons/CarIcon';
import DiskIcon from './Icons/DiskIcon';
import TireIcon from './Icons/TireIcon';

interface MyButtonProps {
	children: ReactNode
	handleClick: (section: Section) => void
	section: Section
	sectionBtn: Section
	name: 'tire' | 'car' | 'disk'
}

const icons = {
	tire: TireIcon,
	disk: DiskIcon,
	car: CarIcon
};

const MyButton = ({ children, handleClick, section, sectionBtn, name }: MyButtonProps) => {
	const Icon = icons[name];

	return (
		<Button
			size='lg'
			onPress={ () => handleClick(sectionBtn) }
			variant='light'
			radius='none'
			startContent={ <Icon className='w-6 h-6 md:w-8 md:h-8' /> }
			className={ twMerge('p-4 md:px-6 md:w-52 text-lg md:text-xl font-semibold text-gray-300 border-b-1 border-gray-300 hover:text-white data-[hover=true]:bg-transparent hover:border-white', section === sectionBtn && 'text-white border-white') }
		>
			{ children }
		</Button>
	)
}

interface Props {
	children: JSX.Element
	section: Section
	onSubmit: (section: Section) => void
	className?: string
}

const FilterBlock: FC<Props> = ({ children, section, onSubmit, className }) => {
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const handleClick = (value: Section) => {
		dispatch(resetFilter());
		dispatch(resetFilterCar());
		dispatch(changeSection(value));
	};

	const onClick = () => {
		setIsLoading(true);
		onSubmit(section);
	}

	return (
		<div
			className={ twMerge('flex-1 flex flex-col p-2 md:p-10 max-w-7xl w-full mx-auto md:mt-28', className, section === Section.Battery && 'md:bg-primary') }>
			<div className='text-center font-semibold text-3xl md:text-5xl text-white mb-4 md:mb-10'>
				{ t('selection of tires and wheels') }
			</div>
			<div className='flex items-center justify-center gap-8 md:gap-20 mb-8 md:mb-0'>
				<ButtonGroup className='gap-2'>
					<MyButton section={ section } sectionBtn={ Section.Tires } handleClick={ handleClick } name='tire'>
						{ t('tires') }
					</MyButton>
					<MyButton section={ section } sectionBtn={ Section.Disks } handleClick={ handleClick } name='disk'>
						{ t('disks') }
					</MyButton>
					<MyButton section={ section } sectionBtn={ Section.Car } handleClick={ handleClick } name='car'>
						{ t('by car') }
					</MyButton>
				</ButtonGroup>
			</div>
			<div
				className={ twMerge('grid grid-cols-1 md:grid-cols-7 gap-2.5 md:mt-7', section === Section.Car && 'md:grid-cols-6') }>
				{ children }
				{ section !== Section.Car && <Button
					color='primary'
					isLoading={ isLoading }
					size='lg'
					radius='sm'
					onPress={ onClick }
					className='w-full font-semibold'
				>
					{ t('choose') }
				</Button> }
			</div>
		</div>
	)
};

export default FilterBlock;
