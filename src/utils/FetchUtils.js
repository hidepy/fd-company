
import {
    API_BASE_URI
} from "../constants/httpRequest"


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
        return FetchUtils.get(`${API_BASE_URI}${apiId}`)
    }

}