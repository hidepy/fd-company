
import React from 'react'
import PropTypes from "prop-types"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

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
    BREAK_LINE
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
} from "../../utils/CommonUtils"
import FetchUtils from '../../utils/FetchUtils'
import { API_TGT_ROLES } from '../../constants/HttpRequest'

export default class OM0101 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)


        this.PAGE_STATE_DEF = {
            IRISH_PAGE: "0",
            NMT_PAGE: "1",
            NTJ_BSH_HISO_JOKN: "2",
            CONFIRM_PAGE: "3",
        }

        this.PAGE_STATE_TITLE_ARR = ["依頼者の入力", "荷物の入力", "日時/場所/配送条件", "確認"]

        this.state = {
            pageState: this.PAGE_STATE_DEF.IRISH_PAGE,

			dataTrkm: "",
			onsiInput: "",
			mailTrkm: "",
			fileTrkm: "",
			kishCd: "",
			kishNm: "",
			kishNmKn: "",
			yubnNo: "",
			address: "",
			tntoshNm: "",
			tntoshNmKn: "",
			telNo: "",
			mail: "",
			next: "",
			nmtType: "",
			nmtNm: "",
			unitload: "",
			nisgtKonpoKeti: "",
			nisgtSnt: "",
			snpoUnitloadNsgt: "",
			juryoUnitloadNsgt: "",
			kosuUnitloadNsgt: "",
//			: "",
//			: "",
			shukKiboDatetime: "",
			shukSk: "",
			shukSkNm: "",
			hisoKiboDatetime: "",
			hisoSk: "",
			hisoSkNm: "",
			knsiKh: "",
			tmksnKh: "",
			noiUm: "",
			kknbtInk: "",
			tmkmKh: "",
			tnorsYh: "",
			tnirYh: "",
			lblHrYh: "",
			ykmtYh: "",
			ttmtYh: "",
			hiSgyoYh: "",
			sntJokn: "",
			kiboKngk: "",
//			: "",
			confirm: "",
			edit: "",
			entry: "",
        }

        this.updatePageState = this.updatePageState.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.TODO_YOU_DEFINE_SOMETHING = function(){} // TODO: 

        this.itemDef4PageHeader = [
            //{ type: INPUT_FIELD_TYPE_BUTTON, id: "dataTrkm", label: "データ取込", onChange: this.TODO_YOU_DEFINE_SOMETHING("dataTrkm") },
			// { type: INPUT_FIELD_TYPE_BUTTON, id: "onsiInput", label: "音声入力", onChange: this.TODO_YOU_DEFINE_SOMETHING("onsiInput") },
			// { type: INPUT_FIELD_TYPE_BUTTON, id: "mailTrkm", label: "メール取込", onChange: this.TODO_YOU_DEFINE_SOMETHING("mailTrkm") },
			// { type: INPUT_FIELD_TYPE_BUTTON, id: "fileTrkm", label: "ファイル（PDF・CSV）取込", onChange: this.TODO_YOU_DEFINE_SOMETHING("fileTrkm") },
        ]

        this.itemDef4IrishContents = [
			{ type: INPUT_FIELD_TYPE_TEXT, id: "kishCd", label: "会社コード", onChange: this.onTextChange("kishCd") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "kishNm", label: "会社名", onChange: this.onTextChange("kishNm") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "kishNmKn", label: "会社名（カナ）", onChange: this.onTextChange("kishNmKn") },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "yubnNo", label: "郵便番号", onChange: this.onTextChange("yubnNo") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "address", label: "所在地", onChange: this.onTextChange("address") },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "tntoshNm", label: "担当者名", onChange: this.onTextChange("tntoshNm") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshNmKn", label: "担当者名（カナ）", onChange: this.onTextChange("tntoshNmKn") },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "telNo", label: "電話番号", onChange: this.onTextChange("telNo") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "mail", label: "メール", onChange: this.onTextChange("mail") },
        ]

        this.itemDef4NmtContents = [
            { type: INPUT_FIELD_TYPE_RADIO, id: "nmtType", label: "荷物種別", onChange: this.onRadioChange("nmtType"),
                items: [
                    { value: "0", label: "種別0"},
                    { value: "1", label: "種別1"},
                ]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名", onChange: this.onTextChange("nmtNm") },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_RADIO, id: "unitload", label: "ユニットロード", onChange: this.onRadioChange("unitload"),
                items: [
                    { value: "0", label: "ユニットロード0"},
                    { value: "1", label: "ユニットロード1"},
                ]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_RADIO, id: "nisgtKonpoKeti", label: "荷姿（梱包形態）", onChange: this.onRadioChange("nisgtKonpoKeti"),
                items: [
                    { value: "0", label: "荷姿0"},
                    { value: "1", label: "荷姿1"},
                ]
            },
            { type: INPUT_FIELD_TYPE_TEXT, id: "nisgtSnt", label: "荷姿（その他）", onChange: this.onTextChange("nisgtSnt") },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "snpoUnitloadNsgt", label: "寸法（ユニットロード or 荷姿）", onChange: this.onTextChange("snpoUnitloadNsgt") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "juryoUnitloadNsgt", label: "重量（ユニットロード or 荷姿）", onChange: this.onTextChange("juryoUnitloadNsgt") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "kosuUnitloadNsgt", label: "個数（ユニットロード or 荷姿）", onChange: this.onTextChange("kosuUnitloadNsgt") },
        ]

        this.itemDef4NtjHisoJknContents = [
			{ type: INPUT_FIELD_TYPE_TEXT, id: "shukKiboDatetime", label: "集荷希望日時", onChange: this.onTextChange("shukKiboDatetime") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "shukSk", label: "集荷先", onChange: this.onTextChange("shukSk") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "shukSkNm", label: "集荷先名", onChange: this.onTextChange("shukSkNm") },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "hisoKiboDatetime", label: "配送希望日時", onChange: this.onTextChange("hisoKiboDatetime") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "hisoSk", label: "配送先", onChange: this.onTextChange("hisoSk") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "hisoSkNm", label: "配送先名", onChange: this.onTextChange("hisoSkNm") },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_RADIO, id: "knsiKh", label: "混載可否", onChange: this.onRadioChange("knsiKh"),
                items: [
                    { value: "0", label: "可" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "tmksnKh", label: "積み重ね可否", onChange: this.onRadioChange("tmksnKh"),
                items: [
                    { value: "0", label: "可" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "noiUm", label: "匂いの有無", onChange: this.onRadioChange("noiUm"),
                items: [
                    { value: "0", label: "有り" },
                    { value: "1", label: "無し" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "kknbtInk", label: "危険物", onChange: this.onRadioChange("kknbtInk"),
                items: [
                    { value: "0", label: "一般" },
                    { value: "1", label: "危険物" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "tmkmKh", label: "積込み要否", onChange: this.onRadioChange("tmkmKh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "tnorsYh", label: "取卸し要否", onChange: this.onRadioChange("tnorsYh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "tnirYh", label: "棚入れ要否", onChange: this.onRadioChange("tnirYh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "lblHrYh", label: "ラベル貼り要否", onChange: this.onRadioChange("lblHrYh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "ykmtYh", label: "横持ち要否", onChange: this.onRadioChange("ykmtYh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "ttmtYh", label: "縦持ち要否", onChange: this.onRadioChange("ttmtYh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "hiSgyoYh", label: "はい作業要否", onChange: this.onRadioChange("hiSgyoYh"),
                items: [
                    { value: "0", label: "要" },
                    { value: "1", label: "否" },
                ]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "sntJokn", label: "その他条件", onChange: this.onTextChange("sntJokn") },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "kiboKngk", label: "希望金額", onChange: this.onTextChange("kiboKngk") },
        ]
    }

    componentDidMount(){

        ;

    }

    onHznClick(){

        // TODO: 
        
        alert("保存しました")

    }

    /**
     * ページ状態によって表示するコンテンツを制御
     * @param {string} state 
     */
    getPageByState(state){
        switch(state){
            case this.PAGE_STATE_DEF.IRISH_PAGE:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4IrishContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Paper>
                )  

            case this.PAGE_STATE_DEF.NMT_PAGE:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4NmtContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.NTJ_BSH_HISO_JOKN:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4NtjHisoJknContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.CONFIRM_PAGE:
                return (
                    <React.Fragment>
                        <Paper className="page-contents-wrapper">
                            <Typography variant="h6">
                                {
                                    this.PAGE_STATE_TITLE_ARR[0]
                                }
                            </Typography>

                            {
                                this.itemDef4IrishContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                            }
                        </Paper>

                        <Paper className="page-contents-wrapper">
                            <Typography variant="h6">
                                {
                                    this.PAGE_STATE_TITLE_ARR[1]
                                }
                            </Typography>
                            {
                                this.itemDef4NmtContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                            }
                        </Paper>


                        <Paper className="page-contents-wrapper">
                            <Typography variant="h6">
                                {
                                    this.PAGE_STATE_TITLE_ARR[2]
                                }
                            </Typography>
                            {
                                this.itemDef4NtjHisoJknContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                            }
                        </Paper>
                    </React.Fragment>
                )
        }
    }

    getInpageTitle(state){
        return (
            <Typography variant="h6" gutterBottom>
                {
                    this.PAGE_STATE_TITLE_ARR[Number(state)]
                }
            </Typography>
        )
    }

    getFooterButtonByState(state){
        switch(state){
            case this.PAGE_STATE_DEF.IRISH_PAGE:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.updatePageState(this.PAGE_STATE_DEF.NMT_PAGE)}
                    >
                        次へ
                    </Button>
                )
            case this.PAGE_STATE_DEF.NMT_PAGE:
                return(
                    <React.Fragment>
                        <Button
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.IRISH_PAGE)}
                        >
                            戻る
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.NTJ_BSH_HISO_JOKN)}
                        >
                            次へ
                        </Button>
                    </React.Fragment>
                )
            case this.PAGE_STATE_DEF.NTJ_BSH_HISO_JOKN:
                return(
                    <React.Fragment>
                        <Button
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.NMT_PAGE)}
                        >
                            戻る
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.CONFIRM_PAGE)}
                        >
                            次へ
                        </Button>
                    </React.Fragment>

                )
            case this.PAGE_STATE_DEF.CONFIRM_PAGE:
                return (
                    <React.Fragment>
                        <Button
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.NTJ_BSH_HISO_JOKN)}
                        >
                            戻る
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onHznClick}
                        >
                            確定
                        </Button>
                    </React.Fragment>
                )
                
        }
    }

    /**
     * ページ状態を更新する
     * @param {string} state 
     */
    updatePageState(state){
        return ()=> {

            document.getElementsByTagName("main")[0].scrollTo(0, 0)
            
            this.setState({
                pageState: state
            })
        }
    }

    render(){


        return (
            <div className="OM0101-wrapper inner-wrapper">
                <Paper className="page-header-wrapper">

                    <Typography variant="h5" gutterBottom>
                            見積登録(XXX)
                    </Typography>

                    <Stepper activeStep={Number(this.state.pageState)}>
                        {
                            this.PAGE_STATE_TITLE_ARR.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>

                    <React.Fragment>

                        {
                            this.getInpageTitle(this.state.pageState)
                        }

                        {
                            this.itemDef4PageHeader.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }

                        {
                            // ページの状態によって表示コンテンツを制御
                            this.getPageByState(this.state.pageState)
                        }

                        <div style={{textAlign: "right"}}>
                        {
                            this.getFooterButtonByState(this.state.pageState)
                        }
                        </div>

                    </React.Fragment>
                </Paper>

                
            </div>
        )
    }

}
