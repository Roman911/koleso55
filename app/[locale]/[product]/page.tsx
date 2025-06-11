import type { Metadata } from 'next';
import { Section } from '@/models/filter';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductComponent from '@/components/Product';
import { Language } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import SimilarProducts from '@/components/SimilarProducts';
import { getProduct, getSettings } from '@/app/api/api';

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
	const { product } = await params;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const id = match ? match[1] : '';
	const response = await getProduct(id);

	return {
		title: response.data.full_name || '',
		description: response.data.full_name || '',
	}
}

export default async function Product({ params }: { params: Promise<{ locale: Language, product: string }> }) {
	const { locale, product } = await params;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const idProduct = match ? match[1] : '';
	const productResponse = await getProduct(idProduct);
	const settings = await getSettings();
	const section = /\bdia\d+\b/.test(product) ? Section.Disks : /(?:^|[^a-zA-Z])\d+ah(?=-|$)/.test(product) ? Section.Battery : Section.Tires;

	const path = [
		{
			title: section,
			translations: true,
			href: `/catalog/${ section }`
		},
		{
			title: productResponse?.data.full_name || '',
			translations: false,
			href: `/${ section }`
		}
	];

	return (
		<LayoutWrapper className='max-w-7xl'>
			<Breadcrumbs path={ path }/>
			<ProductComponent
				idProduct={ idProduct }
				locale={ locale }
				data={ productResponse }
				section={ section }
				settings={ settings }
			/>
			{ section !== Section.Battery &&
				<SimilarProducts offerGroup={ productResponse.data.offer_group } section={ section }/> }
		</LayoutWrapper>
	)
};
