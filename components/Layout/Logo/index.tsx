'use client';
import { FC } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

const width = 200;
const height = 40;


interface Props {
	isFooter?: boolean;
}

const Logo: FC<Props> = ({ isFooter }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') {
			dispatch(setProgress(true));
		}
	};

	const commonProps = {
		href: '/',
		onClick: handleClick,
		className: 'logo',
	};

	return (
		<Link { ...commonProps }>
			{ isFooter ? (
				<Image
					src='/logo_dark.svg'
					alt='logo'
					width={ width }
					height={ height }
					priority
				/>
			) : (
				<>
					<Image
						src='/logo_light.svg'
						alt='logo'
						className='dark:hidden'
						width={ width }
						height={ height }
						priority
					/>
					<Image
						src='/logo_dark.svg'
						alt='logo'
						className='hidden dark:block'
						width={ width }
						height={ height }
						priority
					/>
				</>
			) }
		</Link>
	);
};

export default Logo;
