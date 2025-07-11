'use client'
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { addToast } from '@heroui/toast';
import * as Icons from '@/components/UI/Icons';
import { Button, Form, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import { baseDataAPI } from '@/services/baseDataService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';

interface Props {
	id: number | undefined
	quantity: number
}

const CallbackModal: FC<Props> = ({ id, quantity }) => {
	const t = useTranslations('CallbackModal');
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const [ createCallback, { isLoading } ] = baseDataAPI.useCreateCallbackMutation();
	const phoneInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if(isOpen) {
			const timeout = setTimeout(() => {
				phoneInputRef.current?.focus();
			}, 100);

			return () => clearTimeout(timeout);
		}
	}, [ isOpen ]);

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const phoneTransform = formatPhoneNumber(phone);

		if(phoneTransform.length < 13) {
			setPhoneErrorMessage('enter your phone number');
		} else {
			await createCallback({
				phone: phoneTransform,
				product_id: id?.toString(),
				quantity: quantity.toString(),
			}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
				if(response?.data?.result) {
					addToast({
						title: t('sent message'),
						description: t('our manager'),
						classNames: { base: 'text-black dark:text-gray-50', title: 'text-black dark:text-gray-50' },
					});
					onClose();
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			});
		}
	}

	return (
		<>
			<button onClick={ onOpen } aria-label='mail' className='group relative'>
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
				<span className="relative inline-flex rounded-full w-12 h-12 bg-primary p-3">
					<Icons.PhoneCircuitIcon className='stroke-white'/>
				</span>
			</button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } placement='top-center'>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100 uppercase"
										id="modal-title">
									{ t('callback') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<Form
									className='mt-2 mb-8 flex flex-col gap-4'
									onSubmit={ onSubmit }
								>
									<p className="text-sm text-gray-500 dark:text-gray-200">
										{ t('put phone') }
									</p>
									<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage } ref={ phoneInputRef } setPhoneErrorMessage={ setPhoneErrorMessage }/>
									<Button type='submit' color='primary' radius='full' size='lg' isLoading={ isLoading }
													className='uppercase font-bold ml-auto'>
										{ t('send') }
									</Button>
								</Form>
							</ModalBody>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default CallbackModal;
