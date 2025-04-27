import { Link } from '@/i18n/routing';

interface SearchResultItemProps {
	item: {
		group: number;
		page_url: string;
		full_name: string;
	};
	onItemClick: () => void;
}

export const SearchResultItem = ({ item, onItemClick }: SearchResultItemProps) => (
	<li className='my-3'>
		<Link
			className='hover:underline'
			onClick={onItemClick}
			href={`/${item.page_url}`}
		>
			{item.full_name}
		</Link>
	</li>
);
