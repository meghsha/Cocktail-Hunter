import React from 'react';
import ReactDOM from 'react-dom/client';
import './CocktailExplorer.css'
import CocktailExplorer from './App';
import { AppProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <AppProvider>
      <CocktailExplorer />
    </AppProvider>
  </React.Fragment>
);