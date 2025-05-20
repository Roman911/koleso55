import { FC, useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import { Photo } from '@/models/product';
import './index.scss';

interface Props {
	images: Photo[]
	photo: {
		url_part: string
		url_part2: string
	}
}

export const ReactImageGallery: FC<Props> = ({ photo, images = [] }) => {
	const imageGalleryRef = useRef<any>(null);

	const onePhoto = {
		original: photo.url_part,
		thumbnail: photo.url_part2
	};

	const imgArr = images.map(item => {
		return {
			original: item.big,
			thumbnail: item.small
		}
	});

	const items = [ onePhoto, ...imgArr ];

	const onClickHandler = () => {
		imageGalleryRef.current?.toggleFullScreen();
	};

	return (
		<div className='max-w-72 mx-auto'>
			<ImageGallery
				items={items}
				showPlayButton={ false }
				ref={ imageGalleryRef }
				onClick={ onClickHandler }
				showThumbnails={ items.length > 1 }
			/>
		</div>
	)
};
