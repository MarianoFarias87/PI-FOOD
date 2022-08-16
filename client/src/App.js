import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Route path='/recipe' component={CreateRecipe} />
      </BrowserRouter>
    </div>
  );
}

export default App;

