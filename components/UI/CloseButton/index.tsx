import { FC, type MouseEventHandler } from 'react';

import { CloseIcon } from '../Icons';

interface CloseButtonProps {
	handleClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
}

const CloseButton: FC<CloseButtonProps> = ({ handleClick }) => {
	return (
		<button
			className='absolute right-3 top-2 bg-[#848486] rounded-full p-1 text-white hover:bg-primary cursor-pointer'
			onClick={ handleClick }
		>
			<CloseIcon className='w-2.5 h-2.5'/>
		</button>
	)
};

export default CloseButton;
