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
import App from "../components/AppRoot"
import { searchMstCdLst, setIsAppReady } from "../actions/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  
  return {
    AppRoot: state.AppRoot,
  }
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {

    /**
     * マスタコードをサーバから取得する
     */
    async getMstCdLst(){
      const res = await dispatch(searchMstCdLst())
      return res
    },

    /**
     * app ready flg更新
     * @param {*} flg 
     */
    setIsAppReady(flg){
      dispatch(setIsAppReady(flg))
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)