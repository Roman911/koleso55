'use client';
import { useAppSelector } from '@/hooks/redux';
import { Section, Subsection } from '@/models/filter';
import Tires from '@/components/Catalog/SelectionByCar/Tires';
import Disks from '@/components/Catalog/SelectionByCar/Disks';

const SelectionByCar = ({ car, section }: { car: string | null, section: Section }) => {
	const { subsection } = useAppSelector(state => state.filterReducer);
	const numbers = car?.split('-').filter(part => /^\d+$/.test(part)).map(Number);

	if(subsection === Subsection.ByParams || !car) return null;

	return (
		<div className='mb-5 border-y py-4'>
			{ section === Section.Tires ? <Tires modification={ numbers ? numbers[3] : 0 } car={ car } /> : <Disks modification={ numbers ? numbers[3] : 0 } /> }
		</div>
	)
};

export default SelectionByCar;
