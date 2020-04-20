import { format } from 'date-fns'
import KeyCaseConvUtils from "./KeyCaseConvUtils"
import _ from "lodash"

/**
 * 表示ダイアログのwrapper (メッセージ表示方法の変更対応を見据えて)
 */
export const showAlertMsg = (msg) => window.alert(msg)

/**
 * 入力テキスト変更時イベントハンドラ
 * @param {string} propKey 
 */
// export const onTextChange = (propKey, _this)=> {


//     return event=> _this.setState({ [propKey]: event.target.value })
// }

export const onTextChange = _this => propKey => event => _this.setState({ [propKey]: event.target.value })

export const onDateChange = _this => propKey => date => { console.log(date); _this.setState({ [propKey]: date }) }//_this.setState({ [propKey]: !!date ? format(date, "") })

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

/**
 * サーバから返却された日付文字列を、jsのDateオブジェクトに変換する
 * @param {*} datetimeStr 
 */
export const convServerDatetimeStr2ClientDateObj = datetimeStr => {

    if (!datetimeStr) return null

    let res = null

    try {
        res = new Date(datetimeStr)
    } catch{
        return null
    }

    return res

}

export const convServerDatetimeStr2ClientDateTimeStr = datetimeStr => {
    const date = convServerDatetimeStr2ClientDateObj(datetimeStr)

    if (!date) return ""

    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
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