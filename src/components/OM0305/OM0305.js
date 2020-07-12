
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
    BREAK_LINE
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
    showErrMsg,
} from "../../utils/CommonUtils"
import LinkButton from '../commons/LinkButton'
import CommonIconButton from '../commons/CommonIconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import _ from "lodash"
import { API_TRHKSK_MST } from '../../constants/apiPath'
import FetchUtils from '../../utils/FetchUtils'
import { ERR_MSG__FETCH } from '../../constants/message'

export default class OM0305 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
            trhkSkLst: [],
            kishNo: "",
            kishNm: "",
            kishNmKn: "",
        }

        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.searchTrhkskLst = this.searchTrhkskLst.bind(this)
        this.onTrhkskEditClick = this.onTrhkskEditClick.bind(this)
        this.onMove2TrhkskMstClick = this.onMove2TrhkskMstClick.bind(this)

        this.itemDef4SearchCond = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "kishNo", label: "会社コード", onChange: this.onTextChange("kishNo")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "kishNm", label: "会社名", onChange: this.onTextChange("kishNm")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "kishNmKn", label: "会社名(カナ)", onChange: this.onTextChange("kishNmKn")},
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "searchButton", label: "検索", onChange: this.searchTrhkskLst, color: "primary"},
            { type: INPUT_FIELD_TYPE_BUTTON, id: "createButton", label: "新規作成", onChange: this.onMove2TrhkskMstClick, color: "primary"}
        ]

        this.itemDef4SearchedList = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "trhkSkLst", label: "取引先一覧",
            headerDef: [
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNo", label: "取引先コード"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "取引先会社名", onChange: this.onTextChange("trhkSkKishNm")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishZipNo", label: "郵便番号", onChange: this.onTextChange("trhkSkKishZipNo")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishAddress", label: "住所", onChange: this.onTextChange("trhkSkKishAddress")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishTelNo", label: "電話番号", onChange: this.onTextChange("trhkSkKishTelNo")},
                { customComponent: (
                    <div className="trhksk-actions-col">
                        <LinkButton label="修正" onChange={this.onTrhkskEditClick} color="primary" />
                        <CommonIconButton icon={(<DeleteIcon />)} onChange={this.onTrhkskDeleteClick} />
                    </div>
                    ),
                    bindparam: "table-custom-component-col"
                }
            ],
            items: []
        }]
    }

    componentDidMount(){
        this.searchTrhkskLst()
    }

    async searchTrhkskLst(){
        const params = {}

        if(this.state.kishNo) params["trhkSkKishNoStartswith"] = this.state.kishNo
        if(this.state.kishNm) params["trhkSkKishNmStartswith"] = this.state.kishNm
        if(this.state.kishNmKn) params["trhkSkKishNmKnStartswith"] = this.state.kishNmKn

        const res = await FetchUtils.getFromFdApi(API_TRHKSK_MST, params)

        // fetch successなら
        if(res.success){
            // plainizeした値をセット
            this.setState({
                 trhkSkLst: res.data
            })
        }
        else{
            showErrMsg(ERR_MSG__FETCH)
        }

    }

    onTrhkskEditClick(event) {
        const rowObj = this.getRowObjByBindParam(event)

        const trhkSkKishId = rowObj.trhkSkKishId
        // this.props.history.push(`${process.env.PUBLIC_URL}/OM0301`, { trhkSkKishId })
        this.onMove2TrhkskMstClick({ trhkSkKishId })
    }

    onMove2TrhkskMstClick({trhkSkKishId}){
        this.props.history.push(`${process.env.PUBLIC_URL}/OM0301`, { trhkSkKishId })
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

    trhkSkLstTableCreator(items) {

        this.itemDef4SearchedList[0].items = items || []

        return this.itemDef4SearchedList
    }

    render(){

        return (
            <div className="OM0305-wrapper inner-wrapper">
                <Paper className="input-items-wrapper">
                {
                    this.itemDef4SearchCond.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>

                <Paper className="input-items-wrapper">
                {
                    this.trhkSkLstTableCreator(this.state.trhkSkLst).map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>
                
            </div>
        )
    }

}
