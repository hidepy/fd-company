
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
    OUTPUT_FIELD_TYPE_TABLE,
    BUTTON_OPERATION_TYPE__ENTRY,
    BUTTON_OPERATION_TYPE__UPDATE,
    INPUT_FIELD_TYPE_CHECKBOX_ORIGINAL
} from "../../constants/common"
import {
    showAlertMsg,
    isEmpty,
    onTextChange,
    onSelectChange,
    onRadioChange,
    showErrMsg,
} from "../../utils/CommonUtils"
import CommonButton from '../commons/CommonButton'
import CommonIconButton from '../commons/CommonIconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import _ from "lodash"
import FetchUtils from '../../utils/FetchUtils'
import { API_TRHKSK_MST_DETAIL } from '../../constants/apiPath'
import { SUCCESS_MSG__HZN, ERR_MSG__HZN, ERR_MSG__FETCH } from '../../constants/message'
import $ from "jquery"

export default class OM0301 extends React.Component{

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
			trhkSkKishTelNo: "",
			trhkSkTntoshNm: "",
			trhkSkTntoshNmKn: "",
			trhkSkTntoshMail: "",
			trhkSkTntoshTelNo: "",

            trhkSkTntoshLst: [],
            selectedTntoshIndex: null
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onTntoshDeleteClick = this.onTntoshDeleteClick.bind(this)
        this.onAddTntoshClick = this.onAddTntoshClick.bind(this)
        this.onUpdateTntoshClick = this.onUpdateTntoshClick.bind(this)
        this.onTrhkSkTntoshCheckChange = this.onTrhkSkTntoshCheckChange.bind(this)
        this.onHznClickWrap = this.onHznClickWrap.bind(this)

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
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshMail", label: "担当者メールアドレス", onChange: this.onTextChange("trhkSkTntoshMail")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshTelNo", label: "担当者電話番号", onChange: this.onTextChange("trhkSkTntoshTelNo")},
            // { type: INPUT_FIELD_TYPE_BUTTON, id: "tntoshAddBtn", label: "追加", onChange: this.onAddTntoshClick, color: "primary"}
        ]

        this.itemDef4TntoshLst = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "trhkSkLst", label: "担当者一覧",
            tableClassName: "tntosh-lst-table",
            headerDef: [
                { type: INPUT_FIELD_TYPE_CHECKBOX_ORIGINAL, id: "trhkSkTntoshCheck", label: "", onChange: this.onTrhkSkTntoshCheckChange},
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNm", label: "担当者名"},
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNmKn", label: "担当者名（カナ）"},
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshMail", label: "担当者メールアドレス"},
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshTelNo", label: "担当者電話番号"},
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
                const { trhkSkKishId, trhkSkKishNo, trhkSkKishNm, trhkSkKishNmKn, trhkSkKishZipNo, trhkSkKishAddress, trhkSkKishTelNo, trhkSkTntoshNm, trhkSkTntoshNmKn, trhkSkTntoshMail, trhkSkTntoshTelNo, mstTrhkSkTntosh } = _.get(res, "data", {})

                this.setState({
                    trhkSkKishId,
                    trhkSkKishNo, 
                    trhkSkKishNm, 
                    trhkSkKishNmKn, 
                    trhkSkKishZipNo, 
                    trhkSkKishAddress, 
                    trhkSkKishTelNo, 
                    trhkSkTntoshNm, 
                    trhkSkTntoshNmKn, 
                    trhkSkTntoshMail,
                    trhkSkTntoshTelNo,
                    trhkSkTntoshLst: mstTrhkSkTntosh,
                })
            }
            else {
                showErrMsg(ERR_MSG__FETCH)
            }
        }
    }

    onHznClickWrap() {
        const trhkSkKishId = _.get(this.props, "location.state.trhkSkKishId") || this.props.trhkSkKishId
        return ()=> this.onHznClick(trhkSkKishId ? BUTTON_OPERATION_TYPE__UPDATE : BUTTON_OPERATION_TYPE__ENTRY)
    }

    async onHznClick(opType = BUTTON_OPERATION_TYPE__UPDATE) {
        const mstTrhkSkTntosh = this.state.trhkSkTntoshLst

        const { trhkSkKishId, trhkSkKishNo, trhkSkKishNm, trhkSkKishNmKn, trhkSkKishTelNo, trhkSkKishZipNo, trhkSkKishAddress } = this.state

        const params = {
            tenant: "123",// TODO: 
            trhkSkKishId,
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
        const res = (opType === BUTTON_OPERATION_TYPE__UPDATE)
            ? await FetchUtils.put2FdApi(`${API_TRHKSK_MST_DETAIL}`, trhkSkKishId, params)
            : await FetchUtils.post2FdApi(`${API_TRHKSK_MST_DETAIL}`, params)

        console.log(res)

        if (res.success) {
            showAlertMsg(SUCCESS_MSG__HZN)
        }
        else {
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }

    }

    trhkSkTntoshLstTableCreator(items) {

        this.itemDef4TntoshLst[0].items = items || []

        return this.itemDef4TntoshLst
    }

    onTntoshDeleteClick(event){
        const rowId = this.getRowIdByBindParam(event)

        const trhkSkTntoshLst = (this.state.trhkSkTntoshLst || []).filter((v, i)=> rowId !== i)

        let selectedTntoshInf = {
            trhkSkTntoshId: "",
            trhkSkTntoshMail: "",
            trhkSkTntoshNm: "",
            trhkSkTntoshNmKn: "",
            trhkSkTntoshTelNo: "",
        }

        this.setState({ trhkSkTntoshLst, ...selectedTntoshInf})
    }

    onTrhkSkTntoshCheckChange(event){
        const elTgt = event.target

        // TODO: 是非にリストと編集の部分は共通化したい..................................................

        const idx = this.getRowIdByBindParam(event)

        const checked = elTgt.checked

        let selectedTntoshInf = {
            trhkSkTntoshId: "",
            trhkSkTntoshMail: "",
            trhkSkTntoshNm: "",
            trhkSkTntoshNmKn: "",
            trhkSkTntoshTelNo: "",
        }

        const trhkSkTntoshLst = this.state.trhkSkTntoshLst
            .map((v, i)=> {
                const nextVal = idx === i ? checked : false

                if((idx === i) && checked){
                    selectedTntoshInf = { ...this.state.trhkSkTntoshLst[i] }
                }

                $(`#trhkSkTntoshCheck-${i}`).prop("checked", nextVal)

                return {
                    ...v,
                    trhkSkTntoshCheck: nextVal
                }
            })

        this.setState({
            trhkSkTntoshLst,
            selectedTntoshIndex: checked ? idx : null,
            ...selectedTntoshInf
        })
        
    }

    clearSelectedTntosh(){
        const selectedTntoshInf = {
            trhkSkTntoshId: "",
            trhkSkTntoshMail: "",
            trhkSkTntoshNm: "",
            trhkSkTntoshNmKn: "",
            trhkSkTntoshTelNo: "",
        }

        $(".tntosh-lst-table input[type=checkbox]").prop("checked", false)

        this.setState({ ...selectedTntoshInf, selectedTntoshIndex: null })

    }

    getRowObjByBindParam(event){
        const rowId = this.getRowIdByBindParam(event)

        return this.getRowObjByIndex(rowId)
    }

    getRowIdByBindParam(event){
        if(!event || !event.target) return -1

        const tgtEl = event.target.closest(".tntosh-lst-table td[rowindex]")
        const rowId = !!tgtEl ? tgtEl.getAttribute("rowindex") : "-1"

        return Number(rowId)
    }

    getRowObjByIndex(index){
        const rowObj = _.get(this.itemDef4TntoshLst, `[0].items[${index}]`, {})

        return rowObj
    }

    onAddTntoshClick(){
        const tntoshLst = Object.assign([], this.state.trhkSkTntoshLst)

        tntoshLst.push({
            trhkSkTntoshNm: this.state.trhkSkTntoshNm,
			trhkSkTntoshNmKn: this.state.trhkSkTntoshNmKn,
			trhkSkTntoshMail: this.state.trhkSkTntoshMail,
			trhkSkTntoshTelNo: this.state.ttrhkSkTtoshTelNo,
        })

        this.setState({
            trhkSkTntoshLst: tntoshLst
        })

        this.clearSelectedTntosh()
    }

    onUpdateTntoshClick(){
        const selectedTntoshIndex = this.state.selectedTntoshIndex

        const tntoshLst = this.state.trhkSkTntoshLst
            .map((v, i)=> {
                return i === selectedTntoshIndex
                    ? {
                        ...v,
                        trhkSkTntoshNm: this.state.trhkSkTntoshNm,
                        trhkSkTntoshNmKn: this.state.trhkSkTntoshNmKn,
                        trhkSkTntoshMail: this.state.trhkSkTntoshMail,
                        trhkSkTntoshTelNo: this.state.trhkSkTntoshTelNo,
                    }
                    : v
            })

        this.setState({
            trhkSkTntoshLst: tntoshLst
        })

        this.clearSelectedTntosh()
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
                    isEmpty(this.state.selectedTntoshIndex)
                        ? (<CommonButton onChange={this.onAddTntoshClick} color="primary" label="追加" />)
                        : (<CommonButton onChange={this.onUpdateTntoshClick} color="primary" label="更新" />)
                }

                {
                    this.trhkSkTntoshLstTableCreator(this.state.trhkSkTntoshLst).map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>

                <Grid item xs={12} className="footer-butons">
                    <HznButton text="保存" onClick={this.onHznClickWrap()} />
                </Grid>
                
            </div>
        )
    }

}
