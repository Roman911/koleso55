'use client'
import { Dispatch, FC, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { resetFilter, setParams } from '@/store/slices/filterSlice';
import { BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from '../Icons';
import { typeCatLinks } from './links';

interface TypeCarLinksProps {
	section: 'header' | 'catalog'
	onClick?: () => void
	setOpen?: Dispatch<SetStateAction<boolean>>
}

const Icons = {
	light: CarIcon,
	bus: BusIcon,
	cargo: CargoIcon,
	motorcycle: MotorcyclesIcon,
	special: SpecialEquipmentIcon,
	suv: SuvIcon,
};

interface ILinkComponent extends LinkProps {
	label: string
	section: 'header' | 'catalog'
	icon: keyof typeof Icons
	vehicleType: string[]
	onClick?: () => void
}

const LinkComponent: FC<ILinkComponent> = (
	{
		section,
		href,
		icon,
		label,
		onClick,
		vehicleType
	}) => {
	const pathname = usePathname();
	const value = pathname.split("vt-")[1]?.split("/")[0] || null;
	const active = value && vehicleType.includes(value);
	const IconComponent = Icons[icon];
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(onClick) onClick();
		dispatch(resetFilter());
		dispatch(setParams({ 'vehicle_type': null }));
	}

	return <Link
		onClick={ handleClick }
		href={ href }
		className={ twMerge('flex items-center group/item',
			section === 'catalog' && 'flex-col', section === 'header' && 'mt-3 gap-2.5',
		) }
	>
		<IconComponent className={
			twMerge(
				'transition group-hover/item:text-gray-900 dark:group-hover/item:text-white text-gray-400',
				section === 'catalog' && 'group-hover/item:text-primary dark:text-[#949699] dark:group-hover/item:text-white',
				active && 'text-primary dark:text-white',
			)
		}/>
		<span className={
			twMerge(
				'transition',
				section === 'catalog' && 'text-sm text-gray-400 group-hover/item:text-primary dark:text-[#949699] dark:group-hover/item:text-white',
				section === 'header' && 'group-hover/item:underline',
				active && 'text-primary dark:text-white',
			)
		}>
			{ label }
		</span>
	</Link>
}

const TypeCarLinks: FC<TypeCarLinksProps> = ({ section, onClick }) => {
	const t = useTranslations('CarType');

	return <>
		{ typeCatLinks.map(item => {
			return <LinkComponent
				key={ item.label }
				onClick={ onClick }
				section={ section }
				href={ item.href }
				icon={ item.icon as keyof typeof Icons }
				label={ t(item.label) }
				vehicleType={ item.vehicleType }
			/>
		}) }
	</>
};

export default TypeCarLinks;