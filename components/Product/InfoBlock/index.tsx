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

	const links = [
		{ href: '/page/shipment', icon: Icons.DeliveryIcon, label: t('delivery') },
		{ href: '/page/payment', icon: Icons.PaymentIcon, label: t('payment') },
		{ href: '/page/garantiya-ta-povernennya', icon: Icons.GuaranteeIcon, label: t('warranty and returns') },
	];

	const linkClass = 'mt-4 flex items-center gap-x-2.5 font-medium hover:text-primary text-sm group';
	const textClass = 'underline group-hover:no-underline';

	return (
		<div className="lg:w-80">
			<div className="bg-white rounded-2xl border border-[#EAECEE] px-5 py-7 dark:bg-gray-800 dark:border-[#707070]">
				<div className="font-bold mb-4">{ t('order by number') }:</div>
				<Contacts isTopLine={ false } settings={ settings } isInfo/>
				<div
					className="mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap dark:border-[#707070]">
					{ settings[lang].config_address }
				</div>

				{ links.map(({ href, icon: Icon, label }) => (
					<Link key={ href } href={ href } className={ linkClass }>
						<Icon className="fill-primary"/>
						<span className={ textClass }>{ label }</span>
					</Link>
				)) }
			</div>
		</div>
	);
};

export default InfoBlock;
