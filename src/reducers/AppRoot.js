// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

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