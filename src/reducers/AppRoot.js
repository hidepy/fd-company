import { RECEIVE_MST_CD_LST, RECEIVE_IS_APP_READY } from "../actions/AppRoot"
import { convSnakeKeyObj2CamelKeyObj } from "../utils/CommonUtils"

const initialState = {
    mstCdMap: {},
    isAppReady: false,
}

export default function(state = initialState, action){

    switch (action.type) {

      case RECEIVE_MST_CD_LST:

        const map = (action.payload.mstCdLst || [])
            .reduce((p, c)=> {

                const currentMap = p[c.cdType]

                return {
                    ...p,
                    [c.cdType]: {
                        ...currentMap,
                        [c.cd]: c
                    }
                }
            }, {})

        return Object.assign({}, state, {
            mstCdMap: convSnakeKeyObj2CamelKeyObj(map),
        })

      case RECEIVE_IS_APP_READY:
          return Object.assign({}, state, {
              isAppReady: action.payload.isAppReady
          })

      default:
        return state
    }

  }