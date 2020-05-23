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
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import OM0103 from "../../containers/OM0103"


import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    OUTPUT_FIELD_TYPE_TEXT,
    BREAK_LINE,
    BUTTON_OPERATION_TYPE__UPDATE,
    INPUT_FIELD_TYPE_DATETIME
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onDateChange,
    onSelectChange,
    onRadioChange,
    showErrMsg,
    getModalStyle,
    getMstCdSelectionFromMap,
    convServerDatetimeStr2ClientDateObj,
} from "../../utils/CommonUtils"

import "./OM0105.scss"
import { getMtmtIriAllContents, getItemDef4IrishContents, getItemDef4NmtContents, getItemDef4NtjContents, getItemDef4HisoJknContents, mtmrIriStates, getSisnMtmrIri, getMtmrSendParameter } from '../../utils/MtmrIriUtils'
import { Typography } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import FetchUtils from '../../utils/FetchUtils'
import { API_MTMR_DETAIL, API_CLC_UNTN } from '../../constants/apiPath'
import { ERR_MSG__FETCH, SUCCESS_MSG__HZN, ERR_MSG__HZN, MSG__OM0105_TORKGO_POPUP } from '../../constants/message'
import _ from "lodash"
import { ANKN_STS_CD__MTMR_KITO_SM, ANKN_STS_CD__MTMR_TORK_SM } from '../../constants/MtmrIri'
import { MST_KEY__CALC_HOHO_CD, MST_KEY__TRK_TYPE_CD, MST_KEY__NMT_TYPE_CD } from '../../constants/MstCdKey'



//export default class OM0105 extends React.Component{
export default class OM0105 extends React.PureComponent {

    static contextTypes = {
        router: PropTypes.object
    }


    static propTypes = {
        anknId: PropTypes.string, // 前画面から渡された案件ID
        openAsUpd: PropTypes.bool, // 本画面の起動方式 更新参照画面として開く場合はtrue
    }

