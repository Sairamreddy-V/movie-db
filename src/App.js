import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import TopRated from './Components/TopRated'
import Upcoming from './Components/Upcoming'
import SingleMovie from './Components/SingleMovie'
import Search from './Components/SearchRoute'
import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/:id/movie-details" component={SingleMovie} />
    <Route exact path="/search" component={Search}/>
  </Switch>
)

export default App
