import { FC } from 'react';
import Menu from './Menu';
import { AliasAll } from '@/models/alias';
import LanguageChanger from '@/components/Layout/Header/TopLine/LanguageChanger';
import ThemeToggle from '@/components/Layout/Header/TopLine/ThemeToggle';
import Contacts from './Contacts';
import { SettingsProps } from '@/models/settings';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const TopLine: FC<Props> = ({ alias, settings }) => {
	return (
		<section className='top-line w-full bg-gray-900'>
			<div className='container mx-auto max-w-[1536px] py-2 px-2 md:px-4'>
				<nav className='gap-2 2xl:gap-6 flex items-center justify-between'>
					<Contacts settings={ settings } />
					<LanguageChanger />
					<Menu alias={ alias } />
					<div className='min-w-14'>
						<ThemeToggle />
					</div>
				</nav>
			</div>
		</section>
	)
};

export default TopLine;
