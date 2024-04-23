import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

class SingleMovie extends Component {
  state = {
    details: null,
    castDetails: null,
    isLoading: true,
    isCastLoading: true,
  }

  componentDidMount() {
    this.fetchMovieDetails()
    this.requestCastDetails()
  }

  fetchMovieDetails = async () => {
    const {match} = this.props
    const {params}=match
    const{id}=params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e798bc18470a0e1b233b117db0eed371&language=en-US`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.original_title,
        image: data.poster_path,
        releaseDate: data.release_date,
        overview: data.overview,
        genre: 'action',
        duration: data.runtime,
        rating: data.vote_average,
      }
      this.setState({details: updatedData, isLoading: false})
    }
  }

  requestCastDetails = async () => {
    const {match} = this.props
    const {params}=match
    const{id}=params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e798bc18470a0e1b233b117db0eed371&language=en`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.cast.map(eachOne => ({
        originalName: eachOne.original_name,
        characterName: eachOne.name,
        characterImage: eachOne.profile_path,
      }))
      this.setState({castDetails: updatedData, isCastLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" size="55" />
    </div>
  )

  renderMovieDetails = () => {
    const {details, castDetails, isCastLoading} = this.state
    return (
      <>
        <div className="main-container">
          <img
            className="movieImage"
            alt="movieImage"
            src={`https://image.tmdb.org/t/p/w500/${details.image}`}
          />
          <h1 className="name">{details.name}</h1>
          <div className="parameters-container">
            <p className="para">5</p>
            <p className="para">{details.duration}</p>
            <p className="para">{details.genre}</p>
            <p className="para">{details.releaseDate}</p>
            <p className="para">{details.rating}</p>
          </div>
          <h1 className="overView-heading">Overview</h1>
          <p className="overView-para">{details.overview}</p>
        </div>
        {!isCastLoading && (
          <ul className="cast-ul-container">
            {castDetails.map(eachOne => (
              <li className="card-li">
                <img
                  className="cast-image"
                  src={`https://image.tmdb.org/t/p/w500/${eachOne.characterImage}`}
                />
                <h1 className="cast-heading">{eachOne.originalName}</h1>
                <p className="cast-para">{eachOne.characterName}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const {isLoading}=this.state
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <>
        <Header />
        {this.renderMovieDetails()}
      </>
    )
  }
}

export default SingleMovie
