import { connect } from "react-redux"
import App from "../components/OM0402"

// stateを繋ぐ
function mapStateToProps(state){
  return {
    AppRoot: state.AppRoot,
  }
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)