
import {
    API_BASE_URI
} from "../constants/httpRequest"
import { convSnakeKeyObj2CamelKeyObj, convSnakeKeyArr2CamelKeyArr } from "./CommonUtils"


export default class FetchUtils{

    /**
     * 共通getメソッド
     * @param {*} url 
     */
    static async get(url){

        const res = await fetch(
                url,
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            )
                .then(httpRes=> httpRes.json())

        return res

    }

    /**
     * 自社内APIコール用のgetのwrap
     * @param {*} apiId 
     */
    static async getFromFdApi(apiId){
        const res = await FetchUtils.get(`${API_BASE_URI}${apiId}`)

        if(!res) return res

        if(Array.isArray(res)) return convSnakeKeyArr2CamelKeyArr(res)

        if( (typeof res) === "object" ) return convSnakeKeyObj2CamelKeyObj(res)

        return res
    }

}