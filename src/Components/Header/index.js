import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    search: '',
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  onSearchSubmit = event => {
    event.preventDefault()
  }

  render() {
    const {search} = this.state
    return (
      <nav className="nav-container">
        <h1 className="nav-heading" id="main-heading">
          movieDB
        </h1>
        <div>
          <input
            id="search-input"
            value={search}
            onChange={this.onSearchChange}
            className="nav-search"
            type="text"
            placeholder="search movies"
          />
          <button
            id="search-button"
            type="button"
            onClick={this.onSearchSubmit}
          >
            Search
          </button>
        </div>
        <div className="nav-routes-container">
          <Link className="link-item" to="/">
            <h1 id="popular-heading" className="nav-para">
              Popular
            </h1>
          </Link>
          <Link className="link-item" to="/top-rated">
            <h1 id="top-rated-heading" className="nav-para">
              Top Rated
            </h1>
          </Link>
          <Link className="link-item" to="/upcoming">
            <h1 id="upcoming-heading" className="nav-para">
              Upcoming
            </h1>
          </Link>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
