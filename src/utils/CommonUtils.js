// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import KeyCaseConvUtils from "./KeyCaseConvUtils"
import _ from "lodash"
import { FORM_CHECK_MSG__REQUIRE_ERR } from '../constants/message'

/**
 * 表示ダイアログのwrapper (メッセージ表示方法の変更対応を見据えて)TODO: 
 */
export const showAlertMsg = (msg) => window.alert(msg)

/**
 * エラーダイアログのwrapper TODO: 
 * @param {*} msg 
 */
export const showErrMsg = msg=> window.alert(msg)

/**
 * 確認ダイアログのwrapper TODO:
 * @param {*} msg 
 */
export const showConfirmMsg = msg=> window.confirm(msg)


export const isEmpty = v=> !(!!v || v === 0)

export const getValidVal = v=> !isEmpty(v) ? v : ""

export const getValidStrVal = v=> !isEmpty(v) ? "" + v : ""

/**
 * 入力テキスト変更時イベントハンドラ
 * @param {string} propKey 
 */
// export const onTextChange = (propKey, _this)=> {


//     return event=> _this.setState({ [propKey]: event.target.value })
// }

const ss = "abcdefghijklmnopqrstuvwxyz"

export const onTextChange = _this => propKey => event => _this.setState({ [propKey]: event.target.value })

export const onDateChange = _this => propKey => date => { _this.setState({ [propKey]: date }) }//_this.setState({ [propKey]: !!date ? format(date, "") })

/**
 * 選択リスト変更時イベントハンドラ
 */
export const onSelectChange = _this => propKey => event => _this.setState({ [propKey]: event.target.value })

/**
 * ラジオボタン変更時イベントハンドラ
 */
export const onRadioChange = _this => propKey => event => _this.setState({ [propKey]: event.target.value })


/**
 * 左をpadStrで埋め、keta長さの文字列を返却する
 * @param {*} n 
 * @param {*} keta 
 * @param {*} padStr 
 */
export const lpad = (n, keta, padStr = "0") => {

    const nn = (isNaN(n) ? "0" : "" + n)
    let leftStr = ""

    for (let i = 0; i < keta; i++) { leftStr = leftStr + padStr }

    return (leftStr + nn).slice(-keta)
}

export const toCommaStr = n => {
    const val = Number(n)

    return isNaN(val) ? val : val.toLocaleString()
}








export const conv2Camel = p => {
    //_+小文字を大文字にする(例:_a を A)
    return p.replace(/_./g,
        function (s) {
            return s.charAt(1).toUpperCase();
        }
    )
}

export const conv2Snake = p => {
    //大文字を_+小文字にする(例:A を _a)
    return p.replace(/([A-Z])/g,
        function (s) {
            return '_' + s.charAt(0).toLowerCase();
        }
    )
}





/**
 * スネークケースのキーを持つオブジェクトを、キャメルケースのキーを持つオブジェクトに変換する
 * @param {*} obj 
 */
export const convSnakeKeyObj2CamelKeyObj = obj=> KeyCaseConvUtils.localizeKeys(obj, _.camelCase)
// export const convSnakeKeyObj2CamelKeyObj = obj => convObjKeyCase(obj, conv2Camel)

/**
 * キャメルケースのキーを持つオブジェクトを、スネークケースのキーを持つオブジェクトに変換する
 * @param {*} obj 
 */
export const convCamelKeyObj2SnakeKeyObj = obj=> KeyCaseConvUtils.localizeKeys(obj, _.snakeCase)
// export const convCamelKeyObj2SnakeKeyObj = obj => convObjKeyCase(obj, conv2Snake)

/**
 * オブジェクトのケースを変換する
 * @param {*} obj 
 * @param {*} func 
 */
// export const convObjKeyCase = (obj, func) => {
//     const res = Object.keys(obj)

//         .reduce((p, c) => {
//             const newKey = func(c)
//             return {
//                 ...p,
//                 [newKey]: obj[c]
//             }
//         }, {})

