import { connect } from "react-redux"
import App from "../components/AppRoot"
import {getSomething} from "../modules/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  return state
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    showToast: (msg)=> {
      dispatch(getSomething(msg))
    },
    
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)