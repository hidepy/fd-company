import { connect } from "react-redux"
import App from "../components/AppRoot"
import { searchMtmrList, setIsAppReady } from "../actions/AppRoot"

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
      const res = await dispatch(searchMtmrList())

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