'use client'
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterShareButton,
	ViberIcon,
	ViberShareButton
} from 'next-share';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { addBookmarks, removeBookmarks } from '@/store/slices/bookmarksSlice';
import { addComparison, removeComparison } from '@/store/slices/comparisonSlice';
import * as Icons from '../../UI/Icons';
import CallbackModal from '@/components/Product/ActionsBlock/CallbackModal';

// Helper function to update local storage
const updateStorage = (storageKey: string, id: number, section: string, shouldRemove: boolean) => {
	if(shouldRemove) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [ ...storage, { id, section } ]);
	}
};

interface ActionsBlockProps {
	id: number
	className: string
	section: string
	quantity: number
}

const ActionsBlock: FC<ActionsBlockProps> = ({ id, className, section, quantity }) => {
	const t = useTranslations('ActionBlock');
	const pathname = usePathname();
	const url = process.env.ACCESS_ORIGIN + pathname;
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isBookmarks = bookmarksItems.some(item => item.id === id);
	const isComparison = comparisonItems.some(item => item.id === id);

	// Toggle bookmarks
	const handleClickBookmarks = () => {
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks({ id, section }));
		updateStorage('reducerBookmarks', id, section, isBookmarks);
	};

	// Toggle comparison
	const handleClickComparison = () => {
		dispatch(isComparison ? removeComparison(id) : addComparison({ id, section }));
		updateStorage('reducerComparison', id, section, isComparison);
	};

	const handleClick = () => {
		navigator.clipboard.writeText(url).then(r => console.log(r));
		addToast({
			title: t('copy link'),
			classNames: { base: 'text-black dark:text-gray-50', title: 'text-black dark:text-gray-50' },
		});
	}

	return (
		<div className={ twMerge('gap-1.5 xl:gap-4 h-full', className) }>
			<CallbackModal id={ id } quantity={ quantity }/>
			<Button
				onPress={ handleClickBookmarks }
				isIconOnly aria-label='mail'
				className={ twMerge('bg-gray-200 w-12 h-12 p-3 rounded-full group text-gray-400 hover:text-primary dark:bg-gray-500 dark:text-gray-50 dark:hover:text-primary', isBookmarks && 'text-primary') }
			>
				<Icons.HeartIcon
					className={ twMerge( isBookmarks && 'fill-primary') }/>
			</Button>
			<Button
				onPress={ handleClickComparison }
				isIconOnly aria-label='mail'
				className={ twMerge('bg-gray-200 w-12 h-12 p-3 rounded-full group text-gray-400 hover:text-primary dark:bg-gray-500 dark:text-gray-50 dark:hover:text-primary', isComparison && 'text-primary') }
			>
				<Icons.LibraIcon />
			</Button>
			<div className='w-12 h-12 p-3 bg-gray-200 rounded-full group cursor-pointer relative text-gray-400 hover:text-primary dark:bg-gray-500 dark:text-gray-50 dark:hover:text-primary'>
				<Icons.ShareIcon />
				<div
					className='absolute top-10 left-0 bg-white rounded shadow-md py-4 px-6 hidden group-hover:flex flex-col gap-4 z-10'>
					<FacebookShareButton url={ url }>
						<div className='flex items-center gap-x-2'>
							<FacebookIcon size={ 26 } round/>
							<span className='text-sm font-semibold'>
								Facebook
							</span>
						</div>
					</FacebookShareButton>
					<TelegramShareButton url={ url } className='mt-3 flex items-center gap-x-2'>
						<div className='flex items-center gap-x-2'>
							<TelegramIcon size={ 26 } round/>
							<span className='text-sm font-semibold'>
								Telegram
							</span>
						</div>
					</TelegramShareButton>
					<ViberShareButton url={ url }>
						<div className='flex items-center gap-x-2'>
							<ViberIcon size={ 26 } round/>
							<span className='text-sm font-semibold'>
								Viber
							</span>
						</div>
					</ViberShareButton>
					<TwitterShareButton url={ url }>
						<div className='flex items-center gap-x-2'>
							<TelegramIcon size={ 26 } round/>
							<span className='text-sm font-semibold'>
								Twitter
							</span>
						</div>
					</TwitterShareButton>
					<EmailShareButton url={ url }>
						<div className='flex items-center gap-x-2'>
							<EmailIcon size={ 26 } round/>
							<span className='text-sm font-semibold'>
								{ t('mail') }
							</span>
						</div>
					</EmailShareButton>
					<button onClick={ () => handleClick() }
									className='flex items-center gap-x-2 text-sm font-semibold'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-gray-700 w-4'>
							<path
								d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
						</svg>
						{ t('copy') }
					</button>
				</div>
			</div>
		</div>
	)
};

export default ActionsBlock;
