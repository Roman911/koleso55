'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import { Link } from '@/i18n/routing';
import * as Icons from '@/components/UI/Icons';

interface Props {
	path: {
		href: string
		title: string
		translations?: boolean
	}[]
}

const MyBreadcrumbs: FC<Props> = ({ path }) => {
	const t = useTranslations('Main');

	return (
		<Breadcrumbs separator='/' underline='always' className=' hover:text-primary' itemClasses={{ item: 'text-[#575C66]', separator: 'text-[#575C66]' }}>
			<BreadcrumbItem href='/'>
				<Icons.HomeIcon className='w-4 h-4'/>
			</BreadcrumbItem>
			{ path.filter(item => item.href !== '').map((item, index) => {
				return (
					<BreadcrumbItem key={ index + 1 } href={ item.href } classNames={{ separator: 'text-[#575C66]', item: 'text-[#575C66] hover:text-primary' }}>
						{ item.translations ? t(item.title) : item.title }
					</BreadcrumbItem>
				)
			}) }
		</Breadcrumbs>
	)
};

export default MyBreadcrumbs;
