import { Col, Row } from 'react-bootstrap';
import { Gallery } from 'react-photoswipe-gallery';

import PhotoAlbumItem from '@/components/Gallery/PhotoAlbumItem';

import 'photoswipe/dist/photoswipe.css';

const PhotoAlbum = ({ photoAlbum }) => {
  const { pictures_list } = photoAlbum;

  return (
    <Gallery withCaption>
      <Row xs={2} md={3} lg={4} className="align-items-center mb-0">
        {pictures_list.map((picture) => {
          return (
            <Col key={picture.id} className="mb-3">
              <PhotoAlbumItem {...picture} />
            </Col>
          );
        })}
      </Row>
    </Gallery>
  );
};

export default PhotoAlbum;
