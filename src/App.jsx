import React from 'react'
import './global.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Terrain } from './scenes/1/Terrain'
import { GradientShader } from './scenes/2/GradientShader'
import { MonoBoxes } from './scenes/3/MonoBoxes'
import { MovingBoxes } from './scenes/4/MovingBoxes'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/1">
            <Terrain />
          </Route>
          <Route path="/2">
            <GradientShader />
          </Route>
          <Route path="/3">
            <MonoBoxes />
          </Route>
          <Route path="/4">
            <MovingBoxes />
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
