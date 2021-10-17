import React from "react"
import { Switch, Route } from "react-router-dom"
import CreateCard from "./components/createCard"
import Main from "./components/main"

function App() {
  return (
    <div>
      <Switch>
        <Route path="/create" component={CreateCard}></Route>
        <Route path="/" exact component={Main}></Route>
      </Switch>
    </div>
  )
}

export default App
