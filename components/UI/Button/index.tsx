import { Button, ButtonProps } from '@heroui/react';

const MyButton = (
	{
		children,
		color='primary',
		...props
	}: ButtonProps ) => {
	return <Button
		size='lg'
		radius='sm'
		color={ color }
		{ ...props }
	>
		{ children }
	</Button>
};

export default MyButton;
