import React from "react"
import { Switch, Route } from "react-router-dom"
import Edit from "./components/Edit"
import Card from "./components/Card"

function App() {
  return (
    <div className="container my-3">
      <div className="row">
        <Switch>
          <Route path="/edit" component={Edit}></Route>
          <Route path="/" exact component={Card}></Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
