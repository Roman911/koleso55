import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Button } from '@heroui/react';
import { useAppDispatch } from '@/hooks/redux';
import { Subsection } from '@/models/filter';
import { changeSubsection } from '@/store/slices/filterSlice';

const tabs = [
	{ title: 'by parameters', section: Subsection.ByParams },
	{ title: 'by car', section: Subsection.ByCars }
];

const SwitchTabsByParams = ({ subsection }: { subsection: Subsection }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Catalog');

	const handleClick = (value: Subsection) => {
		dispatch(changeSubsection(value));
	}

	return (
		<div className='flex lg:justify-between gap-x-5'>
			{ tabs.map((item, index) => (

				<Button
					key={index}
					variant='light'
					size='lg'
					onPress={ () => handleClick(item.section) }
					className={ twMerge(
						'font-bold md:uppercase lg:normal-case text-gray-400 p-0 hover:bg-transparent hover:text-black dark:text-[#949699]',
						subsection === item.section && 'text-black dark:text-white underline')
				}>
					{ t(item.title) }
				</Button>
			)) }
		</div>
	)
};

export default SwitchTabsByParams;
