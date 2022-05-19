import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends React.Component {
  state = {
    musics: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const reponse = await getMusics(id);
    this.setState({ musics: [...reponse] });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className="album-container">
          {
            musics.filter((_music, index) => index === 0).map(({
              artworkUrl100,
              artistName,
              collectionName,
              amgArtistId,
            }) => (
              <div key={ amgArtistId } className="artist-container">
                <img src={ artworkUrl100 } alt="Album art" />
                <p className="album-name" data-testid="album-name">{ collectionName }</p>
                <p className="artist-name" data-testid="artist-name">{ artistName }</p>
              </div>
            ))
          }
          <div className="tracks-container">
            {
              musics.filter((_music, index) => index > 0).map(({
                trackName,
                previewUrl,
                trackNumber,
              }) => (
                <MusicCard
                  key={ trackNumber }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Album;
