import React from 'react'
import ReactDOM from 'react-dom'
import {compose, applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import Thunk from "redux-thunk"
import Logger from "redux-logger"
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppRoot from "./containers/AppRoot"

// Combine済のreducer(index.js)をimport
//import reducer from "./modules"
import reducer from "./reducers"

// Middlewareを通してcreateStoreする(非同期requestと, debug用にstateのloggerを通す)
const finalCreateStore = compose(applyMiddleware(Thunk, Logger))(createStore)

// Middleware通したstoreを使用してreducerからstoreを生成する
const store = finalCreateStore(reducer)

const rootElement = document.getElementById('root')

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
"游ゴシック体",
"YuGothic",
"游ゴシックMedium",
"YuGothicMedium",
"游ゴシック",
"YuGothic",

      'Noto Sans',
      'sans-serif',
    ].join(','),
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRoot />
    </MuiThemeProvider>
  </Provider>,
  rootElement
)