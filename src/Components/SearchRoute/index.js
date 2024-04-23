import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Header from '../Header'
import './index.css'

class Search extends Component {
  state = {
    details: undefined,
    isApiSuccess: false,
    movieName:""
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const {movieName}=this.state
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e798bc18470a0e1b233b117db0eed371&language=en-US&query=${movieName}&page=1`,
      )
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.results.map(eachOne => ({
          id: eachOne.id,
          name: eachOne.original_title,
          image: eachOne.poster_path,
        }))
        this.setState({
          details: updatedData,
          isApiSuccess: true,
        })
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" size="55" />
    </div>
  )

  render() {
    const {isApiSuccess, details} = this.state
    return isApiSuccess ? (
      <>
        <Header />
        {isApiSuccess && (
          <ul className="ul-container">
            {details &&
              details.map(eachOne => (
                <MovieCard key={eachOne.id} cardDetails={eachOne} />
              ))}
          </ul>
        )}
      </>
    ) : (
      this.renderLoadingView()
    )
  }
}

export default Search
