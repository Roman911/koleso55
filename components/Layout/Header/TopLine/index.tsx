import { FC } from 'react';
import Menu from './Menu';
import { AliasAll } from '@/models/alias';
import LanguageChanger from '@/components/Layout/Header/TopLine/LanguageChanger';
import ThemeToggle from '@/components/Layout/Header/TopLine/ThemeToggle';

interface Props {
	alias: AliasAll
}

const TopLine: FC<Props> = ({ alias }) => {
	return (
		<section className='top-line w-full bg-gray-900 dark:bg-gray-900'>
			<div className='container mx-auto py-1 md:px-4'>
				<nav className='gap-2 2xl:gap-6 flex items-center justify-between mx-4'>
					<LanguageChanger />
					<Menu alias={ alias } />
					<ThemeToggle />
				</nav>
			</div>
		</section>
	)
};

export default TopLine;
