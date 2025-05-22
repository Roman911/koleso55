import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import TyreDiskSizeCalcComponent from '@/components/TyreDiskSizeCalc';
import { Language } from '@/models/language';
import type { Metadata } from 'next';
import { language } from '@/lib/language';
import { getSettings } from '@/app/api/api';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = language(locale);
	const settings = await getSettings();

	return {
		title: settings[lang].meta_title,
		description: settings[lang].meta_description,
	}
}

export default async function TyreDiskSizeCalc({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;

	const path = [
		{
			title: 'tire calculator',
			translations: true,
			href: '/tyre-disk-size-calc'
		}
	];

	return (
		<LayoutWrapper className='max-w-7xl'>
			<Breadcrumbs path={ path } />
			<Title title='tire calculator' translations={ true } />
			<TyreDiskSizeCalcComponent locale={ locale } />
		</LayoutWrapper>
	)
};
