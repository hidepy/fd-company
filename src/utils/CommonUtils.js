import { format } from 'date-fns'

/**
 * 表示ダイアログのwrapper (メッセージ表示方法の変更対応を見据えて)
 */
export const showAlertMsg = (msg)=> window.alert(msg)

/**
 * 入力テキスト変更時イベントハンドラ
 * @param {string} propKey 
 */
// export const onTextChange = (propKey, _this)=> {


//     return event=> _this.setState({ [propKey]: event.target.value })
// }

export const onTextChange = _this=> propKey=> event=> _this.setState({ [propKey]: event.target.value })

export const onDateChange = _this=> propKey=> date=> { console.log(date) ;_this.setState({ [propKey]: date})  }//_this.setState({ [propKey]: !!date ? format(date, "") })

/**
 * 選択リスト変更時イベントハンドラ
 */
export const onSelectChange = _this=> propKey=> event=> _this.setState({ [propKey]: event.target.value })

/**
 * ラジオボタン変更時イベントハンドラ
 */
export const onRadioChange = _this=> propKey=> event=> _this.setState({ [propKey]: event.target.value })


/**
 * 左をpadStrで埋め、keta長さの文字列を返却する
 * @param {*} n 
 * @param {*} keta 
 * @param {*} padStr 
 */
export const lpad = (n, keta, padStr = "0")=>{

    const nn = (isNaN(n) ? "0" : "" + n)
    let leftStr = ""

    for(let i = 0; i < keta; i++){ leftStr = leftStr + padStr }

    return (leftStr + nn).slice(-keta)
}

export const toCommaStr = n=> {
    const val = Number(n)

    console.log(val)

    return isNaN(val) ? val : val.toLocaleString()
}
