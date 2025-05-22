import type { Metadata } from 'next';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Filter from '@/components/Home/Filter';
import Title from '@/components/UI/Title';
import TextSeo from '@/components/UI/TextSeo';
import TopBrands from '@/components/Home/TopBrands';
import PopularSizes from '@/components/Home/PopularSizes';
import Reviews from '@/components/Home/Reviews';
import PopularCarBrands from '@/components/Home/PopularCarBrands';
import ShowAll from '@/components/Home/ShowAll';
import { getFeatureParams, getProducts, getReviews, getSettings } from '@/app/api/api';
import { language } from '@/lib/language';
import CatalogContent from '@/components/Catalog/CatalogContent';
import { Section } from '@/models/filter';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = language(locale);
	const settings = await getSettings();

	return {
		title: settings[lang].meta_title,
		description: settings[lang].meta_description,
		openGraph: {
			type: 'website',
			title: settings[lang].meta_title,
			description: settings[lang].meta_description,
			url: process.env.NEXT_PUBLIC_ACCESS_ORIGIN,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/logo_light.svg`,
					width: 1200,
					height: 630,
					alt: settings[lang].meta_title,
				},
			],
		},
		twitter: {
			card: settings[lang].meta_title,
			title: settings[lang].meta_title,
			description: settings[lang].meta_description,
		},
		generator: process.env.NEXT_PUBLIC_ACCESS_ORIGIN,
	}
}

export default async function Home({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await getSettings();
	const products = await getProducts('?typeproduct=1&order[value]=featured&order[asc]=0', 0, 8);
	const featureParams = await getFeatureParams();
	const reviews = await getReviews();

	return (
		<>
			<Filter />
			<LayoutWrapper>
				<div className='max-w-7xl mx-auto'>
					<Title title={ response[lang].h2_top } className='mt-12 text-3xl font-bold px-3 md:px-0' />
					<CatalogContent section={ Section.Tires } locale={ locale } result={ products.result } data={ products.data } />
					{ products.result && <ShowAll href='/catalog/tires' />}
					{ featureParams.ProductTiporazmer && <PopularSizes locale={ locale } settings={ response } popularSizes={ featureParams.ProductTiporazmer } /> }
					<TopBrands />
					{ reviews && <Reviews reviews={ reviews } /> }
					{ featureParams.Car2Brand && <PopularCarBrands locale={ locale } settings={ response } popularCarBrands={ featureParams.Car2Brand } /> }
					<TextSeo description={ response[lang].description }/>
				</div>
			</LayoutWrapper>
		</>
	);
};
