import { connect } from "react-redux"
import App from "../components/OM0104"
import { searchMtmrList } from "../actions/OM0104"

// stateを繋ぐ
function mapStateToProps(state){
  return {
    AppRoot: state.AppRoot,
    OM0104: state.OM0104
  }
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    searchMtmrList: (params)=> {
      dispatch(searchMtmrList(params))
    },
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)