'use client';
import Image from 'next/image';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations, useLocale } from 'next-intl';
import { SettingsProps } from '@/models/settings';
import { Language, LanguageCode } from '@/models/language';

interface Props {
	isTopLine: boolean
	settings: SettingsProps
	isInfo?: boolean
}

const Contacts: FC<Props> = ({ isTopLine, settings, isInfo }) => {
	const t = useTranslations('Main');
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell" | undefined }[] = [
		{ phone: settings[lang].config_telephone_vodafone, url: settings[lang].config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings[lang].config_telephone_kievstar, url: settings[lang].config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings[lang].config_telephone_life, url: settings[lang].config_telephone_life_url, logo: 'lifecell' },
	];

	return (
		<div className={ twMerge('flex items-center gap-2', isTopLine && 'md:hidden') }>
			{ telephones.filter(item => item.phone).map((item, index) => {
				return (
					<div key={ index } className='flex items-center'>
						<Image width={ 20 } height={ 20 } src={`/icons/${item.logo}-logo.svg`} alt=''/>
						<a href={`tel:${item.url}`} className={twMerge('ml-2.5 font-medium', isTopLine && 'text-white')}>
							{item.phone}
						</a>
					</div>
				)
			}) }
		</div>
	)
};

export default Contacts;