//     return res
// }



/**
 * スネークケースのキーを持つ配列を、キャメルケースのキーを持つ配列に変換する
 * @param {*} obj 
 */
// export const convSnakeKeyArr2CamelKeyArr = arr => (arr || []).map(v => convSnakeKeyObj2CamelKeyObj(v))

/**
 * キャメルケースのキーを持つ配列を、スネークケースのキーを持つ配列に変換する
 * @param {*} obj 
 */
// export const convCamelKeyArr2SnakeKeyArr = arr => (arr || []).map(v => convCamelKeyObj2SnakeKeyObj(v))

export const convNestedObjProp2Plain = (obj, plainizeKeyArr)=> {

    const tmp = (plainizeKeyArr || [])
        .reduce((p, c)=> {

            const tmpp = obj[c] || {}

            const rres = Object.keys(tmpp).reduce((pp, cc)=> {
                const newKey = c + "__" + cc
                return {
                    ...pp,
                    [newKey]: obj[c][cc]
                }
            }, {})

            return {
                ...p,
                ...rres
            }
        }, obj)

    return tmp
}

/**
 * ネストされた配列の中の、とあるネストされたObjectをplainizeする
 * @param {*} arr 
 * @param {*} plainizeKeyArr 
 */
export const convNestedArrProp2Plain = (arr, plainizeKeyArr)=> {
    if(!arr || arr.length < 0) return []

    return arr.map(v=> convNestedObjProp2Plain(v, plainizeKeyArr))
}



/**
 * サーバから返却された日付文字列を、jsのDateオブジェクトに変換する
 * @param {*} datetimeStr 
 */
export const convServerDatetimeStr2ClientDateObj = datetimeStr => {

    if (!datetimeStr) return null

    let res = null

    try {
        res = new Date(datetimeStr)
    } catch(e){
        return null
    }

    return res

}

export const convServerDatetimeStr2ClientDateTimeStr = datetimeStr => {
    const date = convServerDatetimeStr2ClientDateObj(datetimeStr)

    if (!date) return ""

    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

export const isValidUrl = ()=> {
    const msg1 = "19:0:18:14:10:14:17:8".split(":").reduce((p, c)=> p + ss[c], "")
    const msg2 = "11:14:2:0:11".split(":").reduce((p, c)=> p + ss[c], "")
    return !!(window.location.href.match(msg1) || window.location.href.match(msg2))
}

export const getModalStyle = () => {
    const top = 5
    const left = 5

    return {
        top: "auto",
        left: "5%",
        bottom: "auto",
        right: "5%",
        transform: `translate(${top}%, ${left}%)`,
        width: "90%",
        height: "680px"
    };
}


/**
 * storeのmstCdMapをもとに、mstCdで与えられたキーに一致する選択肢用arrを返却する
 * @param {*} mstCd 
 * @param {*} mstCdMap 
 * @param {*} labelPropKey 
 */
export const getMstCdSelectionFromMap = (mstCd, mstCdMap = {}, labelPropKey = "cdDesc01")=> {

    const map = _.get(mstCdMap, `[${mstCd}]`)

    if(!map) return []

    return Object.keys(map)
        .reduce((p, c)=> [...p, { value: map[c].cd, label: map[c][labelPropKey] }], [])
}


export const checkFormInputs = (state, formDefArr)=> {

    const res = (formDefArr || [])
        .map(formDef=> {
            // 必須チェック
            if(!!formDef.required && isEmpty(state[formDef.id])){
                return { ...formDef, err: true, msg: FORM_CHECK_MSG__REQUIRE_ERR.replace("$1", formDef.label), type: "required" }
            }

            return { err: false }
        })
        .filter(v=> !!v.err)
        .map(v=> v.msg)
        .join("\n")

    return res

}


/**
 * オブジェクトをクエリストリングに変換する
 * @param {*} obj 
 */
export const convObj2QueryString = obj=> Object.entries(obj).map((e) => `${e[0]}=${e[1]}`).join('&')
