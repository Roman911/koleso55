'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Badge, Checkbox, CheckboxGroup } from '@heroui/react';
import './index.scss';
import * as Icons from '@/components/UI/Icons';
import SearchInput from './SearchInput';
import type { Options } from '@/models/baseData';

interface SelectProps {
	id: string
	label: string
	name: string
	variant: 'white' | 'gray'
	search?: boolean
	options: Array<Options>
	focusValue?: string | false
	onChangeAction: (id: string, name: string, value: string[]) => void
	filterValue?: string[]
	valueStudded?: null | string
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
		onChangeAction,
		focusValue,
		filterValue,
		valueStudded
	}) => {
	const [ open, setOpen ] = useState(false);
	const [ active, setActive ] = useState<string[]>([]);
	const [ eventSearch, setEventSearch ] = useState('');
	const ref = useRef<HTMLDivElement | null>(null);
	const t = useTranslations('Filters');

	useEffect(() => {
		if (filterValue) {
			setActive(filterValue);
		} else {
			setActive([]);
		}
	}, [filterValue]);

	const handleClickOpen = useCallback(() => {
		setOpen(prev => !prev);

		if(focusValue && ref.current) {
			const cont = ref.current.querySelectorAll('label');
			const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);
			if(elIndex !== -1) {
				setTimeout(() => {
					ref.current?.scroll(0, elIndex * 25);
				}, 15);
			}
		}
	}, [ focusValue ]);

	const handleChange = (value: string) => {
		setEventSearch(value.toLowerCase());
	}

	return <div className={ twMerge('relative mt-2.5 rounded-sm bg-transparent', variant === 'gray' && 'bg-[#F0F2F5] dark:bg-[#F0F2F5]') }>
		<Badge isInvisible={ !filterValue?.length } className='border-white dark:border-[#333333]' classNames={{ base: 'w-full', badge: 'left-[1%]' }} color='primary' content={ filterValue?.length } placement='top-left'>
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
        <Icons.ChevronDownIcon className={ twMerge('w-3.5 h-3.5 stroke-black', variant === 'gray' && 'stroke-gray-500') }/>
      </span>
			</button>
		</Badge>
		{ search && open && <SearchInput value={ eventSearch } handleChange={ handleChange }/> }
		{ name === 'other' ?
			<div className={twMerge('flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row px-2.5 pb-2.5')}>
				{ options.map(item => {
					return <Checkbox
						key={ item.value }
						size='lg'
						radius='sm'
						isSelected={ valueStudded === '1' }
						onValueChange={ (value) => onChangeAction(otherOptions[item.value], 'only_studded', value ? ['1'] : [])}
						value={ String(item.value) }
						classNames={{ label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'), wrapper: 'bg-white before:-m-[1px]' }}
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
				setActive(value); // обов'язково оновлюємо локальний state
				onChangeAction(id, name, value);
			}}
			value={ active } // контрольований компонент
			className={ twMerge('relative max-h-[480px] w-full overflow-auto', !open && 'hidden') }
			classNames={{ wrapper: 'px-2.5 pb-2.5' }}
		>
			{ options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(item => {
				return <Checkbox value={ `${item.value}` } key={ item.value } classNames={{ label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'), wrapper: 'bg-white before:-m-[1px]' }}>
					{ item.label }
				</Checkbox>
			}) }
		</CheckboxGroup> }
		{  name === 'sezon' && filterValue?.includes('2') &&
			<Checkbox
				size='lg'
				radius='sm'
				color='primary'
				isSelected={ valueStudded === '1' }
				onValueChange={ (value) => onChangeAction('stud', 'only_studded', value ? ['1'] : [])}
				className={ twMerge('before-bg-white ml-6', !open && 'hidden') }
				value='1'
				classNames={{ label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'), wrapper: 'bg-white before:-m-[1px]' }}
			>
			Шип
		</Checkbox> }
	</div>
};
