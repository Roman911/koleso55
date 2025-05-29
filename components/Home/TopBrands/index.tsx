'use client';
import Image from 'next/image';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import ShowAll from '@/components/Home/ShowAll';

const brandsDesktop = [
	[
		{ img: 'arivo', link: '14' },
		{ img: 'continental', link: '48' },
		{ img: 'debica', link: '58' },
		{ img: 'dunlop', link: '66' },
		{ img: 'funtoma', link: '88' },
		{ img: 'goodyear', link: '102' },
	],
	[
		{ img: 'henkook', link: '111' },
		{ img: 'kapsen', link: '0' },
		{ img: 'kelly', link: '127' },
		{ img: 'michelin', link: '161' },
		{ img: 'roadstone', link: '207' },
		{ img: 'rosava', link: '291' },
	],
];

const brandsMobile = brandsDesktop.flat();

const BrandLink = ({ img, link, darkOnly = false }: { img: string, link: string, darkOnly?: boolean }) => (
	<Link href={`/catalog/tires/b-${link || '0'}`}>
		<Image
			className={darkOnly ? '' : 'dark:hidden'}
			src={`/images/top-brands/${img}${darkOnly ? '_dark' : ''}.png`}
			alt={img}
			width={150}
			height={40}
			loading='lazy'
		/>
		{!darkOnly && (
			<Image
				className="hidden dark:block"
				src={`/images/top-brands/${img}_dark.png`}
				alt={img}
				width={150}
				height={40}
				loading='lazy'
			/>
		)}
	</Link>
);

const TopBrands = () => {
	return (
		<>
			<Title title="popular brands" translations={true} className="mt-24 mb-5 text-3xl font-bold px-3 md:px-0" />
			<div className="mt-10">
				{/* Desktop */}
				<div className="hidden md:block">
					{brandsDesktop.map((row, rowIndex) => (
						<div key={rowIndex} className="p-2.5 flex items-center justify-between w-full">
							{row.map(({ img, link }) => (
								<BrandLink key={img} img={img} link={link} />
							))}
						</div>
					))}
				</div>
				{/* Mobile */}
				<div className="md:hidden grid grid-cols-2 gap-4">
					{brandsMobile.map(({ img, link }) => (
						<div key={img} className="flex items-center justify-center w-full">
							<BrandLink img={img} link={link} />
						</div>
					))}
				</div>
			</div>
			<ShowAll href="/catalog/tires" />
		</>
	);
};

export default TopBrands;
