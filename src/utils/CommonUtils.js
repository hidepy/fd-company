
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

/**
 * 選択リスト変更時イベントハンドラ
 */
export const onSelectChange = _this=> propKey=> event=> _this.setState({ [propKey]: event.target.value })

/**
 * ラジオボタン変更時イベントハンドラ
 */
export const onRadioChange = _this=> propKey=> event=> _this.setState({ [propKey]: event.target.value })