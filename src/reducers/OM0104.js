// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import { RECEIVE_MTMR_LIST } from "../actions/OM0104"

const initialState = {
    mtmrList: [],
}

export default function(state = initialState, action){

    switch (action.type) {
      case RECEIVE_MTMR_LIST:
        return Object.assign({}, state, {
            mtmrList: action.payload.mtmrList
        })

      default:
        return state
    }
  }