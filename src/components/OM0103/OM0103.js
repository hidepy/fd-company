
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
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
} from "../../utils/CommonUtils"
import {
    getItemDef4PageHeader,
    getItemDef4IrishContents,
    getItemDef4NmtContents,
    getItemDef4NtjContents,
    getItemDef4HisoJknContents,
    getMtmtIriAllContents
} from "../../utils/MtmrIriUtils"
import {
    INPUT_AREA_TITLE_ARR
} from "../../constants/MtmrIri"

import FetchUtils from '../../utils/FetchUtils'
import { API_MTMR_LIST } from '../../constants/apiPath';

export default class OM0103 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)


        this.PAGE_STATE_DEF = {
            IRISH_PAGE: "0",
            NMT_PAGE: "1",
            NTJ_BSH: "2",
            HISO_JOKN: "3",
            CONFIRM_PAGE: "4",
        }

        this.PAGE_STATE_TITLE_ARR = [...INPUT_AREA_TITLE_ARR, "確認"]

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

        this.itemDef4PageHeader = getItemDef4PageHeader(this)

        this.itemDef4IrishContents = getItemDef4IrishContents(this)

        this.itemDef4NmtContents = getItemDef4NmtContents(this)

        this.itemDef4NtjContents = getItemDef4NtjContents(this)

        this.itemDef4HisoJknContents = getItemDef4HisoJknContents(this)


    }

    componentDidMount(){

        // TODO: 参照画面として開かれた場合のみ下記を実行。そうでない場合は、APIから取得したものをまま表示

        this.setState({
            knsiKh: "0",
            tmksnKh: "0",
            nioiUm: "1",
            kknbtInk: "1",
            tmkmYh: "1",
            trorsYh: "1",
            tnirYh: "1",
            lblHrYh: "1",
            ykmtYh: "1",
            ttmtYh: "1",
            hisgyoYh: "1",
        })

    }

    onHznClick(){

        // TODO: 
        
        alert("保存しました")

    }

    /**
     * ページ状態によって表示するコンテンツを制御
     * @param {object} state 
     */
    getPageByState(this_state){

        const pageState = this_state.pageState

        switch(pageState){
            case this.PAGE_STATE_DEF.IRISH_PAGE:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4IrishContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )  

            case this.PAGE_STATE_DEF.NMT_PAGE:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4NmtContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.NTJ_BSH:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4NtjContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )

                case this.PAGE_STATE_DEF.HISO_JOKN:
                    return (
                        <Paper className="page-contents-wrapper">
                            {
                                this.itemDef4HisoJknContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                            }
                        </Paper>
                    )

            case this.PAGE_STATE_DEF.CONFIRM_PAGE:
                return getMtmtIriAllContents(this, true)
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
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.NTJ_BSH)}
                        >
                            次へ
                        </Button>
                    </React.Fragment>
                )
            case this.PAGE_STATE_DEF.NTJ_BSH:
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
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.HISO_JOKN)}
                        >
                            次へ
                        </Button>
                    </React.Fragment>

                )
                case this.PAGE_STATE_DEF.HISO_JOKN:
                    return(
                        <React.Fragment>
                            <Button
                                onClick={this.updatePageState(this.PAGE_STATE_DEF.NTJ_BSH)}
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
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.HISO_JOKN)}
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
                            見積登録
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
                            this.getPageByState(this.state)
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
