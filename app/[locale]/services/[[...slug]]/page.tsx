import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { Language } from '@/models/language';
import type { Metadata } from 'next';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import { getProducts, getSettings } from '@/app/api/api';
import { language } from '@/lib/language';

const pageItem = 12;

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = language(locale);
	const settings = await getSettings();

	return {
		title: settings[lang].meta_title,
		description: settings[lang].meta_description,
	}
}

export default async function Services({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;
	const value = slug?.find(item => item.startsWith('p-'));
	const page = value ? parseInt(value.split('-')[1], 10) : null;
	const products = await getProducts('?typeproduct=5&categories=8', page ? (page - 1) * pageItem : 0, 12);

	const path = [
		{
			title: 'services',
			href: '/',
			translations: true
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title='auto goods' translations={ true } className='mt-3 text-lg font-medium px-0 md:px-3 mb-3 md:mb-1' />
			{ products.result ? <ProductList
				classnames='grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
				data={ products.data }
			/> : <NoResult noResultText='no result' /> }
		</LayoutWrapper>
	)
};
