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
import Paper from '@material-ui/core/Paper'
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import { getModalStyle, convNestedObjProp2Plain, convNestedArrProp2Plain, showErrMsg, showConfirmMsg } from "../../utils/CommonUtils"
import Modal from '@material-ui/core/Modal';
import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    INPUT_FIELD_TYPE_ICON_LINK,
    OUTPUT_FIELD_TYPE_LINK,
    OUTPUT_FIELD_TYPE_TABLE,
    INPUT_FIELD_TYPE_BUTTON_LINK
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
    convServerDatetimeStr2ClientDateTimeStr,
} from "../../utils/CommonUtils"
import _ from "lodash"
import FetchUtils from '../../utils/FetchUtils';
import { API_ANKN, API_ANKN_L } from '../../constants/apiPath';

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import OM0103 from "../../containers/OM0103"
import { Button } from '@material-ui/core';
import CommonButton from '../commons/CommonButton';
import CommonIconButton from "../commons/CommonIconButton"
import LinkButton from '../commons/LinkButton';
import { ERR_MSG__FETCH, MSG__DELETE_CONFIRM, ERR_MSG__DELETE } from '../../constants/message';


export default class OM0104 extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {

        super(props)

        this.state = {
            stsSbrkm: "",
            ftreeTxtKnskRn: "",
            mtmrList: [],
            isMtmrDetailPopupShown: false,
            selectedMtmrMisiId: "",
        }

        this.searchMtmrLst = this.searchMtmrLst.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onPopupOpenClick = this.onPopupOpenClick.bind(this)
        this.onPopupCloseClick = this.onPopupCloseClick.bind(this)
        this.onMove2MtmrIriTork = this.onMove2MtmrIriTork.bind(this)
        this.TODO_YOU_DEFINE_SOMETHING = function () { } // TODO: 
        this.onMtmrIriShsiClick = this.onMtmrIriShsiClick.bind(this)
        this.getRowObjByBindParam = this.getRowObjByBindParam.bind(this)
        this.getRowObjByIndex = this.getRowObjByIndex.bind(this)
        this.onMtmrNoClick = this.onMtmrNoClick.bind(this)
        this.onSkjClick = this.onSkjClick.bind(this)
        this.onMtmrKitoClick = this.onMtmrKitoClick.bind(this)

