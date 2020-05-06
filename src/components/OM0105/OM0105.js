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
} from "../../utils/CommonUtils"

import "./OM0105.scss"
import { getMtmtIriAllContents, getItemDef4IrishContents, getItemDef4NmtContents, getItemDef4NtjContents, getItemDef4HisoJknContents, mtmrIriStates, getSisnMtmrIri } from '../../utils/MtmrIriUtils'
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
import { API_MTMR_DETAIL } from '../../constants/apiPath'
import { ERR_MSG__FETCH, SUCCESS_MSG__HZN, ERR_MSG__HZN, MSG__OM0105_TORKGO_POPUP } from '../../constants/message'
import _ from "lodash"
import { ANKN_STS_CD__MTMR_KITO_SM, ANKN_STS_CD__MTMR_TORK_SM } from '../../constants/MtmrIri'
import { MST_KEY__CALC_HOHO_CD, MST_KEY__TRK_TYPE_CD } from '../../constants/MstCdKey'



//export default class OM0105 extends React.Component{
export default class OM0105 extends React.PureComponent{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

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
			shukNtj: "",
			shukSk: "",
			hisoNtj: "",
			hisoSk: "",
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
			gokeKngk: "",
			biko: "",
			kknn: "",
			edit: "",
			entry: "",
			mtmrshDL: "",
        }

        this.onFtiSgyoUtwkClick = this.onFtiSgyoUtwkClick.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onDateChange = onDateChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onTruckAddButtonClick = this.onTruckAddButtonClick.bind(this)
        this.onSwitchTruckTypeButtonClick = this.onSwitchTruckTypeButtonClick.bind(this)
        this.onTruckDeleteButtonClick = this.onTruckDeleteButtonClick.bind(this)

        this.itemDef4trkInf = [
            { type: INPUT_FIELD_TYPE_RADIO, id: "calcHoho", label: "計算方法", onChange: this.onRadioChange("calcHoho"), 
                //items: [{"value":"0","label":"車両貸し"},{"value":"1","label":"混載"}]
                items: getMstCdSelectionFromMap(MST_KEY__CALC_HOHO_CD, this.props.AppRoot.mstCdMap)
            },
            { type: INPUT_FIELD_TYPE_TEXT, id: "disu", label: "台数", onChange: this.onTextChange("disu")},
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "add", label: "追加", onChange: this.onTruckAddButtonClick, style: {margin: "16px"} },
        ]

        this.itemDef4rtInf = [
            { type: INPUT_FIELD_TYPE_DATETIME, id: "shukNtj", label: "集荷日時", onChange: this.onDateChange("shukNtj")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "shukSk", label: "集荷先", onChange: this.onTextChange("shukSk")},
			{ type: INPUT_FIELD_TYPE_DATETIME, id: "hisoNtj", label: "配送日時", onChange: this.onDateChange("hisoNtj")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "hisoSk", label: "配送先", onChange: this.onTextChange("hisoSk")},
        ]

        this.itemDef4mtmrKngk = [
            { type: OUTPUT_FIELD_TYPE_TEXT, id: "untn", label: "運賃", disabled: true },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_SELECT, id: "juryoOb", label: "重量帯", onChange: this.onSelectChange("juryoOb"), style: { width: "200px" } },
			{ type: INPUT_FIELD_TYPE_SELECT, id: "kyoriOb", label: "距離帯", onChange: this.onSelectChange("kyoriOb"), style: { width: "200px" } },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "nnryoScg", label: "燃料サーチャージ", onChange: this.onTextChange("nnryoScg"), style: { width: "200px" } },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "tmkmRyo", label: "積込み料", onChange: this.onTextChange("tmkmRyo")},
            { type: INPUT_FIELD_TYPE_RADIO, id: "tmkmUm", label: "積込み有無", onChange: this.onRadioChange("tmkmUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trSRyo", label: "取卸し料", onChange: this.onTextChange("trSRyo")},
            { type: INPUT_FIELD_TYPE_RADIO, id: "trSUm", label: "取卸し有無", onChange: this.onRadioChange("trSUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "ftiSgyoRyo", label: "附帯作業料", onChange: this.onTextChange("ftiSgyoRyo")},
            { type: INPUT_FIELD_TYPE_BUTTON, id: "ftiSgyoUtwk", label: "付帯作業内訳", onChange: this.onFtiSgyoUtwkClick },
            { type: INPUT_FIELD_TYPE_RADIO, id: "tnirUm", label: "棚入れ有無", onChange: this.onRadioChange("tnirUm"), className: "ftiSgyoUtwk margin-left",
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "lblHrUm", label: "ラベル貼り有無", onChange: this.onRadioChange("lblHrUm"), className: "ftiSgyoUtwk",
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "ykmtUm", label: "横持ち有無", onChange: this.onRadioChange("ykmtUm"), className: "ftiSgyoUtwk margin-left",
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "ttmtUm", label: "縦持ち有無", onChange: this.onRadioChange("ttmtUm"), className: "ftiSgyoUtwk",
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "hisgyoUm", label: "はい作業有無", onChange: this.onRadioChange("hisgyoUm"), className: "ftiSgyoUtwk margin-left",
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "sntRyokn", label: "その他料金", onChange: this.onTextChange("sntRyokn")},
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "wrbkKngk", label: "割引金額", onChange: this.onTextChange("wrbkKngk")},
            { type: BREAK_LINE },
            { type: OUTPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "合計金額"},
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "biko", label: "備考", onChange: this.onTextChange("biko")},
        ]

        this.itemDef4footer = [
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "entry", label: "登録", color: "secondary", onChange: this.onHznClick},
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrshDL", label: "見積書DL", color: "primary", onChange: function(){}},
        ]

        // 見積依頼用
        this.itemDef4IrishContents = getItemDef4IrishContents(this).map(v=> { return { ...v, disabled: true} })
        this.itemDef4NmtContents = getItemDef4NmtContents(this).map(v=> { return { ...v, disabled: true} })
        this.itemDef4NtjContents = getItemDef4NtjContents(this).map(v=> { return { ...v, disabled: true} })
        this.itemDef4HisoJknContents = getItemDef4HisoJknContents(this)

        this.onMtmrDetailPopupCloseClick = this.onMtmrDetailPopupCloseClick.bind(this)
        this.openAnkenDetail = this.openAnkenDetail.bind(this)
    }

    async componentDidMount(){

        const anknId = _.get(this.props, "location.state.anknId")

        console.log(anknId)

        if(!!anknId){
            // APIコール
            const res = await FetchUtils.getFromFdApi(`${API_MTMR_DETAIL}/${anknId}`)
                                
            console.log(res)

            if(res.success){
                const anknData = _.get(res, "data", {})

                const mtmrMisiData = getSisnMtmrIri(_.get(anknData, "trnAnknMisi"))

                this.setState({
                    mtmrIriInf: {
                        //...trhkskKishData,
                        ...anknData,
                        ...mtmrMisiData
                    }
                })
            }
            else{
                showErrMsg(ERR_MSG__FETCH)
            }

        }

    }

    /**
     * 
     * @param {*} event 
     */
    onFtiSgyoUtwkClick(event){
        console.log("called")
        this.setState({
            isFtiSgyoOpen: !this.state.isFtiSgyoOpen
        })
    }

    /**
     * トラック情報削除ボタン押下時
     * @param {*} truckInf 
     * @param {*} i 
     */
    onTruckDeleteButtonClick(truckInf, idx){

        const truckInfLst = (this.state.truckInfLst || []).filter((v, i)=> i !== idx)

        this.setState({
            truckInfLst: truckInfLst
        })
    }

    /**
     * トラック種別ボタン押下時
     * @param {*} truckType 
     */
    onSwitchTruckTypeButtonClick(truckType){
        this.setState({
            truckType: truckType
        }, ()=> console.log(this.state))
    }

    /**
     * トラック情報追加ボタン押下時
     */
    onTruckAddButtonClick(){
        
        // 入力がそろってなければ無視
        if(!this.state.disu || !this.state.truckType) return

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
    async onHznClick(){

        // 送信パラメータ全体
        const params = {}

        console.log(this.state.mtmrIriInf)

        // パラメータ明細
        const paramsMisi = Object.keys(mtmrIriStates).reduce((p, key)=> {
            return {
                ...p,
                [key]: this.state[key]
            }
        }, {})        

        // TODO: ゴミ項目 一旦値セット
        paramsMisi["ankn"] = this.state.ankn || "GM"
        paramsMisi["juchuFlg"] = this.state.juchuFlg || false

        paramsMisi["trhkSkTntoshNm"] = this.state.trhkSkTntoshNm || "000"
        paramsMisi["nmtTypeCd"] = this.state.nmtTypeCd || "000"
        paramsMisi["knsiKhCd"] = this.state.knsiKhCd || "000"
        paramsMisi["unitloadTypeCd"] = this.state.unitloadTypeCd || "000"
        paramsMisi["kknbtUmCd"] = this.state.kknbtUmCd || "000"
        paramsMisi["nsgtTypeCd"] = this.state.nsgtTypeCd || "000"
        paramsMisi["snpo"] = this.state.snpo || "000"
        paramsMisi["juryo"] = this.state.juryo || "000"
        paramsMisi["kosu"] = this.state.kosu || "000"
        paramsMisi["shukKiboNtj"] = this.state.shukKiboNtj || "" + (new Date()).toISOString()
        paramsMisi["hisoKiboNtj"] = this.state.hisoKiboNtj || "" + (new Date()).toISOString()
        paramsMisi["kiboKngk"] = this.state.kiboKngk || "000"
        paramsMisi["calcHohoCd"] = this.state.calcHohoCd || "000"
        paramsMisi["trkTypeCd"] = this.state.trkTypeCd || "000"
        paramsMisi["juryotaiCd"] = this.state.juryotaiCd || "000"
        paramsMisi["kyoritaiCd"] = this.state.kyoritaiCd || "000"

        // // TODO: 暫定
         params["ankn_sts_cd"] = ANKN_STS_CD__MTMR_TORK_SM // 見積登録済

        // // TODO: 依頼元入力種別を固定で「001」セット
        params["irimt_input_type_cd"] = "001"
        
        // // TODO: 案件番号を一旦テキトーに値セット
        params["ankn_no"] = "ankenno000"

        params["trhkSkKishId"] = _.get(this.state.mtmrIriInf, "trhkSkKishId")
        params["trhkSkKishNm"] = _.get(this.state.mtmrIriInf, "trhkSkKishNm")
        params["trhkSkKishNmKn"] = _.get(this.state.mtmrIriInf, "trhkSkKishNmKn")

        // params["trn_ankn_misi"] = [ paramsMisi ]
        // TODO: 暫定
        params["anknStsCd"] = "001"
        paramsMisi["anknStsCd"] = "001"

        // TODO: 依頼元入力種別を固定で「001」セット
        params["irimtInputTypeCd"] = "001"
        
        // TODO: 案件番号を一旦テキトーに値セット
        params["anknNo"] = "ankenno000"

        // params["trhkSkKish"] = paramsKish
        params["trnAnknMisi"] = [ paramsMisi ]

        console.log(params)

        // 見積回答新規でも更新でも、PUTでコールする
        const res = await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}`, _.get(this.props, "location.state.anknId"), params)     

        console.log(res)

        if(res.success){
            // showAlertMsg(SUCCESS_MSG__HZN)
            this.setState({
                isTorkgoPopupShown: true,
                responseAnknId: _.get(res, "data.anknId")
            })
        }
        else{
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }

    }

    /**
     * 登録後ポップアップクローズハンドラ
     */
    onTorkgoPopupCloseClick(){
        this.setState({
            isTorkgoPopupShown: false,
        })
    }

    openAnkenDetail(){
        this.setState({
            isMtmrDetailPopupShown: true,
        })
    }

    onMtmrDetailPopupCloseClick(){
        this.setState({
            isMtmrDetailPopupShown: false
        })
    }

    render(){

        const split = { display: "inline-block", verticalAlign: "top", margin: "6px"}

        return (
            <div className="OM0105-wrapper inner-wrapper">

                <Grid container spacing={3} 
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                >

                    <Grid item xs={8}>
                        <Paper>
                            <Typography variant="h5"><EditIcon />回答作成</Typography>

                            <Paper className="input-items-wrapper">
                                <Typography variant="h6">トラック情報</Typography>

                                <div>
                                {
                                    getMstCdSelectionFromMap(MST_KEY__TRK_TYPE_CD, this.props.AppRoot.mstCdMap)
                                        .map((v, i)=> {
                                            return (
                                                <Fab 
                                                    key={i} 
                                                    size="small" 
                                                    color={v.value === this.state.truckType ? "primary" : "default"} 
                                                    aria-label="add" 
                                                    variant="extended" 
                                                    style={{width: "128px", height: "64px", margin: "8px"}}
                                                    onClick={()=> this.onSwitchTruckTypeButtonClick(v.value)}
                                                >
                                                    <LocalShippingIcon />
                                                    <span>{v.label}</span>
                                                </Fab>
                                        )})
                                }

                                {
                                    this.itemDef4trkInf.map((v, i)=> (<FieldItem key={`trhk-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                                }

                                </div>

                                {
                                    (this.state.truckInfLst || [])
                                        .map((v, i)=> (
                                            <Chip
                                                icon={<LocalShippingIcon />}
                                                label={` ${v.truckTypeLabel} ${v.disu}台`}
                                                onDelete={()=> this.onTruckDeleteButtonClick(v, i)}
                                                color="primary"
                                            />
                                        ))
                                }
                            </Paper>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className="iri-niyo-wrapper">
                            <Typography variant="h5"><DescriptionIcon />依頼内容</Typography>
                            {/* {
                                getMtmtIriAllContents(this)
                            } */}
                            <Paper className="mtmr-iri-irish">
                                <Typography variant="h5">依頼者</Typography>
                                {
                                    [
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "会社名" },
                                    ]
                                        .map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                                }
                            </Paper>

                            <Paper className="mtmr-iri-nmt">
                                <Typography variant="h5">荷物</Typography>

                                {
                                    [
                                        { type: INPUT_FIELD_TYPE_RADIO, id: "nmtTypeCd", label: "荷物種別",
                                        items: [
                                            { value: "001", label: "種別0"},
                                            { value: "002", label: "種別1"},
                                        ]
                                        },
                                        { type: BREAK_LINE },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名", },
                                        { type: BREAK_LINE },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "snpo", label: "寸法（ユニットロード or 荷姿）" },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "juryo", label: "重量（ユニットロード or 荷姿）" },
                                        { type: INPUT_FIELD_TYPE_TEXT, id: "kosu", label: "個数（ユニットロード or 荷姿）" },
                                    
                                    ]
                                        .map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                                }

                            </Paper>

                            <Button variant="outlined" color="primary" onClick={this.openAnkenDetail}>詳細</Button>
                        </Paper>
                    </Grid>


                    <Grid item xs={8}>
                        <Paper className="input-items-wrapper">
                            <Typography variant="h6">ルート情報</Typography>
                            {
                                this.itemDef4rtInf.map((v, i)=> (<FieldItem key={`rt-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
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
                                    .map((v, i)=> (<FieldItem key={`rt-item-${i}`} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                            }
                            <Button variant="outlined" color="primary" onClick={this.openAnkenDetail}>詳細</Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper className={`input-items-wrapper ${!this.state.isFtiSgyoOpen ? "ftisgyo-no-disp" : ""}`}>
                            <Typography variant="h6">見積金額</Typography> 
                            {
                                this.itemDef4mtmrKngk.map((v, i)=> (<FieldItem key={`mtmr-kngk-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                            }
                        </Paper>
                    </Grid>
                    

                    <Grid item xs={4}>
                        <Paper className="input-items-wrapper">
                            <Typography variant="h6">配送条件</Typography> 
                            {
                                [
                                    { type: INPUT_FIELD_TYPE_TEXT, id: "sntJokn", label: "その他条件"},
                                    { type: INPUT_FIELD_TYPE_TEXT, id: "kiboKngk", label: "希望金額"}
                                ]
                                    .map((v, i)=> (<FieldItem key={`mtmr-kngk-item-${i}`} {...v} xs={12} md={4} value={this.state.mtmrIriInf[v.id]} />))
                            }
                            <Button variant="outlined" color="primary" onClick={this.openAnkenDetail}>詳細</Button>
                        </Paper>
                    </Grid>

                    

                    <Grid item xs={12} className="footer-buttons">
                    {
                        this.itemDef4footer.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
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
                                ankenId={_.get(this.props, "location.state.anknId")}
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
                        <div style={{...getModalStyle(), height: "auto"}} className="contents-wrap">

                            <div className="inner-popup" style={{backgroundColor: "#fff", margin: "64px;"}}>
                                <p style={{padding: "32px", fontWeight: "bold"}}>
                                    { MSG__OM0105_TORKGO_POPUP }
                                </p>
                                
                                <Button variant="contained" style={{margin: "16px"}} onClick={(()=> {this.props.history.goBack()}).bind(this)}>一覧へ戻る</Button>

                                <Button variant="contained" disabled style={{margin: "16px"}} onClick={(()=> {} ).bind(this)}>見積書DL</Button>

                                <Button variant="contained" disabled style={{margin: "16px"}} onClick={(()=> {this.props.history.push(`${process.env.PUBLIC_URL}/OM0105`, {anknId: this.state.responseAnknId})}).bind(this)}>見積回答を作成</Button>
                            </div>

                        </div>

                    }
                </Modal>

            </div>
        )
    }

}
