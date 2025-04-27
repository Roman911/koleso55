import { FC } from 'react';
import { SettingsProps } from '@/models/settings';
import TopLine from '@/components/Layout/Header/TopLine';
import { AliasAll } from '@/models/alias';
import HeaderMain from '@/components/Layout/Header/HeaderMain';
import Progress from './Progress';
import Menu from './Menu';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const Header: FC<Props> = ({ alias, settings }) => {
	return (
		<div className='header'>
			<Progress />
			<TopLine alias={ alias } settings={ settings } />
			<HeaderMain settings={ settings } />
			<Menu />
		</div>
	)
};

export default Header;
