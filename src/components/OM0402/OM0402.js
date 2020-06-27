// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import React from 'react'
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal';
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    OUTPUT_FIELD_TYPE_TEXT,
    OUTPUT_FIELD_TYPE_TABLE,
    BREAK_LINE,
    INPUT_FIELD_TYPE_BUTTON_LINK,
    INPUT_FIELD_TYPE_DATETIME
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
    lpad,
    toCommaStr,
    convNestedArrProp2Plain,
    toNum,
    convCommaStr2Num,
    checkFormInputs,
    getErrMsg,
    showErrMsg
} from "../../utils/CommonUtils"
import { TextField } from '@material-ui/core';
import { getModalStyle } from "../../utils/CommonUtils"

import OM0403 from "../OM0403"
import FetchUtils from '../../utils/FetchUtils';
import { API_SEIKYU_DETAIL, API_MTMR_DETAIL, API_ANKN_L, API_ANKN_JUCHU_L } from '../../constants/apiPath';
import _ from "lodash"
import TrhkskMstPopup from '../fd-commons/TrhkskMstPopup'
import { FORM_CHECK_MSG__NO_SELECT_ERR, SUCCESS_MSG__HZN, ERR_MSG__HZN } from '../../constants/message';
import { ANKN_STS_CD__JUCHU_SM } from "../../constants/MtmrIri"

