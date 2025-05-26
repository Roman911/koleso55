import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import { Language } from '@/models/language';
import FilterAlt from '@/components/Catalog/FilterAlt';
import { Section } from '@/models/filter';
import FilterByCar from '@/components/Catalog/FilterByCar';
import { transformUrl } from './transformUrl';
import SelectionByCar from '@/components/Catalog/SelectionByCar';
import HeaderCatalog from '@/components/Catalog/HeaderCatalog';
import type { Metadata } from 'next';
import { getFilterData, getSettings } from '@/app/api/api';
import { language } from '@/lib/language';
import GetProducts from '@/components/Catalog/GetProducts';

const pageItem = 12;
const sort = {
	ch: '&order[asc]=1',
	ex: '&order[asc]=0',
	pop: '&order[value]=popular&order[asc]=0',
	off: '&order[value]=offers'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = language(locale);
	const settings = await getSettings();

	return {
		title: settings[lang].meta_title,
		description: settings[lang].meta_description,
	}
}

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const value = slug?.find(item => item.startsWith('p-'));
	const pageFrom = value ? parseInt(value.split('-')[1], 10) : null;
	const filterData = await getFilterData(
		`?typeproduct=${section === Section.Disks ? 3 : section === Section.Battery ? 4 : 1}`,
	);
	const paramsUrl = transformUrl({ section, slug });
	const found = slug?.find(item => item.startsWith('order-'))?.split('-')[1] as keyof typeof sort;
	const searchParams = `?${paramsUrl || ''}${found && sort[found] ? sort[found] : ''}`;
	const car = slug?.find(segment => segment.startsWith('car-')) || null;

	return (
		<LayoutWrapper className='max-w-7xl'>
			<HeaderCatalog section={ section } slug={ slug } />
			<div className='py-5 lg:flex lg:gap-10'>
				<FilterAlt filterData={ filterData } section={ section } car={ car } />
				<div className='flex-1 -mt-8 lg:-mt-6'>
					<FilterByCar />
					<SelectionByCar car={ car } section={ section } />
					<GetProducts searchParams={ searchParams } pageFrom={ pageFrom } pageTo={ null} section={ section } slug={ slug } locale={ locale } pageItem={ pageItem } />
				</div>
			</div>
		</LayoutWrapper>
	)
};
