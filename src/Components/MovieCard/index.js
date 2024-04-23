import {withRouter} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {cardDetails} = props
  const {history} = props
  const {id, name, image,rating} = cardDetails
  const onViewDetailsClick = () => {
    history.replace(`/${id}/movie-details`)
  }
  return (
    <li className="card-li-container">
      <div className="card">
        <img
          className="card-image"
          alt="movieImage"
          src={`https://image.tmdb.org/t/p/w500${image}`}
        />
        <div className="card-text-container">
          <h1 className="card-text-heading">{name}</h1>
          <div className="card-rating-button">
            <p className="card-rating">{rating}</p>
            <button onClick={onViewDetailsClick} className="card-view-button">
              View Details
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default withRouter(MovieCard)
