import { useState } from 'react'
import Header from './components/Header/Header'
import './App.css'

function App() {

  return (
    <div className="main-div">
      <Header/>
      <div className="container">
          <input type="date"/>
      </div>
    </div>
  )
}

export default App