export default class OM0402 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
            trhkSkKishId: "",
            trhkSkKishNo: "",
            trhkSkKishNm: "",
            trhkSkKishNmKn: "",
            trhkSkKishZipNo: "",
            trhkSkKishAddress: "",            
			seikyuKngkGoke: "",
			mtmrJuchuNo: "",
			shosi: "",
			kngk: "",
			seikyubn: "",
			hisoD: "",
			hisosk: "",
			nmtNm: "",
			hkkoD: new Date(),
			shriKgn: new Date(),
            biko: "",
            isAnkenDetailPopupShown: false,
            ankenLst: [],
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onMove2Om0403Click = this.onMove2Om0403Click.bind(this)
        this.onPopupCloseClick = this.onPopupCloseClick.bind(this)
        this.TODO_YOU_DEFINE_SOMETHING = function(){} // TODO: 

        this.onTrhkskSelectCallback = this.onTrhkskSelectCallback.bind(this)
        this.onankenSearchButtonClick = this.onankenSearchButtonClick.bind(this)
        this.onRowCheckChange = this.onRowCheckChange.bind(this)

        this.itemDef4SeikyuskInf = [
            { customComponent: <TrhkskMstPopup onSelectCallback={this.onTrhkskSelectCallback} /> },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "取引先会社名", onChange: this.onTextChange("trhkSkKishNm")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishId", label: "取引先コード", onChange: this.onTextChange("trhkSkCd")},
            { type: BREAK_LINE },
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishZipNo", label: "郵便番号"},
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishAddress", label: "住所"},
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishTelNo", label: "電話番号"},
            { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishMail", label: "メール"},
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "searchankenInfButton", label: "案件検索", onChange: this.onankenSearchButtonClick, color: "primary", style: { width: "120px" } },
        ]

        this.itemDef4JuchuInfLst= [{

            type: OUTPUT_FIELD_TYPE_TABLE,
            id: "ankenLst",
            label: "受注案件一覧",
            headerDef: [
                //{ type: OUTPUT_FIELD_TYPE_TEXT, id: "seikyuKngkGoke", label: "請求金額合計"},
                { type: INPUT_FIELD_TYPE_CHECKBOX, id: "check", label: "", onChange: this.onRowCheckChange },
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "ankn__anknNo", label: "見積・受注No."},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "金額(円)", withComma: true, align: "right" },
                // { type: INPUT_FIELD_TYPE_TEXT, id: "seikyubn", label: "請求分(円)", withComma: true, align: "right", onChange: this.onTextChange("seikyubn")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hisoD", label: "配送日"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hisosk", label: "配送先"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名"},
                { type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "shosi", label: "詳細", onChange: this.onMove2Om0403Click, color: "primary"},
            ]
        }]

        this.itemDef4Footer = [
			{ type: INPUT_FIELD_TYPE_DATETIME, id: "hkkoD", label: "発行日", onChange: this.onTextChange("hkkoD"), required: true, format: "yyyy/MM/dd HH:mm" },
            { type: INPUT_FIELD_TYPE_DATETIME, id: "shriKgn", label: "支払期限", onChange: this.onTextChange("shriKgn"), required: true, format: "yyyy/MM/dd HH:mm" },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "biko", label: "備考", onChange: this.onTextChange("biko"), style: {width: "90%"}},
        ]
    }


    async componentDidMount(){
        const seikyushId = _.get(this.props, "location.state.seikyushId") || this.props.seikyushId

        if (!!seikyushId) {
            // APIコール
            const res = await FetchUtils.getFromFdApi(`${API_SEIKYU_DETAIL}/${seikyushId}`)

            console.log(res)
        }
    }

    /**
     * 取引先マスタ選択時のコールバック
     * @param {*} trhkskItem 
     */
    onTrhkskSelectCallback(trhkskItem){
        this.setState({
            trhkSkKishId: trhkskItem.trhkSkKishId,
            trhkSkKishNo: trhkskItem.trhkSkKishNo,
            trhkSkKishNm: trhkskItem.trhkSkKishNm,
            trhkSkKishNmKn: trhkskItem.trhkSkKishNmKn,
            trhkSkKishZipNo: trhkskItem.trhkSkKishZipNo,
            trhkSkKishAddress: trhkskItem.trhkSkKishAddress,
            trhkSkKishTelNo: trhkskItem.trhkSkKishTelNo,
            trhkSkKishMail: trhkskItem.trhkSkKishZipNo
        })
    }

    /**
     * 案件検索ボタン押下
     */
    async onankenSearchButtonClick(){
        const trhkSkKishId = this.state.trhkSkKishId

        // const res = await FetchUtils.getFromFdApi(`${API_ANKN_L}`, { trhkSkKishId })
        const res = await FetchUtils.getFromFdApi(`${API_ANKN_JUCHU_L}`, { trhkSkKishId })

        console.log(res)

        if(res.success){
            const ankenLst = convNestedArrProp2Plain(_.get(res, "data"), ["ankn"]) || []

            console.log(ankenLst)

            this.setState({
                ankenLst
            })
        }
        else {
            // TODO: 
        }
    }

    onRowCheckChange(event){
        const el = event.target
        const checked = el.checked
        const rowindex = el.closest("[rowindex]").getAttribute("rowindex")

        const selectedAnken = { ...this.state.ankenLst[rowindex], isSelected: checked}

        const newAnkenLst = Object.assign([], this.state.ankenLst)
        newAnkenLst[rowindex] = selectedAnken

        const seikyuKngkGoke = this.calcSeikyuGkGoke(newAnkenLst)

        this.setState({
            ankenLst: newAnkenLst,
            seikyuKngkGoke
        })

    }

    /**
     * 請求額合計の計算
     * @param {*} lst 
     */
    calcSeikyuGkGoke(lst){
        if(!lst) return 0

        const res = lst.reduce((p, c)=> {
            const kngk = c.isSelected ? convCommaStr2Num(c.gokeKngk) : 0
            return p + kngk
        }, 0)

        return res
    }

    juchuTableCreator(items){

        this.itemDef4JuchuInfLst[0].items = items || []

        return this.itemDef4JuchuInfLst

        // TODO: テストデータではなく取引先情報を取得してセットするように
        // const _dummyData = [...(new Array(10)).keys()]
        // .map(i=> {
        //     return {
        //         trhkSkKishCd: lpad(i, 10),
        //         trhkSkKishNm: "取引先" + i,
        //         mtmrJuchuNo: lpad(i, 10),
        //         shosi: "詳細テキスト" + i,
        //         kngk: (i + 1) * 10000,
        //         seikyubn: (i + 1) * 9000,
        //         hisoD: "2020/01/" + lpad(i + 1, 2),
        //         hisosk: "配送先" + i,
        //         nmtNm: "荷物名" + i,
        //     }
        // })

        // this.itemDef4JuchuInfLst[0].items = _dummyData

        // return this.itemDef4JuchuInfLst

    }

    // TODO: 
    TODO_YOU_DEFINE_SOMETHING(){

    }

    onMove2Om0403Click(){
        this.setState({
            isAnkenDetailPopupShown: true
        })
    }

    onPopupCloseClick(){
        this.setState({
            isAnkenDetailPopupShown: false
        })
    }

    async onHznClick(){
        
        // 案件選択チェック
        const hznTgtAnknArr = this.state.ankenLst.filter(v=> v.isSelected)

        if(hznTgtAnknArr.length <= 0){
            showErrMsg( getErrMsg(FORM_CHECK_MSG__NO_SELECT_ERR, ["受注案件"]))
            return
        }

        // formエラーチェック
        const msg = checkFormInputs(this.state, [...this.itemDef4Footer])

        // エラーがあった場合はメッセージ表示
        if(!!msg){
            showErrMsg(msg)
            return
        }
        
        // ankn_id, ankn_sts_cd, ankn_no
        const trnAnkn = hznTgtAnknArr.map(v=> {
            console.log(v)

            return {
                anknId: v.anknId,
                anknStsCd: ANKN_STS_CD__JUCHU_SM, // TODO: 正しい案件をセット
                anknNo: v.anknNo
            }
        })

        const hkkoDStr = !!this.state.hkkoD ? this.state.hkkoD.toISOString() : ""

        const params = {
            tenant: "123",
            // seikyushNo: "",
            hkkoD: hkkoDStr,
            shriKgn: this.state.shriKgn,
            seikyuKngk: this.state.seikyuKngkGoke,
            seikyuStsCd: "001", // TODO: 
            biko: this.state.biko,
            trhkSkKish: this.state.trhkSkKishId,
            // trhkSkKish: {
            //     trhkSkKishId: this.state.trhkSkKishId,
            //     trhkSkKishNo: this.state.trhkSkKishNo,
            //     trhkSkKishNm: this.state.trhkSkKishNm,
            //     trhkSkKishNmKn: this.state.trhkSkKishNmKn,
            //     trhkSkKishZipNo: this.state.trhkSkKishZipNo,
            //     trhkSkKishAddress: this.state.trhkSkKishAddress,                
            // },
            trnAnkn
        }

        // APIコールで請求書作成
        const res = await FetchUtils.post2FdApi(`${API_SEIKYU_DETAIL}`, params)

        console.log(res)

        if (res.success) {
            showAlertMsg(SUCCESS_MSG__HZN)
        }
        else {
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }

    }

    render(){

        return (
            <div className="OM0402-wrapper inner-wrapper">
                <Paper className="input-items-wrapper">

                    <Typography variant="h5" gutterBottom>請求先情報</Typography>
                    {
                        this.itemDef4SeikyuskInf.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                    }
                </Paper>

                <Paper>
                    <Typography variant="h5" gutterBottom>受注案件一覧</Typography>

                    <div>
                        <TextField className="field-item" disabled={true} value={ toCommaStr(this.state.seikyuKngkGoke) } label={"請求額合計(円)"} />
                    </div>

                    {
                        this.juchuTableCreator(this.state.ankenLst).map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} />))
                    }
                </Paper>

                <Paper>
                    {
                        this.itemDef4Footer.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                    }
                </Paper>

                <Grid item xs={12} className="footer-butons">
                    <HznButton text="確認" onClick={this.onHznClick} />
                </Grid>
                
                <Modal
                    open={this.state.isAnkenDetailPopupShown}
                    onClose={this.onPopupCloseClick}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                {
                <div style={getModalStyle()} className="contents-wrap">

                    <OM0403 style={{ height: "100%", overflowY: "scroll", padding: "8px", backgroundColor: "#fff"}} />

                  </div>
                    
                }
                </Modal>

            </div>
        )
    }

}
