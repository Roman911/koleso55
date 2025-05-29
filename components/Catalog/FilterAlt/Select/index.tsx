'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Badge, Checkbox, CheckboxGroup } from '@heroui/react';
import './index.scss';
import * as Icons from '@/components/UI/Icons';
import SearchInput from './SearchInput';
import type { Options } from '@/models/baseData';
import { IOpenFilter } from '@/models/filter';

interface SelectProps {
	id: string
	label: string
	name: string
	variant: 'white' | 'gray'
	isOpened?: boolean
	scroll?: number | null
	search?: boolean
	options: Array<Options>
	focusValue?: string | false
	onChangeAction: (id: string, name: string, value: string[]) => void
	filterValue?: string[]
	valueStudded?: null | string
	handleScrollAction?: (name: keyof IOpenFilter, value: number) => void
	handleClickAction: (name: keyof IOpenFilter, value: boolean) => void
	filterOther?: {
		only_c: string | null | undefined
		only_xl: string | null | undefined
		only_owl: string | null | undefined
		only_run_flat: string | null | undefined
		only_off_road: string | null | undefined
	}
}

const otherOptions: Record<string, string> = {
	only_c: 'oc',
	only_xl: 'xl',
	only_owl: 'owl',
	only_run_flat: 'rf',
	only_off_road: 'ofr',
};

export const Select: FC<SelectProps> = (
	{
		id,
		name,
		label,
		variant,
		search,
		options,
		isOpened,
		scroll,
		onChangeAction,
		focusValue,
		filterValue,
		valueStudded,
		handleScrollAction,
		handleClickAction,
		filterOther
	}) => {
	const [ active, setActive ] = useState<string[]>([]);
	const [ eventSearch, setEventSearch ] = useState('');
	const ref = useRef<HTMLDivElement | null>(null);
	const t = useTranslations('Filters');

	useEffect(() => {
		if(filterValue) {
			setActive(filterValue);
		} else {
			setActive([]);
		}
	}, [ filterValue ]);

	useEffect(() => {
		if(ref.current && scroll) {
			setTimeout(() => {
				ref.current?.scroll(0, scroll);
			}, 15);
		}
	}, [scroll])

	const handleClickOpen = useCallback(() => {
		handleClickAction(name as keyof IOpenFilter, !isOpened);

		if(focusValue && ref.current) {
			const cont = ref.current.querySelectorAll('label');
			const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);
			if(elIndex !== -1) {
				setTimeout(() => {
					ref.current?.scroll(0, elIndex * 25);
				}, 15);
			}
		}
	}, [focusValue, handleClickAction, isOpened, name]);

	const handleChange = (value: string) => {
		setEventSearch(value.toLowerCase());
	}

	return <div
		className={ twMerge('relative mt-2.5 rounded-sm bg-transparent', variant === 'gray' && 'bg-[#F0F2F5] dark:bg-[#F0F2F5]') }>
		<Badge isInvisible={ !filterValue?.length } className='border-white dark:border-[#333333]'
					 classNames={ { base: 'w-full', badge: 'left-[1%]' } } color='primary' content={ filterValue?.length }
					 placement='top-left'>
			<button
				type='button'
				onClick={ () => handleClickOpen() }
				className={ twMerge(
					'relative w-full cursor-default py-2.5 pr-10 text-left focus:outline-none pl-1.5 text-sm',
					variant === 'gray' ? 'text-black' : '',
					variant === 'white' ? 'font-bold' : 'pl-3.5')
				}>
      <span className='flex items-center m-'>
        <span className='block truncate'>{ t(label) }</span>
      </span>
				<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2.5">
        <Icons.ChevronDownIcon
					className={ twMerge('w-3.5 h-3.5 stroke-black', variant === 'gray' && 'stroke-gray-500') }/>
      </span>
			</button>
		</Badge>
		{ search && isOpened && <SearchInput value={ eventSearch } handleChange={ handleChange }/> }
		{ name === 'other' ?
			<div className={ twMerge('flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row px-2.5 pb-2.5', !isOpened && 'hidden') }>
				{ options.map(item => {
					return <Checkbox
						key={ item.value }
						size='lg'
						radius='sm'
						isSelected={ !!filterOther?.[item.value as keyof typeof filterOther] }
						onValueChange={ (value) => onChangeAction(otherOptions[item.value], 'only_studded', value ? [ '1' ] : []) }
						value={ String(item.value) }
						classNames={ {
							label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'),
							wrapper: 'bg-white before:-m-[1px]'
						} }
					>
						{ item.label }
					</Checkbox>
				}) }
			</div>
			: <CheckboxGroup
				size='lg'
				radius='sm'
				ref={ ref }
				onChange={ (value) => {
					setActive(value);
					onChangeAction(id, name, value);
					if(handleScrollAction && ref.current) {
						handleScrollAction(name as keyof IOpenFilter, ref.current ? ref.current.scrollTop : 0);
					}
				} }
				value={ active }
				className={ twMerge('relative max-h-[480px] w-full overflow-auto', !isOpened && 'hidden') }
				classNames={ { wrapper: 'px-2.5 pb-2.5' } }
			>
				{ options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(item => {
					return <Checkbox value={ `${ item.value }` } key={ item.value } classNames={ {
						label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'),
						wrapper: 'bg-white before:-m-[1px]'
					} }>
						{ item.label }
					</Checkbox>
				}) }
			</CheckboxGroup> }
		{ name === 'sezon' && filterValue?.includes('2') &&
			<Checkbox
				size='lg'
				radius='sm'
				color='primary'
				isSelected={ valueStudded === '1' }
				onValueChange={ (value) => onChangeAction('stud', 'only_studded', value ? [ '1' ] : []) }
				className={ twMerge('before-bg-white ml-6', !isOpened && 'hidden') }
				value='1'
				classNames={ {
					label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'),
					wrapper: 'bg-white before:-m-[1px]'
				} }
			>
				Шип
			</Checkbox> }
	</div>
};
