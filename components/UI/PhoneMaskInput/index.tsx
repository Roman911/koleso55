'use client'
import { forwardRef, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';
import { Input } from '@heroui/react';

interface Props {
	phoneErrorMessage: null | string;
}

const codes = [ '50', '63', '66', '67', '68', '73', '77', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99' ];

const PhoneMaskInput = forwardRef<HTMLInputElement, Props>(({ phoneErrorMessage }, ref) => {
	const t = useTranslations('PhoneMask');
	const [ phone, setPhone ] = useState<string | null>(null);

	const handleChangeAmount = (values: { value: string }) => {
		let newValue = values.value;

		if(newValue.length >= 2) {
			const code2 = newValue.slice(0, 2);

			if(!codes.includes(code2)) {
				newValue = newValue.slice(2);
			}
		}
		setPhone(newValue);
	};

	return (
		<PatternFormat
			label={ t('phone number') }
			isRequired
			isInvalid={ !!phoneErrorMessage && phone?.length !== 10 }
			errorMessage={ phoneErrorMessage && t(phoneErrorMessage) }
			format="+38 (0##)###-##-##"
			allowEmptyFormatting
			mask='_'
			value={ phone }
			onValueChange={ handleChangeAmount }
			customInput={ Input }
			aria-label="input-monto"
			name='phone'
			getInputRef={ ref }
		/>
	);
});

PhoneMaskInput.displayName = 'PhoneMaskInput';
export default PhoneMaskInput;
