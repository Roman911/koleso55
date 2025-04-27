'use client'
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch } from '@/hooks/redux';
import { setSearch } from '@/store/slices/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { useClickOutside } from '@/hooks/clickOutside';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import styles from '../index.module.scss';

const DEBOUNCE_DELAY = 300;
const MIN_SEARCH_LENGTH = 2;

const Search = () => {
	const router = useRouter();
	const locale = useLocale();
	const [ value, setValue ] = useState('');
	const debouncedValue = useDebounce(value, DEBOUNCE_DELAY);
	const dispatch = useAppDispatch();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const { data } = baseDataAPI.useFetchProductsQuery(
		{ id: `?name=${ debouncedValue }` },
		{ skip: debouncedValue.length < MIN_SEARCH_LENGTH }
	);

	const handleClear = () => setValue('');

	useClickOutside({
		ref: dropdownRef,
		open: value.length < MIN_SEARCH_LENGTH,
		onClose: handleClear
	});

	const handleAllResults = () => {
		dispatch(setSearch(value));
		handleClear();
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleAllResults();
		router.push(`/${ locale }/search`);
	};

	return (
		<div className={ twMerge('relative w-full mx-auto lg:max-w-[450px]', styles.search) }>
			<SearchInput
				value={ value }
				onChange={ (e) => setValue(e.target.value) }
				onSubmit={ handleSubmit }
			/>
			<SearchResults
				data={ data }
				isOpen={ value.length >= MIN_SEARCH_LENGTH }
				onClose={ handleClear }
				onAllResults={ handleAllResults }
				dropdownRef={ dropdownRef }
			/>
		</div>
	);
};

export default Search;
