import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  state = {
    isLoaded: true,
    favoriteMusics: [],
    hasFavorites: true,
    favoriteMusicsId: [],
  }

  componentDidMount() {
    this.setState({ isLoaded: false }, async () => {
      const responseFavoriteMusics = await getFavoriteSongs();
      const idMusics = responseFavoriteMusics.map(({ trackId }) => trackId.toString());

      this.setState({ isLoaded: true, favoriteMusicsId: [...idMusics] });

      if (responseFavoriteMusics.length === 0) {
        this.setState({ hasFavorites: false });
      } else {
        this.setState({ favoriteMusics: [...responseFavoriteMusics] });
      }
    });
  }

  handleChange = ({ target }) => {
    const { favoriteMusics } = this.state;
    if (!target.checked) {
      this.setState({ isLoaded: false }, async () => {
        const unfavoriteMusic = favoriteMusics
          .find(({ trackId }) => trackId === parseInt(target.id, 10));
        await removeSong(unfavoriteMusic);
        const newFavoriteMusics = await getFavoriteSongs();
        const newIdMusics = newFavoriteMusics.map(({ trackId }) => trackId.toString());
        this.setState({
          favoriteMusics: [...newFavoriteMusics],
          favoriteMusicsId: [...newIdMusics],
        }, () => { this.setState({ isLoaded: true }); });
        if (newFavoriteMusics.length === 0) {
          this.setState({ hasFavorites: false });
        }
      });
    }
  }

  render() {
    const { isLoaded, favoriteMusics, hasFavorites, favoriteMusicsId } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="page-favorites">
          {
            isLoaded ? (
              <div>
                {
                  hasFavorites ? (
                    <div>
                      {
                        favoriteMusics.map(({
                          trackName,
                          previewUrl,
                          trackId,
                          artworkUrl30,
                        }) => (
                          <div className="favorite-track" key={ trackId }>
                            <img src={ artworkUrl30 } alt="artwork album" />
                            <MusicCard
                              trackId={ trackId.toString() }
                              previewUrl={ previewUrl }
                              trackName={ trackName }
                              favoriteMusics={ favoriteMusicsId }
                              handleChange={ this.handleChange }
                            />
                          </div>
                        ))
                      }
                    </div>
                  ) : <h1>Nenhum música adicionada</h1>
                }
              </div>
            ) : <Loading />
          }
        </section>
      </div>
    );
  }
}

export default Favorites;
