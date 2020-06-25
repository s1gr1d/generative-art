import React from 'react'
import './global.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { MonoBoxes } from './scenes/1/MonoBoxes'
import { GradientShader } from './scenes/2/GradientShader'
import { Terrain } from './scenes/3/Terrain'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/1">
            <MonoBoxes />
          </Route>
          <Route path="/2">
            <GradientShader />
          </Route>
          <Route path="/3">
            <Terrain />
          </Route>
          <Route path="/">
            <Redirect to="/1" />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  )
}

export default App
