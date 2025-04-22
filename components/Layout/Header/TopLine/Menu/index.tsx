'use client'
import { FC } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { AliasAll } from '@/models/alias';
import { Language } from '@/models/language';

interface Props {
	alias: AliasAll
}

const Menu: FC<Props> = ({ alias }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const locale = useLocale();

	const handleClick = (href: string) => {
		if(pathname !== href) dispatch(setProgress(true));
	}

	return (
		<div className='ml-auto mr-2 hidden md:inline-block'>
			{ alias.header.map((item, index) => {
				return <Link
					key={ index }
					href={ `/page/${item.slug}` }
					onClick={ () => handleClick(`/page/${item.slug}`) }
					className='font-medium hover:underline hover:text-white text-gray-300 mr-5'>
					{ item.descriptions[locale === Language.UK ? 'ua' : 'ru'].title }
				</Link>
			}) }
		</div>
	)
};

export default Menu;
