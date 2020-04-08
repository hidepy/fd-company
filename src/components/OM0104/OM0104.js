import React from 'react'
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
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
    OUTPUT_FIELD_TYPE_TABLE
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
} from "../../utils/CommonUtils"
import _ from "lodash"
import FetchUtils from '../../utils/FetchUtils';
import { API_MTMR_LIST } from '../../constants/apiPath';

export default class OM0104 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
			stsSbrkm: "",
			ftreeTxtKnskRn: "",
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.openDetail = this.openDetail.bind(this)
        this.TODO_YOU_DEFINE_SOMETHING = function(){} // TODO: 

        this.itemDef4SearchCondition = [
            { type: INPUT_FIELD_TYPE_SELECT, id: "stsSbrkm", label: "ステータス絞り込み", onChange: this.onSelectChange("stsSbrkm"),
                items: [
                    { value: "0", label: "全て" },
                    { value: "1", label: "見積未登録"},
                    { value: "2", label: "見積登録済"},
                    { value: "3", label: "見積回答済"},
                    { value: "4", label: "発注済"},
                    { value: "5", label: "受注済"},
                ]
            },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "ftreeTxtKnskRn", label: "フリーテキスト検索欄", onChange: this.onTextChange("ftreeTxtKnskRn") },
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "knskBtn", label: "検索ボタン", onChange: this.props.searchMtmrList },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrIriTork", label: "見積依頼の登録", onChange: this.TODO_YOU_DEFINE_SOMETHING("mtmrIriTork") },
        ]

        this.itemDef4SearchedList = [{
                type: OUTPUT_FIELD_TYPE_TABLE, id: "mtmrLst", label: "見積一覧",
                    headerDef: [
                        { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmr_iri_cd", label: "見積・受注No.", onClick: this.openDetail },
                        { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrIriShsi", label: "見積依頼の修正", onChange: this.TODO_YOU_DEFINE_SOMETHING("mtmrIriShsi") },
                        { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrKito", label: "見積回答", onChange: this.TODO_YOU_DEFINE_SOMETHING("mtmrKito") },
                        { type: INPUT_FIELD_TYPE_BUTTON, id: "skj", label: "削除", onChange: this.TODO_YOU_DEFINE_SOMETHING("skj") },
                        { type: INPUT_FIELD_TYPE_BUTTON, id: "chohyoDl", label: "帳票DL", onChange: this.TODO_YOU_DEFINE_SOMETHING("chohyoDl") },
                        { type: INPUT_FIELD_TYPE_TEXT, id: "kitoSts", label: "ステータス", onChange: this.onTextChange("kitoSts") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "kishNm", label: "会社名", onChange: this.onTextChange("kishNm") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "nmt_sbt_cd", label: "荷物種別", onChange: this.onTextChange("nmtShbt") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "nmt_nm", label: "荷物名", onChange: this.onTextChange("nmtNm") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "nsgt_cd", label: "荷姿", onChange: this.onTextChange("nsgt") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "unitload_sbt_cd", label: "ユニットロード", onChange: this.onTextChange("unitload") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "shuk_kibo_datetime", label: "集荷希望日時", onChange: this.onTextChange("shukKiboDatetime") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "shukSkNm", label: "集荷先名", onChange: this.onTextChange("shukSkNm") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "hiso_kibo_datetime", label: "配送希望日時", onChange: this.onTextChange("hisoKiboDatetime") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "hiso_sk_nm", label: "配送先名", onChange: this.onTextChange("hisoSkNm") },
                        // { type: INPUT_FIELD_TYPE_TEXT, id: "kibo_kngk", label: "見積金額", onChange: this.onTextChange("mtmrKngk") },
                    ],
                    items: []
            }

        ]
    }


    componentDidMount(){
        this.searchMtmrLst()
    }

    async searchMtmrLst(){

        const res = await FetchUtils.getFromFdApi(API_MTMR_LIST)

console.log(res)

        //this.itemDef4SearchedList[0].items = items

        
        
    }


    onHznClick(){

		// TODO: 

    }

    openDetail(){

        // 

    }

    mtmrTableCreator(items){

        this.itemDef4SearchedList[0].items = items

        return this.itemDef4SearchedList

    }



    render(){

        return (
            <div className="OM0104-wrapper inner-wrapper">

                <Paper className="input-items-wrapper">
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            見積一覧
                        </Typography>

                        {
                            this.itemDef4SearchCondition.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }

                        {
                            this.mtmrTableCreator(_.get(this.props, "OM0104.mtmrList", [])).map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} />))
                        }
                    </React.Fragment>
                </Paper>

            </div>
        )
    }

}
