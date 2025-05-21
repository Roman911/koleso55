import { FC } from 'react';
import { Section } from '@/models/filter';
import AddToDefense from '@/components/UI/Button/AddToDefense';
import AddToComparison from '@/components/UI/Button/AddToComparison';

interface Props {
	group: number
	sectionNew: Section.Disks | 'cargo' | 'tires' | 'battery'
}

const ActionsBlock: FC<Props> = ({ group, sectionNew }) => {
	return (
		<div className='absolute top-2 md:top-5 right-2 md:right-5 flex flex-col z-10'>
			<AddToDefense id={ group } section={ sectionNew } />
			<AddToComparison id={ group } section={ sectionNew } />
		</div>
	)
};

export default ActionsBlock;