    constructor(props) {

        super(props)

        this.state = {
            isMtmrDetailPopupShown: false,
            isFtiSgyoOpen: false,
            isTorkgoPopupShown: false,
            responseAnknId: "",

            mtmrIriInf: {
                ...mtmrIriStates
            },

            truckInfLst: [],
            tiouKh: "0",
            calcHoho: "0",
            truckType: "",
            disu: "",
            add: "",
            shukNtj: new Date(),
            shukSk: "",
            hisoNtj: new Date(),
            hisoSk: "",
            kyori: "",
            untn: "",
            juryoOb: "",
            kyoriOb: "",
            nnryoScg: "",
            tmkmRyo: "",
            tmkmUm: "",
            trSRyo: "",
            trSUm: "",
            ftiSgyoRyo: "",
            tnirUm: "",
            lblHrUm: "",
            ykmtUm: "",
            ttmtUm: "",
            hisgyoUm: "",
            sntRyokn: "",
            wrbkKngk: "",
            gokeKngk: "0",
            biko: "",
            kknn: "",
            edit: "",
            entry: "",
            mtmrshDL: "",
        }

        this.GOKE_KNGK_CALC_ADD_TGT_KEYS = [ "untn", "nnryoScg", "tmkmRyo", "trSRyo", "ftiSgyoRyo", "sntRyokn" ]
        this.GOKE_KNGK_CALC_TGT_KEYS = [...this.GOKE_KNGK_CALC_ADD_TGT_KEYS, "wrbkKngk"]

        this.onFtiSgyoUtwkClick = this.onFtiSgyoUtwkClick.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.calcGokeKngk = this.calcGokeKngk.bind(this)
        this.onTextChange = onTextChange(this)
        this.onKngkTextChange = key=> event=> {
            this.onTextChange(key)(event)

            this.setState({
                gokeKngk: this.calcGokeKngk(key, event.target.value)
            })
        }
        this.onDateChange = onDateChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onTruckAddButtonClick = this.onTruckAddButtonClick.bind(this)
        this.onSwitchTruckTypeButtonClick = this.onSwitchTruckTypeButtonClick.bind(this)
        this.onTruckDeleteButtonClick = this.onTruckDeleteButtonClick.bind(this)
        this.onUntnClcClick = this.onUntnClcClick.bind(this)
        this.onTorkgoPopupCloseClick = this.onTorkgoPopupCloseClick.bind(this)
        this.onMtmrDetailPopupCloseClick = this.onMtmrDetailPopupCloseClick.bind(this)
        this.openAnkenDetail = this.openAnkenDetail.bind(this)

        this.itemDef4trkInf = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "disu", label: "台数", onChange: this.onTextChange("disu") },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "add", label: "追加", onChange: this.onTruckAddButtonClick, style: { margin: "16px" } },
        ]

        this.itemDef4rtInf = [
            { type: INPUT_FIELD_TYPE_DATETIME, id: "shukNtj", label: "集荷日時", onChange: this.onDateChange("shukNtj"), format: "yyyy/MM/dd HH:mm" },
            { type: INPUT_FIELD_TYPE_TEXT, id: "shukSk", label: "集荷先", onChange: this.onTextChange("shukSk") },
            { type: INPUT_FIELD_TYPE_DATETIME, id: "hisoNtj", label: "配送日時", onChange: this.onDateChange("hisoNtj"), format: "yyyy/MM/dd HH:mm" },
            { type: INPUT_FIELD_TYPE_TEXT, id: "hisoSk", label: "配送先", onChange: this.onTextChange("hisoSk") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "kyori", label: "距離", onChange: this.onTextChange("kyori") },
        ]
        
        this.itemDef4mtmrKngk = [
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "calcHoho", label: "計算方法", onChange: this.onRadioChange("calcHoho"),
                items: getMstCdSelectionFromMap(MST_KEY__CALC_HOHO_CD, this.props.AppRoot.mstCdMap)
            },
            // { type: BREAK_LINE },
            // { type: INPUT_FIELD_TYPE_SELECT, id: "kyoriOb", label: "距離帯", onChange: this.onSelectChange("kyoriOb"), style: { width: "200px" } },
            { type: INPUT_FIELD_TYPE_SELECT, id: "juryoOb", label: "重量帯", onChange: this.onSelectChange("juryoOb"), style: { width: "200px" } },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "untn", label: "運賃", disabled: true, onChange: this.onKngkTextChange("untn") },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "clc_untn", label: "運賃計算", onChange: this.onUntnClcClick },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "nnryoScg", label: "燃料サーチャージ", onChange: this.onKngkTextChange("nnryoScg"), style: { width: "200px" } },
            { type: INPUT_FIELD_TYPE_TEXT, id: "tmkmRyo", label: "積込み料", onChange: this.onKngkTextChange("tmkmRyo") },
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "tmkmYh", label: "積込み有無", onChange: this.onRadioChange("tmkmUm"),
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "trorsRyo", label: "取卸し料", onChange: this.onKngkTextChange("trSRyo") }, // TODO: 
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "trorsYh", label: "取卸し有無", onChange: this.onRadioChange("trSUm"),
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "ftiSgyoRyo", label: "附帯作業料", onChange: this.onKngkTextChange("ftiSgyoRyo") },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "ftiSgyoUtwk", label: "付帯作業内訳", onChange: this.onFtiSgyoUtwkClick },
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "tnirYh", label: "棚入れ要否", onChange: this.onRadioChange("tnirUm"), className: "ftiSgyoUtwk margin-left",
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "lblHrYh", label: "ラベル貼り要否", onChange: this.onRadioChange("lblHrUm"), className: "ftiSgyoUtwk",
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "ykmtYh", label: "横持ち要否", onChange: this.onRadioChange("ykmtUm"), className: "ftiSgyoUtwk margin-left",
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "ttmtYh", label: "縦持ち要否", onChange: this.onRadioChange("ttmtUm"), className: "ftiSgyoUtwk",
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            {
                type: INPUT_FIELD_TYPE_RADIO, id: "hisgyoYh", label: "はい作業要否", onChange: this.onRadioChange("hisgyoUm"), className: "ftiSgyoUtwk margin-left",
                items: [{ "value": "0", "label": "有" }, { "value": "1", "label": "無" }]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "sntRyokn", label: "その他料金", onChange: this.onKngkTextChange("sntRyokn") },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "wrbkKngk", label: "割引金額", onChange: this.onKngkTextChange("wrbkKngk") },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "合計金額", disabled: true, onChange: this.onTextChange("gokeKngk") },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "biko", label: "備考", onChange: this.onTextChange("biko") },
        ]

        this.itemDef4footer = [
            { type: INPUT_FIELD_TYPE_BUTTON, id: "entry", label: "保存", color: "secondary", onChange: this.onHznClick },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrshDL", label: "見積書DL", color: "primary", onChange: function () { } },
        ]

        // 見積依頼用
        this.itemDef4IrishContents = getItemDef4IrishContents(this).map(v => { return { ...v, disabled: true } })
        this.itemDef4NmtContents = getItemDef4NmtContents(this).map(v => { return { ...v, disabled: true } })
        this.itemDef4NtjContents = getItemDef4NtjContents(this).map(v => { return { ...v, disabled: true } })
        this.itemDef4HisoJknContents = getItemDef4HisoJknContents(this)

    }

    async componentDidMount() {

        const anknId = _.get(this.props, "location.state.anknId") || this.props.anknId

        console.log(this.props)

        if (!!anknId) {
            // APIコール
            const res = await FetchUtils.getFromFdApi(`${API_MTMR_DETAIL}/${anknId}`)

            console.log(res)

            if (res.success) {
                const anknData = _.get(res, "data", {})

                const mtmrMisiData = getSisnMtmrIri(_.get(anknData, "trnAnknMisi"))
                const shukKiboNtj = convServerDatetimeStr2ClientDateObj(mtmrMisiData.shukKiboNtj)
                const hisoKiboNtj = convServerDatetimeStr2ClientDateObj(mtmrMisiData.hisoKiboNtj)
                const shukNtj = convServerDatetimeStr2ClientDateObj(mtmrMisiData.shukNtj)
                const hisoNtj = convServerDatetimeStr2ClientDateObj(mtmrMisiData.hisoNtj)
                const truckInfLst = _.get(mtmrMisiData, "trnTrkRiy", []).map(v=> ({truckType: v.trkTypeCd, truckTypeLabel: v.trkTypeCdDesc01, disu: v.trkDisu}))
                
                this.setState({
                    mtmrIriInf: {
                        ...anknData,
                        ...mtmrMisiData,
                        shukKiboNtj,
                        hisoKiboNtj,
                    },
                    // shukKiboNtj,
                    // hisoKiboNtj,
                    shukNtj: shukNtj || shukKiboNtj,
                    hisoNtj: hisoNtj || hisoKiboNtj,
                    truckInfLst,
                    ...mtmrMisiData,
                }, () => console.log(this.state))
            }
            else {
                showErrMsg(ERR_MSG__FETCH)
            }

        }

    }

    /**
     * 値正規化
     * @param {*} n 
     */
    toN(n){
        return Number(n || "0") || 0
    }

    /**
     * 金額計算
     * @param {*} key 
     * @param {*} newVal 
     */
    calcGokeKngk(key, newVal){
        // 　→「運賃」+「燃料サーチャージ」+「積込み料」+「取卸し料」+「附帯作業料」+「その他料金」-「割引金額」
        const plusValueKeys =  [ "untn", "nnryoScg", "tmkmRyo", "trSRyo", "ftiSgyoRyo", "sntRyokn" ]// , wrbkKngk } = this.state

        const val = plusValueKeys.reduce((p, c)=> {

            const curVal = key === c ? newVal : this.state[c]

            return p + this.toN(curVal)
        }, 0)

        console.log(val, key, newVal)

        return "" + (val - this.toN(key === "wrbkKngk" ? newVal : this.state.wrbkKngk))
    }

    /**
     * 運賃計算API呼び出し
     */
    async onUntnClcClick(){

        console.log(this)

        const truckDisuInf = (this.state.truckInfLst || [])
            .reduce((p, c)=> {

                const current = p[c.truckType] || { disu: 0, truckType: c.truckType }

                current.disu += Number(c.disu || 0)

                return {
                    ...p,
                    [c.truckType]: current
                }
            }, {})

        const trkTypeCd001Disu = _.get(truckDisuInf, "[001].disu", 0)
        const trkTypeCd002Disu = _.get(truckDisuInf, "[002].disu", 0)
        const trkTypeCd003Disu = _.get(truckDisuInf, "[003].disu", 0)
        const kyori = Number(this.state.kyori || "0")
        
        const params = {
            trkTypeCd001Disu, trkTypeCd002Disu, trkTypeCd003Disu, kyori
        }
        
        const res = await FetchUtils.post2FdApi(`${API_CLC_UNTN}`, params)

        if(res.success){
            const untn = _.get(res, "data.untn", 0)

            this.setState({
                untn: "" + untn,
                gokeKngk: this.calcGokeKngk("untn", untn)
            })
        }
        else{
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }
    
    }

    /**
     * 
     * @param {*} event 
     */
    onFtiSgyoUtwkClick(event) {
        this.setState({
            isFtiSgyoOpen: !this.state.isFtiSgyoOpen
        })
    }

    /**
     * トラック情報削除ボタン押下時
     * @param {*} truckInf 
     * @param {*} i 
     */
    onTruckDeleteButtonClick(truckInf, idx) {

        const truckInfLst = (this.state.truckInfLst || []).filter((v, i) => i !== idx)

        this.setState({
            truckInfLst: truckInfLst
        })
    }

    /**
     * トラック種別ボタン押下時
     * @param {*} truckType 
     */
    onSwitchTruckTypeButtonClick(truckType) {
        this.setState({
            truckType: truckType
        }, () => console.log(this.state))
    }

    /**
     * トラック情報追加ボタン押下時
     */
    onTruckAddButtonClick() {

        // 入力がそろってなければ無視
        if (!this.state.disu || !this.state.truckType) return

        const truckTypeLabel = _.get(this.props.AppRoot, `mstCdMap[${MST_KEY__TRK_TYPE_CD}][${this.state.truckType}].cdDesc01`, "")

        const truckInfLst = this.state.truckInfLst || []
        truckInfLst.push({ truckType: this.state.truckType, truckTypeLabel, disu: this.state.disu })

        this.setState({
            truckInfLst: truckInfLst,
            disu: "",
            truckType: "",
        })

    }

    /**
     * 保存ボタン押下時処理
     * @param {*} opType 保存ボタン押下種別(デフォルトは新規)
     */
    async onHznClick(opType = BUTTON_OPERATION_TYPE__UPDATE) {

        console.log(this.state.mtmrIriInf)

        // 共通部分 まずは見積依頼の情報をコピーする
        const params = getMtmrSendParameter(this.state.mtmrIriInf, ANKN_STS_CD__MTMR_TORK_SM)

        // console.log(this.state.mtmrIriInf)

        // // パラメータ明細
        // const paramsMisi = Object.keys(mtmrIriStates).reduce((p, key)=> {
        //     return {
        //         ...p,
        //         [key]: this.state[key]
        //     }
        // }, {})

        // トラック情報を詰める
        const trkInfArr = (this.state.truckInfLst || [])
            .map(v => {
                return {
                    tenant: "",
                    trkTypeCd: v.truckType,
                    trkDisu: v.disu
                }
            })
        params.trnAnknMisi[0].trnTrkRiy = trkInfArr;

        // 配送先情報/金額情報を詰める
        [...this.itemDef4rtInf, ...this.itemDef4mtmrKngk]
            .forEach(v=> {
                params.trnAnknMisi[0][v.id] = this.state[v.id]
            })

        // paramsMisi["juchuFlg"] = "0"
        // paramsMisi["trhkSkTntoshNm"] = this.state.trhkSkTntoshNm || "000"
        // paramsMisi["nmtTypeCd"] = this.state.nmtTypeCd || "000"
        // paramsMisi["knsiKhCd"] = this.state.knsiKhCd || "000"
        // paramsMisi["unitloadTypeCd"] = this.state.unitloadTypeCd || "000"
        // paramsMisi["kknbtUmCd"] = this.state.kknbtUmCd || "000"
        // paramsMisi["nsgtTypeCd"] = this.state.nsgtTypeCd || "000"
        // paramsMisi["snpo"] = this.state.snpo || "000"
        // paramsMisi["juryo"] = this.state.juryo || "000"
        // paramsMisi["kosu"] = this.state.kosu || "000"
        // paramsMisi["shukKiboNtj"] = this.state.shukKiboNtj || "" + (new Date()).toISOString()
        // paramsMisi["hisoKiboNtj"] = this.state.hisoKiboNtj || "" + (new Date()).toISOString()
        // paramsMisi["kiboKngk"] = this.state.kiboKngk || "000"
        // paramsMisi["calcHohoCd"] = this.state.calcHohoCd || "000"
        // paramsMisi["trkTypeCd"] = this.state.trkTypeCd || "000"
        // paramsMisi["juryotaiCd"] = this.state.juryotaiCd || "000"
        // paramsMisi["kyoritaiCd"] = this.state.kyoritaiCd || "000"

        console.log(params)

        const anknId = _.get(this.props, "location.state.anknId") || this.props.anknId

        // 見積回答新規でも更新でも、PUTでコールする
        // const res = await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}`, _.get(this.props, "location.state.anknId"), params)
        // const res = (opType === BUTTON_OPERATION_TYPE__UPDATE)
        // ? await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}`, anknId, params)
        // : await FetchUtils.post2FdApi(`${API_MTMR_DETAIL}`, params)

        const res = await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}`, anknId, params)

        console.log(res)

        if (res.success) {
            // showAlertMsg(SUCCESS_MSG__HZN)
            this.setState({
                isTorkgoPopupShown: true,
                responseAnknId: _.get(res, "data.anknId")
            })
        }
        else {
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }

    }

    /**
     * 登録後ポップアップクローズハンドラ
     */
    onTorkgoPopupCloseClick() {
        this.setState({
            isTorkgoPopupShown: false,
        })
    }

    openAnkenDetail() {
        this.setState({
            isMtmrDetailPopupShown: true,
        })
    }

    onMtmrDetailPopupCloseClick() {
        this.setState({
            isMtmrDetailPopupShown: false
        })
    }

    /**
     * 取引先マスタ選択時のコールバック
     * @param {*} trhkskItem 
     */
    onTrhkskSelectCallback(trhkskItem) {
        this.setState({
            trhkSkKishId: trhkskItem.trhkSkKishId,
            trhkSkKishNo: trhkskItem.trhkSkKishNo,
            trhkSkKishNm: trhkskItem.trhkSkKishNm,
            trhkSkKishNmKn: trhkskItem.trhkSkKishNmKn,
            trhkSkKishZipNo: trhkskItem.trhkSkKishZipNo,
            trhkSkKishAddress: trhkskItem.trhkSkKishAddress,
        })
    }

    render() {

        const split = { display: "inline-block", verticalAlign: "top", margin: "6px" }

        return (
            <div className="OM0105-wrapper inner-wrapper" style={this.props.style}>

                <Grid container spacing={3}
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                >

                    <Grid item xs={8} className="top-title-area">
                        <Typography variant="h5"><EditIcon />回答作成</Typography>
                    </Grid>

                    <Grid item xs={4} className="top-title-area">
                        <Typography variant="h5"><EditIcon />依頼内容</Typography>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper>
                            

                            <Paper className="input-items-wrapper">
                                <Typography variant="h6">トラック情報</Typography>

                                <div>
                                    {
                                        getMstCdSelectionFromMap(MST_KEY__TRK_TYPE_CD, this.props.AppRoot.mstCdMap)
                                            .map((v, i) => {
                                                return (
                                                    <Fab
                                                        key={`trk-inf-${i}`}
                                                        size="small"
                                                        color={v.value === this.state.truckType ? "primary" : "default"}
                                                        aria-label="add"
                                                        variant="extended"
                                                        style={{ width: "128px", height: "64px", margin: "8px" }}
                                                        onClick={() => this.onSwitchTruckTypeButtonClick(v.value)}
                                                    >
                                                        <LocalShippingIcon />
                                                        <span>{v.label}</span>
                                                    </Fab>
                                                )
                                            })
                                    }

                                    {
                                        this.itemDef4trkInf.map((v, i) => (<FieldItem key={`trk-inf-row2-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                                    }

                                </div>

                                {
                                    (this.state.truckInfLst || [])
                                        .map((v, i) => (
                                            <Chip
                                                key={`trk-inf-added-${i}`}
                                                icon={<LocalShippingIcon />}
                                                label={` ${v.truckTypeLabel} ${v.disu}台`}
                                                onDelete={() => this.onTruckDeleteButtonClick(v, i)}
                                                color="primary"
                                            />
                                        ))
                                }
                            </Paper>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className="iri-niyo-wrapper">
                            {/* <Typography variant="h5"><DescriptionIcon />依頼内容</Typography> */}
                            {/* {
                                getMtmtIriAllContents(this)
                            } */}
                            <Paper className="mtmr-iri-irish">
                                <Typography variant="h5">依頼者</Typography>
                                {
                                    [
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "会社名" },
                                    ]
                                        .map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                                }
                            {/* </Paper> */}

                            {/* <Paper className="mtmr-iri-nmt"> */}
                                <Typography variant="h5">荷物</Typography>

                                {
                                    [
                                        {
                                            type: INPUT_FIELD_TYPE_RADIO, id: "nmtTypeCd", label: "荷物種別", onChange: this.onRadioChange("nmtTypeCd"),
                                            items: getMstCdSelectionFromMap(MST_KEY__NMT_TYPE_CD, this.props.AppRoot.mstCdMap)
                                        },
                                        { type: BREAK_LINE },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名", },
                                        { type: BREAK_LINE },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "snpo", label: "寸法" },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "juryo", label: "重量" },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "kosu", label: "個数" },

                                    ]
                                        .map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                                }

                                <Button variant="outlined" color="primary" onClick={this.openAnkenDetail}>詳細</Button>

                            </Paper>

                            
                        </Paper>
                    </Grid>


                    <Grid item xs={8}>
                        <Paper className="input-items-wrapper">
                            <Typography variant="h6">ルート情報</Typography>
                            {
                                this.itemDef4rtInf.map((v, i) => (<FieldItem key={`rt-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                            }
                        </Paper>
                    </Grid>


                    <Grid item xs={4}>
                        <Paper className="input-items-wrapper">
                            <Typography variant="h6">日時・場所</Typography>
                            {
                                [
                                    { type: INPUT_FIELD_TYPE_DATETIME, id: "shukKiboNtj", label: "集荷希望日時", format: "yyyy/MM/dd HH:mm" },
                                    { type: INPUT_FIELD_TYPE_DATETIME, id: "hisoKiboNtj", label: "配送希望日時", format: "yyyy/MM/dd HH:mm" },
                                ]
                                    .map((v, i) => (<FieldItem key={`rt-item-${i}`} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                            }
                            <Button variant="outlined" color="primary" onClick={this.openAnkenDetail}>詳細</Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper className={`input-items-wrapper ${!this.state.isFtiSgyoOpen ? "ftisgyo-no-disp" : ""}`}>
                            <Typography variant="h6">見積金額</Typography>
                            {
                                this.itemDef4mtmrKngk.map((v, i) => (<FieldItem key={`mtmr-kngk-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                            }
                        </Paper>
                    </Grid>


                    <Grid item xs={4}>
                        <Paper className="input-items-wrapper">
                            <Typography variant="h6">配送条件</Typography>
                            {
                                [
                                    { type: INPUT_FIELD_TYPE_TEXT, id: "sntJokn", label: "その他条件" },
                                    { type: INPUT_FIELD_TYPE_TEXT, id: "kiboKngk", label: "希望金額" }
                                ]
                                    .map((v, i) => (<FieldItem key={`mtmr-kngk-item-${i}`} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                            }
                            <Button variant="outlined" color="primary" onClick={this.openAnkenDetail}>詳細</Button>
                        </Paper>
                    </Grid>



                    <Grid item xs={12} className="footer-buttons">
                        {
                            this.itemDef4footer.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Grid>
                </Grid>


                <Modal
                    open={this.state.isMtmrDetailPopupShown}
                    onClose={this.onMtmrDetailPopupCloseClick}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {
                        <div style={getModalStyle()} className="contents-wrap">

                            <OM0103
                                anknId={_.get(this.props, "location.state.anknId") || this.props.anknId}
                                openAsUpd={true}
                                style={{ height: "100%", overflowY: "scroll", padding: "8px", backgroundColor: "#fff" }}
                            />

                        </div>

                    }
                </Modal>

                <Modal
                    open={this.state.isTorkgoPopupShown}
                    onClose={this.onTorkgoPopupCloseClick}
                >
                    {
                        <div style={{ ...getModalStyle(), height: "auto" }} className="contents-wrap">

                            <div className="inner-popup" style={{ backgroundColor: "#fff", margin: "64px" }}>
                                <p style={{ padding: "32px", fontWeight: "bold" }}>
                                    {MSG__OM0105_TORKGO_POPUP}
                                </p>

                                <Button variant="contained" style={{ margin: "16px" }} onClick={(() => { this.props.history.push(`${process.env.PUBLIC_URL}/OM0104`, { anknId: this.state.responseAnknId }) }).bind(this) }>一覧へ戻る</Button>

                                <Button variant="contained" disabled style={{ margin: "16px" }} onClick={(() => { }).bind(this)}>見積書DL</Button>

                                <Button variant="contained" disabled style={{ margin: "16px" }} onClick={(() => { this.props.history.push(`${process.env.PUBLIC_URL}/OM0105`, { anknId: this.state.responseAnknId }) }).bind(this)}>受注にする</Button>
                            </div>

                        </div>

                    }
                </Modal>

            </div>
        )
    }

}
