'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/react';
import { Section } from '@/models/filter';

const ShowMore = ({ slug = [], section }: { slug?: string[], section: Section; }) => {
	const t = useTranslations('Main');
	const hasSlug = slug && slug.some(cls => /^p-\d+$/.test(cls));

	const updatedSlug = hasSlug
		? slug.map(cls => {
			const match = cls.match(/^p-(\d+)$/);
			if (match) {
				const newValue = parseInt(match[1], 10) + 1;
				return `p-${newValue}`;
			}
			return cls;
		})
		: ['p-2', ...slug];

	return (
		<Button
			as={ Link }
			href={ `/catalog/${ section }/${ updatedSlug.join('/') }` }
			variant='bordered'
			size='lg'
			radius='sm'
			className='mt-8 w-full bg-white text-black uppercase font-bold'
			// onPress={ () => setOffset((prev) => prev + 1) }
		>
			{ t('show more') }
		</Button>
	)
};

export default ShowMore;
