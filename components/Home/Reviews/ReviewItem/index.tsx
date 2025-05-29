'use client';
import { FC } from 'react';
import { Review } from '@/models/product';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { baseDataAPI } from '@/services/baseDataService';
import { Link } from '@/i18n/routing';
import Rating from '@/components/UI/Rating';
import Data from '@/components/UI/Data';

interface Props {
	review: Review;
}

const ReviewItem: FC<Props> = ({ review }) => {
	const { created_at, name, score, text } = review;
	const { data } = baseDataAPI.useFetchProductQuery(`${review.product_id}`);

	return (
		<Card className='max-w-11/12 md:max-w-[340px] mx-auto border-1 dark:border-[#707070] dark:bg-gray-800 shadow-lg' radius='sm'>
			<CardHeader className='justify-between text-black dark:text-gray-50'>
				<Rating commentsAvgRate={ score }/>
				<Data createdAt={ created_at }/>
			</CardHeader>
			<CardBody className='px-3 text-black dark:text-gray-50'>
				<div className='font-bold'>{ name }</div>
				<p className='mt-3'>{ text }</p>
			</CardBody>
			<CardFooter className="gap-3">
				{ data?.result && <Link href={`/${data.data.page_url}`} className='text-gray-400 py-3 text-sm hover:underline hover:text-primary dark:text-[#949699] dark:hover:text-primary' >
					{ data.data.full_name }
				</Link> }
			</CardFooter>
		</Card>
	)
};

export default ReviewItem;
