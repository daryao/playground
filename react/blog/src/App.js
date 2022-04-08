import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './input.css';
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ArticleList from './pages/ArticlesList'
import ArticlePage from './pages/ArticlePage'
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container w-full md:max-w-3xl mx-auto pt-20">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles-list" element={<ArticleList />} />
            <Route path="/article" element={<ArticlePage />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
