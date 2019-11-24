import React from 'react'
import ReactDOM from 'react-dom'
import {compose, applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import Thunk from "redux-thunk"
import Logger from "redux-logger"
import AppRoot from "./containers/AppRoot"

// Combine済のreducer(index.js)をimport
//import reducer from "./modules"
import reducer from "./reducers"

// Middlewareを通してcreateStoreする(非同期requestと, debug用にstateのloggerを通す)
const finalCreateStore = compose(applyMiddleware(Thunk, Logger))(createStore)

// Middleware通したstoreを使用してreducerからstoreを生成する
const store = finalCreateStore(reducer)

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  rootElement
)