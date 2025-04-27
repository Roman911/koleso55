import { ChangeEvent, FormEvent } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/UI/Icons';

interface SearchInputProps {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const SearchInput = ({ value, onChange, onSubmit }: SearchInputProps) => {
	const t = useTranslations('Catalog');

	return (
		<form className='w-full' onSubmit={onSubmit}>
			<Input
				onChange={onChange}
				classNames={{
					base: 'max-w-full sm:max-w-full h-11',
					mainWrapper: 'h-full',
					input: 'text-[15px]',
					inputWrapper: 'h-full font-normal text-default-500 w-full pl-4 pr-0 border-gray-200 dark:border-gray-500 focus:border-gray-200',
				}}
				value={value}
				placeholder={t('search')}
				size="sm"
				radius='sm'
				variant='bordered'
				endContent={
					<Button
						type='submit'
						isIconOnly
						aria-label='Search'
						radius='sm'
						className='w-16 h-11 -mr-1 bg-gray-900 dark:bg-gray-50'
					>
						<Icons.SearchIcon className='fill-white dark:fill-gray-900'/>
					</Button>
				}
				type='search'
			/>
		</form>
	);
};
