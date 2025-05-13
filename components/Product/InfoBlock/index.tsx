import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Language, LanguageCode } from '@/models/language';
import { SettingsProps } from '@/models/settings';
import Contacts from '@/components/Layout/Header/Contacts';
import * as Icons from '../../UI/Icons';

const InfoBlock = ({ settings }: { settings: SettingsProps }) => {
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const t = useTranslations('InfoBlock');

	return <div className='lg:w-80'>
		<div className=' bg-white rounded-2xl border-1 border-[#EAECEE] px-5 py-7 dark:bg-gray-800 dark:border-[#707070]'>
			<div className='font-bold mb-4'>{ t('order by number') }:</div>
			<Contacts isTopLine={ false } settings={ settings } isInfo={ true }/>
			<div className='mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap dark:border-[#707070]'>
				{ settings[lang].config_address }
			</div>
			<Link href='/page/shipment'
						className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-primary text-sm group'>
				<Icons.DeliveryIcon className='fill-primary'/>
				<span className='underline group-hover:no-underline'>{ t('delivery') }</span>
			</Link>
			<Link href='/page/payment'
						className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-primary group text-sm'>
				<Icons.PaymentIcon className='fill-primary'/>
				<span className='underline group-hover:no-underline'>{ t('payment') }</span>
			</Link>
			<Link href='/page/garantiya-ta-povernennya'
						className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-primary group text-sm'>
				<Icons.GuaranteeIcon className='fill-primary'/>
				<span className='underline group-hover:no-underline'>{ t('warranty and returns') }</span>
			</Link>
		</div>
	</div>
};

export default InfoBlock;
