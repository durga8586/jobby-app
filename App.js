import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/login'
import Home from './components/home'
import Jobs from './components/Jobs'
import NotFound from './components/notfound'
import JobItem from './components/jobitem'
import ProtectedRoute from './components/protectedroute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
