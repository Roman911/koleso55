'use client'
import Image from 'next/image';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import ShowAll from '@/components/Home/ShowAll';

const images = [
	[
		{ img: 'arivo', link: '29' },
		{ img: 'continental', link: '36' },
		{ img: 'debica', link: '153' },
		{ img: 'dunlop', link: '102' },
		{ img: 'funtoma', link: '87' },
		{ img: 'goodyear', link: '48' },
	],
	[
		{ img: 'henkook', link: '177' },
		{ img: 'kapsen', link: '177' },
		{ img: 'kelly', link: '177' },
		{ img: 'michelin', link: '177' },
		{ img: 'roadstone', link: '177' },
		{ img: 'rosava', link: '177' },
	]
];

const imagesMobile = [
	{ img: 'arivo', link: '29' },
	{ img: 'continental', link: '36' },
	{ img: 'debica', link: '153' },
	{ img: 'dunlop', link: '102' },
	{ img: 'funtoma', link: '87' },
	{ img: 'goodyear', link: '48' },
	{ img: 'henkook', link: '177' },
	{ img: 'kapsen', link: '232' },
	{ img: 'kelly', link: '232' },
	{ img: 'michelin', link: '232' },
	{ img: 'roadstone', link: '232' },
	{ img: 'rosava', link: '232' },
]

const TopBrands = () => {
	return (
		<>
			<Title title='popular brands' translations={ true } className='mt-24 mb-5 text-3xl font-bold px-3 md:px-0' />
			<div className='mt-10'>
				<div className='hidden md:block'>
					{ images.map((item, index) => {
						return (
							<div key={ index } className='p-2.5 flex items-center justify-between w-full'>
								{ item.map(i => {
									return (
										<Link key={ i.img } href={ `/catalog/tires/b-${ i.link }` }>
											<Image className='dark:hidden' src={ `/images/top-brands/${ i.img }.png` } alt='' width={ 150 } height={ 40 }/>
											<Image className='hidden dark:block' src={ `/images/top-brands/${ i.img }_dark.png` } alt='' width={ 150 } height={ 40 }/>
										</Link>
									)
								}) }
							</div>
						)
					}) }
				</div>
				<div className='md:hidden grid grid-cols-2 gap-4'>
					{ imagesMobile.map((item, index) => {
						return (
							<div key={ index } className='flex items-center justify-center w-full'>
								<Link href={ `/catalog/tires/b-${ item.link }` }>
									<Image src={ `/images/top-brands/${ item.img }_dark.png` } alt='' width={ 140 } height={ 40 }/>
								</Link>
							</div>
						)
					}) }
				</div>
			</div>
			<ShowAll href='/catalog/tires' />
		</>
	)
};

export default TopBrands;
