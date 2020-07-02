
import React from 'react'
import PropTypes from "prop-types"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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
    OUTPUT_FIELD_TYPE_TABLE
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
    showErrMsg,
} from "../../utils/CommonUtils"
import CommonIconButton from '../commons/CommonIconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import _ from "lodash"
import FetchUtils from '../../utils/FetchUtils'
import { API_TRHKSK_MST_DETAIL } from '../../constants/apiPath'
import { SUCCESS_MSG__HZN, ERR_MSG__HZN, ERR_MSG__FETCH } from '../../constants/message'

export default class OM0301 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
			trhkSkKishNo: "",
			trhkSkKishNm: "",
			trhkSkKishNmKn: "",
			trhkSkKishZipNo: "",
			trhkSkKishAddress: "",
			trhkSkKishTelNo: "",
			trhkSkTntoshNm: "",
			trhkSkTntoshNmKn: "",
			tntoshMailaddress: "",
			tntoshTelNo: "",

            trhkSkTntoshLst: []
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onTntoshDeleteClick = this.onTntoshDeleteClick.bind(this)
        this.addTntosh = this.addTntosh.bind(this)

        this.itemDef4TrhkskKish = [
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNo", label: "取引先コード"},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "取引先会社名", onChange: this.onTextChange("trhkSkKishNm")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNmKn", label: "取引先会社名（カナ）", onChange: this.onTextChange("trhkSkKishNmKn")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishZipNo", label: "郵便番号", onChange: this.onTextChange("trhkSkKishZipNo")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishAddress", label: "住所", onChange: this.onTextChange("trhkSkKishAddress")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishTelNo", label: "電話番号", onChange: this.onTextChange("trhkSkKishTelNo")},
        ]
        
        this.itemDef4Tntosh = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNm", label: "担当者名", onChange: this.onTextChange("trhkSkTntoshNm")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNmKn", label: "担当者名（カナ）", onChange: this.onTextChange("trhkSkTntoshNmKn")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshMailaddress", label: "担当者メールアドレス", onChange: this.onTextChange("tntoshMailaddress")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshTelNo", label: "担当者電話番号", onChange: this.onTextChange("tntoshTelNo")},
            { type: INPUT_FIELD_TYPE_BUTTON, id: "tntoshAddBtn", label: "追加", onChange: this.addTntosh, color: "primary"}
        ]

        this.itemDef4TntoshLst = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "trhkSkLst", label: "取引先一覧",
            headerDef: [
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNm", label: "担当者名", onChange: this.onTextChange("trhkSkTntoshNm")},
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNmKn", label: "担当者名（カナ）", onChange: this.onTextChange("trhkSkTntoshNmKn")},
                { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshMailaddress", label: "担当者メールアドレス", onChange: this.onTextChange("tntoshMailaddress")},
                { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshTelNo", label: "担当者電話番号", onChange: this.onTextChange("tntoshTelNo")},
                { customComponent: (
                    <div className="trhksk-actions-col">
                        <CommonIconButton icon={(<DeleteIcon />)} onChange={this.onTntoshDeleteClick} />
                    </div>
                    ),
                    bindparam: "table-custom-component-col"
                }
            ],
            items: []
        }]
    }

    async componentDidMount() {
        const trhkSkKishId = _.get(this.props, "location.state.trhkSkKishId") || this.props.trhkSkKishId

        if(trhkSkKishId){
            // 初期検索実行
            const res = await FetchUtils.getFromFdApi(`${API_TRHKSK_MST_DETAIL}/${trhkSkKishId}`)

            if (res.success) {
                const { trhkSkKishNo, trhkSkKishNm, trhkSkKishNmKn, trhkSkKishZipNo, trhkSkKishAddress, trhkSkKishTelNo, trhkSkTntoshNm, trhkSkTntoshNmKn, tntoshMailaddress, tntoshTelNo, mstTrhkSkTntosh } = _.get(res, "data", {})

                this.setState({
                    trhkSkKishNo, 
                    trhkSkKishNm, 
                    trhkSkKishNmKn, 
                    trhkSkKishZipNo, 
                    trhkSkKishAddress, 
                    trhkSkKishTelNo, 
                    trhkSkTntoshNm, 
                    trhkSkTntoshNmKn, 
                    tntoshMailaddress, 
                    tntoshTelNo, 
                    trhkSkTntoshLst: mstTrhkSkTntosh,
                })
            }
            else {
                showErrMsg(ERR_MSG__FETCH)
            }
        }
    }

    async onHznClick(){
        const mstTrhkSkTntosh = this.state.trhkSkTntoshLst

        const { trhkSkKishNo, trhkSkKishNm, trhkSkKishNmKn, trhkSkKishTelNo, trhkSkKishZipNo, trhkSkKishAddress } = this.state

        const params = {
            tenant: "123",
            trhkSkKishNm,
            trhkSkKishNmKn,
            trhkSkKishTelNo,
            trhkSkKishZipNo,
            trhkSkKishAddress,
            mstTrhkSkTntosh
        }

        if(trhkSkKishNo){
            params.trhkSkKishNo = trhkSkKishNo
        }

        // APIコールで取引先登録
        const res = await FetchUtils.post2FdApi(`${API_TRHKSK_MST_DETAIL}`, params)

        console.log(res)

        if (res.success) {
            showAlertMsg(SUCCESS_MSG__HZN)
        }
        else {
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }

    }

    getRowIdByBindParam(event){
        if(!event || !event.target) return -1

        const tgtEl = event.target.closest("div[bindparam=table-custom-component-col")
        const rowId = !!tgtEl ? tgtEl.getAttribute("rowindex") : "-1"

        return Number(rowId)
    }

    trhkSkTntoshLstTableCreator(items) {

        this.itemDef4TntoshLst[0].items = items || []

        return this.itemDef4TntoshLst
    }

    onTntoshDeleteClick(event){
        const rowId = this.getRowIdByBindParam(event)

        const trhkSkTntoshLst = (this.state.trhkSkTntoshLst || []).filter((v, i)=> rowId !== i)

        this.setState({ trhkSkTntoshLst })        
    }

    addTntosh(){
        const tntoshLst = Object.assign([], this.state.trhkSkTntoshLst)

        tntoshLst.push({
            trhkSkTntoshNm: this.state.trhkSkTntoshNm,
			trhkSkTntoshNmKn: this.state.trhkSkTntoshNmKn,
			tntoshMailaddress: this.state.tntoshMailaddress,
			tntoshTelNo: this.state.tntoshTelNo,
        })

        this.setState({
            trhkSkTntoshLst: tntoshLst
        })
    }

    render(){

        return (
            <div className="OM0301-wrapper inner-wrapper">
                <Paper className="input-items-wrapper">
                {
                    this.itemDef4TrhkskKish.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>

                <Paper className="input-items-wrapper">
                {
                    this.itemDef4Tntosh.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                {
                    this.trhkSkTntoshLstTableCreator(this.state.trhkSkTntoshLst).map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>

                <Grid item xs={12} className="footer-butons">
                    <HznButton text="保存" onClick={this.onHznClick} />
                </Grid>
                
            </div>
        )
    }

}
