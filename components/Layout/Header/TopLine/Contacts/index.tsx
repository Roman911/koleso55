'use client'
import Image from 'next/image';
import { FC } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import * as Icons from '@/components/UI/Icons';
import { SettingsProps } from '@/models/settings';

interface Props {
	settings: SettingsProps
}

const Contacts: FC<Props> = ({ settings }) => {
	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell" | undefined }[] = [
		{ phone: settings.ua.config_telephone_life, url: settings.ua.config_telephone_life_url, logo: 'lifecell' },
		{ phone: settings.ua.config_telephone_vodafone, url: settings.ua.config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings.ua.config_telephone_kievstar, url: settings.ua.config_telephone_kievstar_url, logo: 'kievstar' },
	];

	const filterTelephones = telephones.filter(i => i.phone);

	return (
		<Dropdown>
			<DropdownTrigger className='lg:hidden'>
				<Button variant='light' className='p-0 min-w-12 gap-1 text-white font-medium' startContent={ <Image width={ 24 } height={ 24 } src='/icons/lifecell-logo.svg' alt=''/> } endContent={ <Icons.ChevronDownIcon className='h-2 w-2' /> }>
					{ settings.ua.config_telephone_life }
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Dynamic Actions" items={filterTelephones}>
				{(item) => (
					<DropdownItem
						key={ item.phone }
						startContent={ item.logo ? <Image width={ 24 } height={ 24 } src={`/icons/${item.logo}-logo.svg`} alt=''/> :
							<Icons.PhoneIcon className='fill-primary' /> }
					>
						<a href={`tel:${item.url}`} className='ml-2.5 font-medium'>
							{item.phone}
						</a>
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	)
};

export default Contacts;
