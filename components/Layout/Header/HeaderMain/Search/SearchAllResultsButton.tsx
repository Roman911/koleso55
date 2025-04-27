import { Button } from '@heroui/button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface SearchAllResultsButtonProps {
	totalCount: number;
	onClick: () => void;
}

export const SearchAllResultsButton = ({ totalCount, onClick }: SearchAllResultsButtonProps) => {
	const t = useTranslations('Catalog');

	return (
		<Button
			as={Link}
			onPress={onClick}
			href='/search'
			className='mx-auto rounded-sm w-full'
			color='primary'
		>
			{t('all search result') + ' '}
			({totalCount})
		</Button>
	);
};
