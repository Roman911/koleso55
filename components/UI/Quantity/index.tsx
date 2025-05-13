import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface QuantityProps {
	id: number
	price?: string
	quantity: number
	offerQuantity: number
	onChange: (e: { target: HTMLInputElement }) => void
	setQuantity: (id: number, quantity: number) => void
	isCart?: boolean
}

const Quantity: FC<QuantityProps> = ({ id = 0, price = 0, quantity, offerQuantity, onChange, setQuantity, isCart }) => {
	return <div className={ twMerge('quantity flex items-center', isCart && 'md:flex-col gap-6 md:items-end') }>
		<div className='flex gap-1.5'>
			<button
				onClick={() => setQuantity(id,quantity > 1 ? quantity - 1 : 1)}
				className='p-2 w-10 text-center font-bold rounded-sm text-[#575C66] border-1 border-[#EBECF0] bg-[#EBECF0] hover:bg-[#D2D3D6] transition dark:border-gray-500 dark:bg-gray-800 dark:text-[#949699]'>-
			</button>
			<input
				onChange={e => onChange(e)}
				className='w-10 rounded-sm border border-gray-700 bg-white text-center font-medium text-black'
				value={ quantity }
				placeholder='1'
				type="text"
			/>
			<button
				onClick={() => setQuantity(id,quantity < offerQuantity ? quantity + 1 : offerQuantity)}
				className='p-2 w-10 text-center font-bold rounded-sm text-[#575C66] border-1 border-[#EBECF0] bg-[#EBECF0] hover:bg-[#D2D3D6] transition dark:border-gray-500 dark:bg-gray-800 dark:text-[#949699]'>+
			</button>
		</div>
		{ price !== 0 && <div className={ twMerge('text-xl font-bold', !isCart && 'ml-6 text-2xl') }>
			{ +price * (quantity ?? 0) } грн
		</div> }
	</div>
};

export default Quantity;
