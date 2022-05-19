import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import './Album.css';

class Album extends React.Component {
  state = {
    musics: [],
    isLoaded: true,
    idFavoriteMusics: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const reponseMusic = await getMusics(id);
    this.setState({ musics: [...reponseMusic] });
    this.setState({ isLoaded: false }, async () => {
      const responseFavorites = await getFavoriteSongs();
      const idFavorites = responseFavorites.map(({ trackId }) => trackId);
      this.setState({ isLoaded: true, idFavoriteMusics: [...idFavorites] });
      console.log(idFavorites);
    });
  }

  handleFavoriteChange = ({ target }) => {
    const { musics, idFavoriteMusics } = this.state;
    const musicId = parseInt(target.id, 10);
    if (target.checked) {
      this.setState((prevState) => ({
        idFavoriteMusics: [...prevState.idFavoriteMusics, musicId],
      }));
      const favoriteMusic = musics
        .find(({ trackId }) => trackId === musicId);
      this.setState({ isLoaded: false }, async () => {
        await addSong(favoriteMusic);
        this.setState({ isLoaded: true });
      });
    } else {
      const newIdFavoriteMusics = idFavoriteMusics
        .filter((music) => music !== musicId);
      this.setState({ idFavoriteMusics: [...newIdFavoriteMusics] });
      const unfavoriteMusic = musics
        .find(({ trackId }) => trackId === musicId);
      this.setState({ isLoaded: false }, async () => {
        await removeSong(unfavoriteMusic);
        this.setState({ isLoaded: true });
      });
    }
  }

  render() {
    const { musics, isLoaded, idFavoriteMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoaded ? (
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
                    <p
                      className="album-name"
                      data-testid="album-name"
                    >
                      { collectionName }
                    </p>
                    <p
                      className="artist-name"
                      data-testid="artist-name"
                    >
                      { artistName }
                    </p>
                  </div>
                ))
              }
              <div className="tracks-container">
                {
                  musics.filter((_music, index) => index > 0).map(({
                    trackName,
                    previewUrl,
                    trackNumber,
                    trackId,
                  }) => (
                    <MusicCard
                      key={ trackNumber }
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      trackId={ trackId }
                      handleChange={ this.handleFavoriteChange }
                      isLoaded={ isLoaded }
                      favoriteMusics={ idFavoriteMusics }
                    />
                  ))
                }
              </div>
            </section>
          ) : <Loading />
        }
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
