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
import { API_MST_CD } from "../constants/apiPath"
import { ERR_MSG__FETCH } from "../constants/message"
import { showErrMsg } from "../utils/CommonUtils"

export const RECEIVE_IS_APP_READY = "RECEIVE_IS_APP_READY"
export const RECEIVE_MST_CD_LST = "RECEIVE_MST_CD_LST"

function receiveIsAppReady(data){
    return {
        type: RECEIVE_IS_APP_READY,
        payload: {
            isAppReady: !!data
        }
    }
}

function receiveMstCdLst(data){
    return {
        type: RECEIVE_MST_CD_LST,
        payload: {
            mstCdLst: data
        }
    }
}

export const setIsAppReady = (flg)=> {
    console.log(flg)
    return receiveIsAppReady(flg)
}

export const searchMtmrList = () => {
    
    return async dispatch=> {
        const json = await FetchUtils.getFromFdApi(API_MST_CD)

        if(json.success){
            dispatch(receiveMstCdLst(json.data)) 

            return json
        }
        else{
            // TODO: 致命的なので、ここでアプリ終了にすべきか
            showErrMsg(ERR_MSG__FETCH)
        }
        
    }

}


