import { FC } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { Photo } from '@/models/product';
import './index.scss';

interface Props {
	images: Photo[];
	photo: {
		url_part: string;
		url_part2: string;
	};
}

export const ReactImageGallery: FC<Props> = ({ photo, images = [] }) => {
	const onePhoto: ReactImageGalleryItem = {
		original: photo.url_part,
		thumbnail: photo.url_part2,
	};

	const imgArr: ReactImageGalleryItem[] = images.map((item) => ({
		original: item.big,
		thumbnail: item.small,
	}));

	const items = [ onePhoto, ...imgArr ];

	return (
		<div className="md:max-w-72 -mx-5 md:mx-auto dark:mx-0 ">
			<ImageGallery
				items={ items }
				showPlayButton={ false }
				showThumbnails={ items.length > 1 }
			/>
		</div>
	);
};
