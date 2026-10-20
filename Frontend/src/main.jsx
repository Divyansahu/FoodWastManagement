import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import store from './redux/store.jsx'
import {Provider} from 'react-redux'
import axios from 'axios'

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://food-waste-backend1.vercel.app')
).replace(/\/+$/, '');

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  if (config.url && config.url.includes('http://localhost:3000')) {
    config.url = config.url.replace('http://localhost:3000', API_BASE_URL);
  }
  return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
  </StrictMode>
)
