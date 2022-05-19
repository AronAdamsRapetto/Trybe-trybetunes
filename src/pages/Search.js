import React from 'react';
import FormSearch from '../components/FormSearch';
import Header from '../components/Header';
import ListAlbum from '../components/ListAlbum';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends React.Component {
  state = {
    isDisable: true,
    searchInput: '',
    searchText: '',
    isLoaded: true,
    requestIsFinish: false,
    requestAlbums: [],
  }

  handleChange = ({ target: { value } }) => {
    const minCharSearch = 2;
    this.setState({ searchInput: value, searchText: value });
    if (value.length >= minCharSearch) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  handleClick = () => {
    const { searchText } = this.state;
    this.setState({
      isLoaded: false,
      searchInput: '',
      requestIsFinish: false,
    }, async () => {
      const albums = await searchAlbumsAPI(searchText);
      this.setState({
        requestIsFinish: true,
        requestAlbums: [...albums],
        isLoaded: true,
      });
    });
  }

  render() {
    const {
      isDisable,
      searchInput,
      searchText,
      isLoaded,
      requestAlbums,
      requestIsFinish,
    } = this.state;
    return (
      <div className="search-container" data-testid="page-search">
        <Header />
        {
          isLoaded ? <FormSearch
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            isDisable={ isDisable }
            searchInput={ searchInput }
          /> : <Loading />
        }
        {
          requestIsFinish && (
            <section>
              <h2>{`Resultado de álbuns de: ${searchText}`}</h2>
              <div className="album-container">
                {
                  requestAlbums.length > 0 ? requestAlbums.map((album) => (
                    <ListAlbum
                      key={ album.collectionId }
                      album={ album }
                    />
                  )) : <h1>Nenhum álbum foi encontrado</h1>
                }
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

export default Search;
