import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Button from '@/components/UI/Button';

interface SearchAllResultsButtonProps {
	totalCount: number;
	onClick: () => void;
}

export const SearchAllResultsButton = ({ totalCount, onClick }: SearchAllResultsButtonProps) => {
	const t = useTranslations('Catalog');

	return (
		<Button
			as={ Link }
			onPress={ onClick }
			href='/search'
			className='mx-auto w-full'
		>
			{ t('all search result') + ' ' }
			({ totalCount })
		</Button>
	);
};
