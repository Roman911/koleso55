'use client'
import { forwardRef, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';
import { Input } from '@heroui/input';

interface Props {
	phoneErrorMessage: null | string;
}

const PhoneMaskInput = forwardRef<HTMLInputElement, Props>(({ phoneErrorMessage }, ref) => {
	const t = useTranslations('PhoneMask');
	const [ phone, setPhone ] = useState<string | null>(null);

	const handleChangeAmount = (values: { value: string }) => {
		setPhone(values.value);
	};

	return (
		<PatternFormat
			label={ t('phone number') }
			isRequired
			isInvalid={!!phoneErrorMessage && phone?.length !== 10}
			errorMessage={ phoneErrorMessage && t(phoneErrorMessage) }
			format="+38 (###)###-##-##"
			allowEmptyFormatting
			mask='_'
			value={ phone }
			onValueChange={ handleChangeAmount }
			customInput={ Input }
			aria-label="input-monto"
			name='phone'
			getInputRef={ref}
		/>
	);
});

PhoneMaskInput.displayName = 'PhoneMaskInput';

export default PhoneMaskInput;