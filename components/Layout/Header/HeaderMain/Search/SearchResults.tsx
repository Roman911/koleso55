import { RefObject } from 'react';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/UI/Spinner';
import { SearchResultItem } from './SearchResultItem';
import { SearchAllResultsButton } from './SearchAllResultsButton';
import CloseButton from '@/components/UI/CloseButton';
import { ProductsProps } from '@/models/products';

interface SearchResultsProps {
	data: ProductsProps | undefined;
	isOpen: boolean;
	onClose: () => void;
	onAllResults: () => void;
	dropdownRef: RefObject<HTMLDivElement | null>;
}

export const SearchResults = ({
																data,
																isOpen,
																onClose,
																onAllResults,
																dropdownRef
															}: SearchResultsProps) => {
	const t = useTranslations('Catalog');

	if(!isOpen) return null;

	return (
		<div
			ref={ dropdownRef }
			className='absolute top-12 right-0 z-20 py-6 px-6 md:px-10 bg-gray-800 text-white rounded-sm w-full lg:max-w-[600px]'
		>
			<CloseButton handleClick={ onClose }/>
			<ul className='mb-8'>
				<Spinner height='h-20' show={ !data }>
					{ data?.result ? (
						data.data.products?.map(item => (
							<SearchResultItem
								key={ item.group }
								item={ item }
								onItemClick={ onClose }
							/>
						))
					) : (
						<p>{ t('no result by search') }</p>
					) }
				</Spinner>
			</ul>
			{ data?.result && (
				<SearchAllResultsButton
					totalCount={ data.data.total_count }
					onClick={ onAllResults }
				/>
			) }
		</div>
	);
};
