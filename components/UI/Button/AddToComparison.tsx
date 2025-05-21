import { FC } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addComparison, removeComparison } from '@/store/slices/comparisonSlice';
import { setProgress } from '@/store/slices/progressSlice';
import * as Icons from '@/components/UI/Icons';
import { updateStorage } from './helper';

interface Props {
	id: number
	section: string
	isProduct?: boolean
}

const AddToComparison: FC<Props> = ({ id, section, isProduct }) => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const t = useTranslations('AddButton');
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isComparison = comparisonItems.some(item => item.id === id);

	const handleClick = () => {
		if(pathname !== '/comparison') dispatch(setProgress(true));
		router.push('/comparison');
	}

	// Toggle bookmarks
	const handleClickBookmarks = () => {
		addToast({
			description: t(isComparison ? 'product removed from comparison' : 'product added to comparison'),
			classNames: { base: 'text-black dark:text-gray-50', title: 'text-black dark:text-gray-50' },
			endContent: !isComparison && (
				<Button onPress={ handleClick } color='primary' size='sm' variant='bordered'>
					{ t('comparison') }
				</Button>
			),
		});
		dispatch(isComparison ? removeComparison(id) : addComparison({ id, section }));
		updateStorage('reducerBookmarks', id, section, isComparison);
	};

	return (
		<Button
			onPress={ handleClickBookmarks }
			isIconOnly
			aria-label='Defense'
			radius='full'
			variant={ isProduct ? 'flat' : 'light' }
			className={ twMerge('text-gray-400 hover:text-primary dark:hover:text-primary', isComparison && 'text-primary', isProduct && 'dark:bg-gray-500 dark:text-gray-50 bg-gray-200 w-12 h-12 p-3') }
		>
			<Icons.LibraIcon />
		</Button>
	)
};

export default AddToComparison;
