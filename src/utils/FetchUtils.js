
import {
    API_BASE_URI, HTTP_METHOD__GET, HTTP_METHOD__POST, HTTP_METHOD__DELETE, HTTP_METHOD__PUT
} from "../constants/httpRequest"
import { convSnakeKeyObj2CamelKeyObj, convCamelKeyObj2SnakeKeyObj } from "./CommonUtils"


export default class FetchUtils{

    /**
     * 共通getメソッド
     * @param {*} url 
     */
    static async send(url, method = HTTP_METHOD__GET, body = null){

        const params = {
            method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }

        // body部が存在する場合はJSON#stringifyして送る
        if(body) params["body"] = JSON.stringify(body)


        const res = await fetch(url, params)
                .then(httpRes=> httpRes.json())

        return res

    }

    /**
     * 自社内APIコール用のwrap
     * @param {*} apiId 
     */
    static async send2FdApi(apiId, method = HTTP_METHOD__GET, body = null, pk = null){

        let res = {}

        try{
            const bodyKeyConved = convCamelKeyObj2SnakeKeyObj(body)
            res = await FetchUtils.send(`${API_BASE_URI}${apiId}${pk ? `/${pk}` : ""}`, method, bodyKeyConved)

            console.log(res)
        }
        catch(exception){
            console.log(exception)

            return { error: true }
        }

        if(!res) return res

        const keyFormattedRes = convSnakeKeyObj2CamelKeyObj(res)

        return keyFormattedRes
    }

    /**
     * 自社内APIへのGETリクエスト
     * @param {*} apiId 
     */
    static async getFromFdApi(apiId, params){
        return await FetchUtils.send2FdApi(apiId, HTTP_METHOD__GET, params)
    }

    /**
     * 自社内APIへのPOSTリクエスト
     * @param {*} apiId 
     */
    static async post2FdApi(apiId, params){
        return await FetchUtils.send2FdApi(apiId, HTTP_METHOD__POST, params)
    }

    /**
     * 自社内APIへのPUTリクエスト
     * @param {*} apiId 
     */
    static async put2FdApi(apiId, pk = "", params){
        return await FetchUtils.send2FdApi(apiId, HTTP_METHOD__PUT, params, pk)
    }

    /**
     * 自社内APIへのDELETEリクエスト
     * @param {*} apiId 
     */
    static async delete2FdApi(apiId, pk = "", params){
        return await FetchUtils.send2FdApi(apiId, HTTP_METHOD__DELETE, params, pk)
    }

}