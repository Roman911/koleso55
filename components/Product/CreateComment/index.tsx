'use client'
import { FC, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { addToast } from '@heroui/toast';
import { baseDataAPI } from '@/services/baseDataService';
import Rating from '@/components/UI/Rating';
import { Button, Input, Form, Textarea } from '@heroui/react';

interface CreateCommentProps {
	model_id?: number
	product_id?: number
	trc_id?: number
}

const CreateComment: FC<CreateCommentProps> = ({ model_id, product_id, trc_id }) => {
	const [ rate, setRate ] = useState<number>(0);
	const [ createComment, { isLoading } ] = baseDataAPI.useCreateCommentMutation();
	const t = useTranslations('CreateComment');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const name = formData.get('name');
		const text = formData.get('text');

		await createComment({
			text,
			name,
			score: rate,
			model_id,
			product_id,
			trc_id,
		}).then(data => {
			if(data) {
				addToast({
					title: t('sent comment'),
					description: t('your comment sent'),
					classNames: { base: 'text-black dark:text-gray-50', title: 'text-black dark:text-gray-50' },
				});
				form.reset(); // Reset form fields
				setRate(0); // Reset rating
			}
		})
	}

	return (
		<Form onSubmit={ onSubmit }>
			<div className='bg-white dark:bg-[#171719] shadow-md mt-6 w-full'>
				<h6 className='font-bold text-lg py-4 px-6 bg-blue-100 dark:bg-gray-900'>
					{ t('leave review') }
				</h6>
				<div className='pt-4 px-6 pb-6 flex flex-col gap-4'>
					<Input
						isRequired
						errorMessage={ t('enter your name') }
						label={ t('name') }
						name='name'
						type='text'
					/>
					<Textarea
						name='text'
						isRequired
						errorMessage={ t('enter your comment') }
						label={ t('comment') }
					/>
					<div className='flex items-center'>
						<span className='mr-2 ml-2 text-sm font-semibold'>
							{ t('rating') }
						</span>
						<Rating commentsAvgRate={ rate } size='medium' isCreateComment={ true } setRate={ setRate }/>
					</div>
					<Button type='submit' color='primary' radius='full' size='lg'
									className='uppercase font-bold' isLoading={ isLoading } disabled={ isLoading }>
						{ t('add comment') }
					</Button>
				</div>
			</div>
		</Form>
	)
};

export default CreateComment;
