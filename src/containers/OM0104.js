import { connect } from "react-redux"
import App from "../components/OM0104"
import { searchMtmrList } from "../actions/OM0104"

// stateを繋ぐ
function mapStateToProps(state){
  return state
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