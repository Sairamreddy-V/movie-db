import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Header from '../Header'
import './index.css'

class Upcoming extends Component {
  state = {
    details: null,
    isApiSuccess: false,
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=e798bc18470a0e1b233b117db0eed371&language=en-US&page=1',
      )
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.results.map(eachOne => ({
          id: eachOne.id,
          name: eachOne.original_title,
          image: eachOne.poster_path,
          rating:eachOne.vote_average,
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
    const {details, isApiSuccess} = this.state
    return isApiSuccess ? (
      <>
        <Header />
        {isApiSuccess && details && (
          <ul className="ul-container">
            {details.map(eachOne => (
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

export default Upcoming
