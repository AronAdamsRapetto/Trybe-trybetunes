import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../pages/Search.css';

class ListAlbum extends React.Component {
  render() {
    const {
      album: {
        artistName,
        collectionName,
        artworkUrl100,
        trackCount,
        collectionId,
      },
    } = this.props;
    return (
      <div className="album">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="album-link"
        >
          <img src={ artworkUrl100 } alt="Imagem do álbun" />
          <p className="artist">{ `${artistName} / ${collectionName}` }</p>
          <p className="tracks">{ `${trackCount} Faixas` }</p>
        </Link>
      </div>
    );
  }
}

ListAlbum.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    trackCount: PropTypes.number,
    collectionId: PropTypes.number,
  }),
};

ListAlbum.defaultProps = {
  album: PropTypes.shape({
    artistName: 'Artist Name',
    collectionName: 'Colection Name',
    artworkUrl100: 'url image',
    trackCount: 0,
    collectionId: 0,
  }),
};

export default ListAlbum;
