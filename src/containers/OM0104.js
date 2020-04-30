// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

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