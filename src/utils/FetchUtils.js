// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import {
    API_BASE_URI, HTTP_METHOD__GET, HTTP_METHOD__POST, HTTP_METHOD__DELETE, HTTP_METHOD__PUT
} from "../constants/httpRequest" 
import { convSnakeKeyObj2CamelKeyObj, convCamelKeyObj2SnakeKeyObj, convObj2QueryString, isEmpty } from "./CommonUtils"


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

        let sendUrl = url

        // body部が存在する場合はJSON#stringifyして送る
        if(body){
            if(method === HTTP_METHOD__GET){
                sendUrl += '?' + convObj2QueryString(body)
            }
            else {
                params["body"] = JSON.stringify(body)
            }
        }

        let res = { success: false, data: null }

        try{
            res = await fetch(sendUrl, params)
                .then(async httpRes=> {

                    let json = null

                    try{
                        json = await httpRes.json()
                    }
                    catch(exception){
                        ;
                    }

                    return {
                        success: !!httpRes.ok,
                        data: json
                    }
                })
        }
        catch(exception){
            console.log(exception)
        }

        return res

    }

    /**
     * 自社内APIコール用のwrap
     * @param {*} apiId 
     */
    static async send2FdApi(apiId, method = HTTP_METHOD__GET, body = null, pk = null){

        let res = {}

        // try-catchはsend内でしっかりやっているのでここでは不要
        const bodyKeyConved = convCamelKeyObj2SnakeKeyObj(body)

        console.log(bodyKeyConved)

        res = await FetchUtils.send(`${API_BASE_URI}${apiId}${pk ? `/${pk}` : ""}/`, method, bodyKeyConved)

        if(!res) return res

        const keyFormattedRes = convSnakeKeyObj2CamelKeyObj(res)

        return keyFormattedRes

    }

    /**
     * 自社内APIへのGETリクエスト
     * @param {*} apiId 
     */
    static async getFromFdApi(apiId, params){
        return await FetchUtils.send2FdApi(apiId, HTTP_METHOD__GET, params, null)
    }

    /**
     * 自社内APIへのPOSTリクエスト
     * @param {*} apiId 
     */
    static async post2FdApi(apiId, params){
        return await FetchUtils.send2FdApi(apiId, HTTP_METHOD__POST, params, null)
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