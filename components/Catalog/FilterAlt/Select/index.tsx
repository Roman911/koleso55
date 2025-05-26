'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Checkbox, CheckboxGroup } from '@heroui/react';
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
	onChange: (id: string, name: string, value: string[]) => void
	filterValue?: string[]
	valueStudded?: null | string
	filterOther?: {
		only_c: string | null | undefined
		only_xl: string | null | undefined
		only_owl: string | null | undefined
		only_run_flat: string | null | undefined
		only_off_road: string | null | undefined
	}
}

const Select: FC<SelectProps> = (
	{
		id,
		name,
		label,
		variant,
		search,
		options,
		onChange,
		focusValue,
		filterValue,
		valueStudded,
		filterOther
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

	return <div className={ twMerge('relative mt-2 rounded-sm bg-transparent', variant === 'gray' && 'bg-[#F0F2F5] dark:bg-[#F0F2F5]') }>
		<button
			type='button'
			onClick={ () => handleClickOpen() }
			className={ twMerge(
				'relative w-full cursor-default py-2.5 pr-10 text-left focus:outline-none pl-1.5 text-sm',
				variant === 'gray' ? 'text-black' : '',
				variant === 'white' ? 'font-bold' : 'pl-3.5')
			}>
      <span className='flex items-center'>
        <span className='block truncate'>{ t(label) }</span>
      </span>
			<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2.5">
        <Icons.ChevronDownIcon className={ twMerge('w-3.5 h-3.5 stroke-black', variant === 'gray' && 'stroke-gray-500') }/>
      </span>
		</button>
		{ search && open && <SearchInput value={ eventSearch } handleChange={ handleChange }/> }
		<CheckboxGroup
			size='lg'
			radius='sm'
			color='primary'
			ref={ ref }
			onChange={ (value) => {
				setActive(value); // обов'язково оновлюємо локальний state
				onChange(id, name, value);
			}}
			value={ active } // контрольований компонент
			className={ twMerge('relative max-h-[480px] w-full overflow-auto', !open && 'hidden') }
			classNames={{ wrapper: 'px-2.5', label: 'bg-white' }}
		>
			{ options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(item => {
				return <Checkbox className='before-bg-white' value={ `${item.value}` } key={ item.value } classNames={{ label: 'text-black before-bg-white text-base', icon: 'before-bg-white' }}>
					{ item.label }
				</Checkbox>
			}) }
		</CheckboxGroup>
		{  name === 'sezon' && filterValue?.includes('2') &&
			<Checkbox
				size='lg'
				radius='sm'
				color='primary'
				isSelected={ valueStudded === '1' }
				onValueChange={ (value) => onChange('stud', 'only_studded', value ? ['1'] : [])}
				className={ twMerge('before-bg-white ml-6 mt-0.5', !open && 'hidden') }
				value='1'
				classNames={{ label: 'text-black before-bg-white text-base', icon: 'before-bg-white' }}>
			Шип
		</Checkbox> }
		{/*<ul ref={ ref } className={*/}
		{/*	twMerge(*/}
		{/*		'relative item-list max-h-[480px] w-full overflow-auto pb-1 pt-1 text-base ring-black ring-opacity-5 focus:outline-none sm:text-sm',*/}
		{/*		!open && 'hidden'*/}
		{/*	)*/}
		{/*}>*/}
		{/*	{ options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(item => {*/}
		{/*		return <li*/}
		{/*			key={ item.value }*/}
		{/*			id='listbox-option-0'*/}
		{/*			className={ twMerge('relative cursor-default select-none pl-2.5 pr-9', variant === 'gray' && 'text-black') }*/}
		{/*		>*/}
		{/*			<div className='inline-flex items-center'>*/}
		{/*				<label*/}
		{/*					className='relative flex cursor-pointer items-center rounded-full'*/}
		{/*					htmlFor={ `${ name }-${ item.value }` }*/}
		{/*					data-ripple-dark='true'*/}
		{/*				>*/}
		{/*					<input*/}
		{/*						onChange={ (event) => handleClick(event, item.value) }*/}
		{/*						checked={ name === 'other' ? !!filterOther?.[item.value as keyof typeof filterOther] : filterValue === item.value }*/}
		{/*						id={ `${ name }-${ item.value }` }*/}
		{/*						type='checkbox'*/}
		{/*						className='peer relative h-7 w-7 bg-white appearance-none cursor-pointer rounded-sm border border-[#A9ACB2] transition-all checked:border-primary checked:bg-primary hover:border-primary'*/}
		{/*					/>*/}
		{/*					<div*/}
		{/*						className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white peer-checked:opacity-100'>*/}
		{/*						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"*/}
		{/*								 className="h-3.5 w-3.5 fill-white">*/}
		{/*							<path*/}
		{/*								d="M5.4447 8.55578L2.33276 5.44494L0.777344 7.00036L5.4447 11.6677L13.2218 3.88953L11.6675 2.33301L5.4447 8.55578Z"*/}
		{/*							/>*/}
		{/*						</svg>*/}
		{/*					</div>*/}
		{/*				</label>*/}
		{/*				<label className="mt-px cursor-pointer select-none font-medium ml-2.5">*/}
		{/*					{ item.label }*/}
		{/*				</label>*/}
		{/*			</div>*/}
		{/*		</li>*/}
		{/*	}) }*/}
		{/*	{ name === 'sezon' && filterValue === '2' && <li*/}
		{/*		onClick={ (event) => handleClick(event, 1, true) }*/}
		{/*		className="relative cursor-default select-none py-1 pl-2.5 pr-9 text-gray-900"*/}
		{/*		id="listbox-option-0"*/}
		{/*	>*/}
		{/*		<div className="inline-flex items-center ml-8">*/}
		{/*			<label*/}
		{/*				className="relative flex cursor-pointer items-center rounded-full"*/}
		{/*				htmlFor='studded'*/}
		{/*				data-ripple-dark="true"*/}
		{/*			>*/}
		{/*				<input*/}
		{/*					onChange={ (event) => handleClick(event, '1', true) }*/}
		{/*					checked={ valueStudded == '1' }*/}
		{/*					id='studded'*/}
		{/*					type="checkbox"*/}
		{/*					className="peer relative h-7 w-7 bg-white appearance-none cursor-pointer rounded-sm border border-[#A9ACB2] transition-all checked:border-primary checked:bg-primary hover:border-primary"*/}
		{/*				/>*/}
		{/*				<div*/}
		{/*					className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white peer-checked:opacity-100">*/}
		{/*					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"*/}
		{/*							 className="h-3.5 w-3.5 fill-white">*/}
		{/*						<path*/}
		{/*							d="M5.4447 8.55578L2.33276 5.44494L0.777344 7.00036L5.4447 11.6677L13.2218 3.88953L11.6675 2.33301L5.4447 8.55578Z"*/}
		{/*						/>*/}
		{/*					</svg>*/}
		{/*				</div>*/}
		{/*			</label>*/}
		{/*			<label className="mt-px cursor-pointer select-none font-medium ml-2.5">*/}
		{/*				Шип*/}
		{/*			</label>*/}
		{/*		</div>*/}
		{/*	</li> }*/}
		{/*</ul>*/}
	</div>
};

export default Select;
