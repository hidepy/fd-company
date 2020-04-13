import React from 'react'
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import { getModalStyle } from "../../utils/CommonUtils"
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
import { API_MTMR_LIST } from '../../constants/apiPath';

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import OM0103 from "../OM0103"

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

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.onPopupOpenClick = this.onPopupOpenClick.bind(this)
        this.onPopupCloseClick = this.onPopupCloseClick.bind(this)
        this.TODO_YOU_DEFINE_SOMETHING = function () { } // TODO: 

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
            { type: INPUT_FIELD_TYPE_BUTTON, id: "knskBtn", label: "検索ボタン", onChange: this.searchMtmrLst },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrIriTork", label: "見積依頼の登録", onChange: this.TODO_YOU_DEFINE_SOMETHING },
        ]

        const _onMtmrNoClick = this.onMtmrNoClick.bind(this)

        this.itemDef4SearchedList = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "mtmrLst", label: "見積一覧",
            headerDef: [
                { type: OUTPUT_FIELD_TYPE_LINK, id: "anknMisiId", label: "見積・受注No.", onChange: function(){ _onMtmrNoClick(this.value) }, style: { width: "100px" } },
                { type: INPUT_FIELD_TYPE_TEXT, id: "anknStsCd", label: "ステータス", onChange: this.onTextChange("anknStsCd") },
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "会社名", onChange: this.onTextChange("trhkSkKishNm") },
                { type: INPUT_FIELD_TYPE_TEXT, id: "shukKiboNtj", label: "集荷希望日時", onChange: this.onTextChange("shukKiboNtj") },
                { type: INPUT_FIELD_TYPE_TEXT, id: "shukskNm", label: "集荷先名", onChange: this.onTextChange("shukskNm") },
                { type: INPUT_FIELD_TYPE_TEXT, id: "hisoKiboNtj", label: "配送希望日時", onChange: this.onTextChange("hisoKiboNtj") },
                { type: INPUT_FIELD_TYPE_TEXT, id: "hisoskNm", label: "配送先名", onChange: this.onTextChange("hisoskNm") },
                { type: INPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "金額", onChange: this.onTextChange("gokeKngk") },
                { type: INPUT_FIELD_TYPE_ICON_LINK, icon: (<GetAppIcon />), id: "seikyushoDL", label: "請求書DL", onChange: this.mytest, color: "primary" },
                { type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "mtmrIriShsi", label: "修正", onChange: this.onMtmrIriShsiClick, color: "primary" },
                { type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "mtmrKito", label: "見積回答", onChange: this.onMtmrKitoClick, color: "primary" },
                { type: INPUT_FIELD_TYPE_ICON_LINK, icon: (<DeleteIcon />), id: "skj", label: "", onChange: this.onSkjClick, color: "primary" },
                { type: INPUT_FIELD_TYPE_ICON_LINK, icon: (<GetAppIcon />), id: "chohyoDl", label: "", onChange: this.onChohyoDlClick, color: "primary" },
            ],
            items: []
        }]
    }

    mytest(event) {
        console.log(event, this)
    }

    onMtmrNoClick(mtmrNo){
        this.setState({
            selectedMtmrMisiId: mtmrNo,
            isMtmrDetailPopupShown: true,
        })
    }

    onMtmrIriShsiClick(event) {
        console.log(event, this)
    }

    onMtmrKitoClick(event) {
        console.log(event, this)
    }

    onSkjClick(event) {
        console.log(event, this)
    }

    onChohyoDlClick(event) {
        console.log(event, this)
    }

    componentDidMount() {
        this.searchMtmrLst()
    }

    async searchMtmrLst() {

        const res = await FetchUtils.getFromFdApi(API_MTMR_LIST)
        console.log(res)
        this.setState({
            mtmrList: res || []
        })
    }


    onHznClick() {

        // TODO: 

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
                            見積一覧
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
                                mtmrMisiId={this.state.selectedMtmrMisiId}
                                style={{ height: "100%", overflowY: "scroll", padding: "8px", backgroundColor: "#fff" }}
                            />

                        </div>

                    }
                </Modal>

            </div>
        )
    }

}
