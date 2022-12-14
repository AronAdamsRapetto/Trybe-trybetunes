import React from 'react';
import PropTypes from 'prop-types';
import '../pages/Album.css';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      handleChange,
      favoriteMusics,
    } = this.props;
    return (
      <div>
        <div className="track">
          <span>{ trackName }</span>
          <div className="player-container">
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ trackId }>
              <input
                id={ trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ handleChange }
                checked={ favoriteMusics
                  .some((musicId) => musicId.toString() === trackId) }
              />
              Favorita
            </label>
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  handleChange: PropTypes.func,
  favoriteMusics: PropTypes.arrayOf(PropTypes.string),
};

MusicCard.defaultProps = {
  trackName: 'nome da faixa',
  previewUrl: 'url da musica',
  trackId: 123,
  handleChange: PropTypes.func,
  favoriteMusics: [1, 2],
};

export default MusicCard;
