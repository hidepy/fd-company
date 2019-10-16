
import {
    API_BASE_URI
} from "../constants/HttpRequest"


export default class FetchUtils{

    // TODO: どこまでをurlとしてもらうかは検討の余地あり
    static async get(apiId){

        const res = await fetch(
                `${API_BASE_URI}${apiId}`,
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            )
                .then(httpRes=> httpRes.json())

        

        console.log(res)

    }

}