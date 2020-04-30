// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import FetchUtils from "../utils/FetchUtils"
import { API_ANKN } from "../constants/apiPath"

export const RECEIVE_MTMR_LIST = "RECEIVE_MTMR_LIST"

function receiveMtmrList(mtmrList){
    return {
        type: RECEIVE_MTMR_LIST,
        payload: {
            mtmrList
        }
    }
}

export const searchMtmrList = (params) => {
    
    return async dispatch=> {
        const json = await FetchUtils.getFromFdApi(API_ANKN)
console.log(json)
        dispatch(receiveMtmrList(json)) 
    }

}