        this.itemDef4SearchCondition = [
            {
                type: INPUT_FIELD_TYPE_SELECT, id: "stsSbrkm", label: "ステータス絞り込み", onChange: this.onSelectChange("stsSbrkm"),
                items: [
                    { value: "0", label: "全て" },
                    { value: "1", label: "見積未登録" },
                    { value: "2", label: "見積登録済" },
                    { value: "3", label: "見積回答済" },
                    { value: "4", label: "発注済" },
                    { value: "5", label: "受注済" },
                ]
            },
            { type: INPUT_FIELD_TYPE_TEXT, id: "ftreeTxtKnskRn", label: "フリーテキスト検索欄", onChange: this.onTextChange("ftreeTxtKnskRn") },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "knskBtn", label: "検索ボタン", onChange: this.searchMtmrLst, color: "primary" },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrIriTork", label: "見積依頼の登録", onChange: this.onMove2MtmrIriTork },
        ]

        // const _openAnkenDetail = this.openAnkenDetail.bind(this)

        this.itemDef4SearchedList = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "mtmrLst", label: "見積一覧",
            headerDef: [
                { type: OUTPUT_FIELD_TYPE_LINK, id: "ankn__anknNo", label: "案件No.", onChange: this.onMtmrNoClick, style: { width: "100px" } },
                { type: INPUT_FIELD_TYPE_TEXT, id: "ankn__anknStsCdDesc01", label: "ステータス", onChange: this.onTextChange("anknStsCd"), style: { width: "120px" } },
                { type: INPUT_FIELD_TYPE_TEXT, id: "ankn__trhkSkKishNm", label: "会社名", onChange: this.onTextChange("ankn__trhkSkKishNm"), style: { width: "120px" } },
                { type: INPUT_FIELD_TYPE_TEXT, id: "shukKiboNtj", label: "集荷日時", onChange: this.onTextChange("shukKiboNtj"), withConvServerDatetimeStr2ClientDateTimeStr: true},
                { type: INPUT_FIELD_TYPE_TEXT, id: "shukskNm", label: "集荷先名", onChange: this.onTextChange("shukskNm"), style: { width: "120px" } },
                { type: INPUT_FIELD_TYPE_TEXT, id: "hisoKiboNtj", label: "配送日時", onChange: this.onTextChange("hisoKiboNtj"), withConvServerDatetimeStr2ClientDateTimeStr: true},
                { type: INPUT_FIELD_TYPE_TEXT, id: "hisoskNm", label: "配送先名", onChange: this.onTextChange("hisoskNm"), style: { width: "120px" } },
                { type: INPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "金額", onChange: this.onTextChange("gokeKngk"), style: { width: "100px" } },
                { customComponent: (
                    <div className="hoge-sample">
                        <LinkButton label="修正" onChange={this.onMtmrIriShsiClick} color="primary" />
                        <LinkButton label="見積回答" onChange={this.onMtmrKitoClick} color="primary" />
                        <CommonIconButton icon={(<DeleteIcon />)} onChange={this.onSkjClick} />
                        <CommonIconButton icon={(<GetAppIcon />)} onChange={this.onChohyoDlClick} />
                    </div>
                    ),
                    bindparam: "table-custom-component-col"
                }
            ],
            items: []
        }]
    }

    getRowIdByBindParam(event){
        if(!event || !event.target) return -1

        const tgtEl = event.target.closest("div[bindparam=table-custom-component-col")
        const rowId = !!tgtEl ? tgtEl.getAttribute("rowindex") : "-1"

        return Number(rowId)
    }

    getRowObjByBindParam(event){
        const rowId = this.getRowIdByBindParam(event)

        return this.getRowObjByIndex(rowId)
    }

    getRowObjByIndex(index){
        const rowObj = _.get(this.itemDef4SearchedList, `[0].items[${index}]`, {})

        return rowObj
    }

    onMtmrNoClick(event){

        const rowindex = Number(event.target.getAttribute("rowindex"))

        const rowObj = this.getRowObjByIndex(rowindex)

        this.openAnkenDetail(rowObj.anknId)
    }

    openAnkenDetail(anknId){
        this.setState({
            selectedMtmrMisiId: anknId,
            isMtmrDetailPopupShown: true,
        })
    }

    /**
     * 見積依頼修正ボタンクリック時イベントハンドラ
     * @param {*} event 
     */
    onMtmrIriShsiClick(event) {
        const rowObj = this.getRowObjByBindParam(event)

        this.openAnkenDetail(rowObj.anknId)
    }


    /**
     * 見積回答へ遷移ボタン押下時イベントハンドラ
     * @param {*} event 
     */
    onMtmrKitoClick(event) {
        const rowObj = this.getRowObjByBindParam(event)

        this.props.history.push(`${process.env.PUBLIC_URL}/OM0105`, {anknId: rowObj.anknId})
    }

    /**
     * 削除ボタンクリック時イベントハンドラ
     * @param {*}} event 
     */
    async onSkjClick(event) {
        const rowObj = this.getRowObjByBindParam(event)

        if(showConfirmMsg(MSG__DELETE_CONFIRM)){
            const res = await FetchUtils.delete2FdApi(`${API_ANKN}`, rowObj.anknId)

            // 成功時は再検索実行
            if(res.success){
                this.searchMtmrLst()
            }
            else{
                showErrMsg(ERR_MSG__DELETE)
            }
        }
        
    }

    onChohyoDlClick(event) {
        console.log(event)
    }

    onMove2MtmrIriTork(){
        this.props.history.push(`${process.env.PUBLIC_URL}/OM0103`, {id: ""})
    }

    componentDidMount() {
        this.searchMtmrLst()
    }

    async searchMtmrLst() {

        // const res = await FetchUtils.getFromFdApi(API_ANKN)
        const res = await FetchUtils.getFromFdApi(API_ANKN_L)

        // fetch successなら
        if(res.success){
            // plainizeした値をセット
            this.setState({
                // mtmrList: _.get(res, "data", [])
                 mtmrList: convNestedArrProp2Plain(_.get(res, "data"), ["ankn"]) || []
                
            })
        }
        else{
            showErrMsg(ERR_MSG__FETCH)
        }

        
    }

    onPopupOpenClick() {
        this.setState({
            isMtmrDetailPopupShown: true
        })

    }

    
    onPopupCloseClick(){
        this.setState({
            isMtmrDetailPopupShown: false
        })
    }

    mtmrTableCreator(items) {

        this.itemDef4SearchedList[0].items = items || []

        return this.itemDef4SearchedList

    }



    render() {

        return (
            <div className="OM0104-wrapper inner-wrapper">

                <Paper className="input-items-wrapper">
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            見積・受注案件一覧
                        </Typography>

                        {
                            this.itemDef4SearchCondition.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }

                        {
                            this.mtmrTableCreator(_.get(this.state, "mtmrList", [])).map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} />))
                        }
                    </React.Fragment>
                </Paper>

                <Modal
                    open={this.state.isMtmrDetailPopupShown}
                    onClose={this.onPopupCloseClick}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {
                        <div style={getModalStyle()} className="contents-wrap">

                            <OM0103
                                ankenId={this.state.selectedMtmrMisiId}
                                openAsUpd={true}
                                style={{ height: "100%", overflowY: "scroll", padding: "8px", backgroundColor: "#fff" }}
                            />

                        </div>

                    }
                </Modal>

            </div>
        )
    }

}
