'use client';
import { FC, Dispatch, SetStateAction } from 'react';
import { Tab, Tabs } from '@heroui/react';

const ListIcon = () => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height="24"
			role="presentation"
			viewBox="0 0 512 512"
			width="24"
		>
			<path
				fill="currentColor"
				d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
			/>
		</svg>
	);
};

const TableIcon = () => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height="24"
			role="presentation"
			viewBox="0 0 512 512"
			width="24"
		>
			<path
				fill="currentColor"
				d="M224 80c0-26.5-21.5-48-48-48L80 32C53.5 32 32 53.5 32 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96zm0 256c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96zM288 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96z"
			/>
		</svg>
	);
};

interface Props {
	selected: string
	setSelected: Dispatch<SetStateAction<string>>
}

const MyTabs: FC<Props> = ({ selected, setSelected }) => {
	return (
		<Tabs
			radius='sm'
			size='sm'
			aria-label="Tabs variants"
			selectedKey={selected}
			onSelectionChange={(key) => setSelected(String(key))}
			classNames={{ base: 'ml-auto', tabList: 'bg-gray-200 ', tabContent: "group-data-[selected=true]:text-gray-100 text-gray-500", cursor: 'bg-[#393939]' }}
		>
			<Tab key="table" aria-label='Table' title={ <TableIcon /> }/>
			<Tab key="list" aria-label='List' title={ <ListIcon /> }/>
		</Tabs>
	)
};

export default MyTabs;
