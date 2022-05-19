import React from 'react';
import PropTypes from 'prop-types';
import '../pages/Album.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div className="track">
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
};

MusicCard.defaultProps = {
  trackName: 'nome da faixa',
  previewUrl: 'url da musica',
};

export default MusicCard;
