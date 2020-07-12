// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/06/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import { connect } from "react-redux"
import App from "../components/OM0305"

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