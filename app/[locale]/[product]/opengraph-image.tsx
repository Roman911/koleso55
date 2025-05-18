import { ImageResponse } from 'next/og'
import { getProduct } from '@/app/api/api'

// Image metadata
export const size = {
	width: 1200,
	height: 630,
}

// Image generation
export default async function Image({ params }: { params: Promise<{ product: string }> }) {
	const { product } = await params
	const match = product.match(/(\d+)$/)
	const id = match ? match[1] : ''

	const response = await getProduct(id)

	if(!response) {
		return new ImageResponse(
			<div
				style={ {
					fontSize: 48,
					background: '#000',
					color: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				} }
			>
				Product not found
			</div>
		)
	}

	return new ImageResponse(
		(
			<div
				style={ {
					fontSize: 40,
					background: '#fff',
					color: '#000',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '40px',
					boxSizing: 'border-box',
				} }
			>
				<img
					src={ `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/${response.data.photo}` }
					alt={ response.data.full_name }
					width={ 400 }
					height={ 400 }
					style={ { objectFit: 'cover', marginBottom: 20 } }
				/>
				<div>{ response.data.full_name }</div>
				<div style={ { fontSize: 32, color: '#888' } }>{ response.data.min_price } ₴</div>
			</div>
		),
		{
			width: size.width,
			height: size.height,
		}
	)
}