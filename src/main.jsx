import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';//css檔案
import 'bootstrap/dist/js/bootstrap.js';//js檔案

import { RouterProvider } from 'react-router-dom';
import router from './router';

import { Provider } from 'react-redux'//使用ReduxToolkit時引入
import { store } from './store.js'//使用ReduxToolkit時引入

import './assets/styles/all.scss' //sass引入

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  // </StrictMode>,
)
