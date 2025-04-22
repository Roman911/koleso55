'use client'
import { SVGProps } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@heroui/react';

export const MoonIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			height="1em"
			role="presentation"
			viewBox="0 0 20 20"
			width="20"
			{ ...props }
		>
			<path
				d="M6.53862 5.6731C6.53862 4.56819 6.701 3.45156 7.11551 2.5C4.3596 3.69967 2.5 6.51417 2.5 9.71138C2.5 14.0128 5.98716 17.5 10.2886 17.5C13.4858 17.5 16.3003 15.6404 17.5 12.8845C16.5484 13.299 15.4308 13.4614 14.3269 13.4614C10.0254 13.4614 6.53862 9.97455 6.53862 5.6731Z"
				fill="currentColor"/>
		</svg>
	);
};

export const SunIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			height="1em"
			role="presentation"
			viewBox="0 0 24 24"
			width="1em"
			{ ...props }
		>
			<g fill="currentColor">
				<path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z"/>
				<path
					d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z"/>
			</g>
		</svg>
	);
};

const ThemeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Switch
			isSelected={ theme === 'light' }
			endContent={ <SunIcon/> }
			size='lg'
			onChange={ () => setTheme(theme === 'light' ? 'dark' : 'light') }
			startContent={ <MoonIcon/> }
			thumbIcon={ ({ isSelected, className }) =>
				isSelected ? <SunIcon className={ className }/> : <MoonIcon className={ className }/>
			}
			classNames={{
				wrapper: 'rounded-md bg-gray-800 group-data-[selected=true]:bg-gray-800',
				thumb: 'rounded-sm',
				startContent: 'text-gray-300',
				endContent: 'text-gray-300'
			}}
		/>
	)
};

export default ThemeToggle;
