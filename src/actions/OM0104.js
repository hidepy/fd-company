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


