'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button, Input } from '@heroui/react';

interface SelectFromTo {
	name: string;
	idMin: string;
	idMax: string;
	from: number;
	to: number;
	title: string;
	btnTitle: string;
	minus?: boolean;
}

export const SelectFromTo: FC<SelectFromTo> = (
	{
		idMin,
		idMax,
		from,
		to,
		title,
		btnTitle,
		minus,
	}
) => {
	const path = usePathname();
	const t = useTranslations('Filters');
	const [ minMax, setMinMax ] = useState({ min: '', max: '' });
	const cleanUrl = useMemo(() => {
		return (url: string): string =>
			url
				.replace(new RegExp(`/${idMin}-\\d+`), '')
				.replace(new RegExp(`/${idMax}-\\d+`), '');
	}, [ idMin, idMax ]);

	useEffect(() => {
		const matchMin = path.match(new RegExp(`${idMin}-(\\d+(,\\d+)*)`));
		const matchMax = path.match(new RegExp(`${idMax}-(\\d+(,\\d+)*)`));

		setMinMax({
			min: matchMin?.[0]?.replace(`${ idMin }-`, '') || '',
			max: matchMax?.[0]?.replace(`${ idMax }-`, '') || '',
		});
	}, [ path, idMin, idMax ]);

	const onChange = useCallback(
		(param: 'min' | 'max', value: string) => {
			const onlyNumbers = value.replace(minus ? /[^\d-]/g : /\D/g, '');
			setMinMax(prev => ({ ...prev, [param]: onlyNumbers }));
		},
		[ minus ]
	);

	const href = useMemo(() => {
		const parts = [
			minMax.min && `/${ idMin }-${ minMax.min }`,
			minMax.max && `/${ idMax }-${ minMax.max }`,
		]
			.filter(Boolean)
			.join('');
		return `${ cleanUrl(path) }${ parts }`;
	}, [ minMax, path, idMin, idMax, cleanUrl ]);

	return (
		<div className="mt-5">
			<div className="text-sm font-bold text-gray-500 uppercase dark:text-[#949699]">
				{ title }
			</div>
			<div className="flex gap-2 mt-3 justify-between">
				<Input
					className="md:max-w-28 rounded-lg dark:bg-gray-800 dark:text-[#949699]"
					placeholder={ `${ t('from') } ${ from }` }
					maxLength={ 6 }
					value={ minMax.min }
					variant="bordered"
					radius="sm"
					onChange={ e => onChange('min', e.target.value) }
				/>
				<Input
					className="md:max-w-28 rounded-lg dark:bg-gray-800 dark:text-[#949699]"
					placeholder={ `${ t('to') } ${ to }` }
					maxLength={ 6 }
					value={ minMax.max }
					variant="bordered"
					radius="sm"
					onChange={ e => onChange('max', e.target.value) }
				/>
			</div>
			<Button
				as={ Link }
				href={ href }
				radius="sm"
				className="bg-black dark:bg-primary text-white w-full uppercase mt-4 mb-4"
			>
				{ btnTitle }
			</Button>
		</div>
	);
};
