'use client'
import { FC } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

interface Props {
	isFooter?: boolean
}

const Logo: FC<Props> = ({ isFooter }) => {
	const pathname = usePathname();
	const { theme } = useTheme();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') dispatch(setProgress(true));
	}

	return (
		<Link href='/' onClick={ handleClick } className='logo'>
			{ isFooter || theme === 'dark' ? <Image
				src='/logo_dark.svg'
				alt="logo"
				width={ 200 }
				height={ 40 }
				priority
			/> : <Image
				src='/logo_light.svg'
				alt="logo"
				width={ 200 }
				height={ 40 }
				priority
			/> }
		</Link>
	)
};

export default Logo;
