
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
    convCamelKeyObj2SnakeKeyObj,
    showErrMsg,
} from "../../utils/CommonUtils"
import {
    getItemDef4PageHeader,
    getItemDef4IrishContents,
    getItemDef4NmtContents,
    getItemDef4NtjContents,
    getItemDef4HisoJknContents,
    getMtmtIriAllContents,
    mtmrIriStates,
    getSisnMtmrIri
} from "../../utils/MtmrIriUtils"
import {
    INPUT_AREA_TITLE_ARR
} from "../../constants/MtmrIri"
import { BUTTON_OPERATION_TYPE__ENTRY, BUTTON_OPERATION_TYPE__UPDATE } from '../../constants/common';
import { API_MTMR_DETAIL } from '../../constants/apiPath';
import FetchUtils from '../../utils/FetchUtils';
import _ from "lodash"
import { SUCCESS_MSG__HZN, ERR_MSG__FETCH, ERR_MSG__HZN } from '../../constants/message';

export default class OM0103 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        ankenId: PropTypes.string, // 前画面からあ渡された案件ID
        openAsUpd: PropTypes.bool, // 本画面の起動方式 更新参照画面として開く場合はtrue
    }

    constructor(props){

        super(props)

        this.PAGE_STATE_DEF = {
            IRISH_PAGE: "0",
            NMT_PAGE: "1",
            NTJ_BSH: "2",
            HISO_JOKN: "3",
            CONFIRM_PAGE: "4",
            UPD_ALL_PAGE: "9", // 他画面から呼び出しの場合
        }

        this.PAGE_STATE_TITLE_ARR = [...INPUT_AREA_TITLE_ARR, "確認"]

        this.state = {
            // pageStateは, 新規 or 更新の場合で変わる
            pageState: this.props.openAsUpd ? this.PAGE_STATE_DEF.UPD_ALL_PAGE : this.PAGE_STATE_DEF.IRISH_PAGE,

            ...mtmrIriStates

			// dataTrkm: "",
			// onsiInput: "",
			// mailTrkm: "",
			// fileTrkm: "",
			// kishCd: "",
			// kishNm: "",
			// kishNmKn: "",
			// yubnNo: "",
			// address: "",
			// tntoshNm: "",
			// tntoshNmKn: "",
			// telNo: "",
			// mail: "",
			// next: "",
			// nmtType: "",
			// nmtNm: "",
			// unitload: "",
			// nisgtKonpoKeti: "",
			// nisgtSnt: "",
			// snpoUnitloadNsgt: "",
			// juryoUnitloadNsgt: "",
			// kosuUnitloadNsgt: "",
			// shukKiboDatetime: "",
			// shukSk: "",
			// shukSkNm: "",
			// hisoKiboDatetime: "",
			// hisoSk: "",
			// hisoSkNm: "",
			// knsiKh: "",
			// tmksnKh: "",
			// noiUm: "",
			// kknbtInk: "",
			// tmkmKh: "",
			// tnorsYh: "",
			// tnirYh: "",
			// lblHrYh: "",
			// ykmtYh: "",
			// ttmtYh: "",
			// hiSgyoYh: "",
			// sntJokn: "",
			// kiboKngk: "",
			// confirm: "",
			// edit: "",
			// entry: "",
        }


        console.log(mtmrIriStates)
        console.log(convCamelKeyObj2SnakeKeyObj(mtmrIriStates))


        this.updatePageState = this.updatePageState.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.onUpdClick = this.onUpdClick.bind(this)
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

    async componentDidMount(){

        // デフォルト値設定

        if(this.props.openAsUpd){

            const ankenId = this.props.ankenId

            console.log(ankenId)

            // APIコール
            const res = await FetchUtils.getFromFdApi(`${API_MTMR_DETAIL}/${ankenId}`)
            
            console.log(res)

            if(res.success){
                const anknData = _.get(res, "data", {})

                //const trhkskKishData = _.get(anknData, "trhkSkKish", {})

                const mtmrMisiData = getSisnMtmrIri(_.get(anknData, "trnAnknMisi"))

                this.setState({
                    //...trhkskKishData,
                    ...anknData,
                    ...mtmrMisiData
                })
            }
            else{
                showErrMsg(ERR_MSG__FETCH)
            }

        }
        else{
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

    }

    /**
     * 保存ボタン押下時処理
     * @param {*} opType 保存ボタン押下種別(デフォルトは新規)
     */
    async onHznClick(opType = BUTTON_OPERATION_TYPE__UPDATE){

        // 送信パラメータ全体
        const params = {}

        // パラメータ明細
        const paramsMisi = Object.keys(mtmrIriStates).reduce((p, key)=> {
            return {
                ...p,
                [key]: this.state[key]
            }
        }, {})

        // const paramsKish = {}
        // paramsKish["trhkSkKishNm"] = this.state.trhkSkKishNm || "hogehoge"
        // paramsKish["trhkSkKishNmKn"] = this.state.trhkSkKishNmKn || "hogehoge"
        

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
        // params["ankn_sts_cd"] = "001"

        // // TODO: 依頼元入力種別を固定で「001」セット
        // params["irimt_input_type_cd"] = "001"
        
        // // TODO: 案件番号を一旦テキトーに値セット
        // params["ankn_no"] = "ankenno000"

        params["trhkSkKishId"] = this.state.trhkSkKishId
        params["trhkSkKishNm"] = this.state.trhkSkKishNm
        params["trhkSkKishNmKn"] = this.state.trhkSkKishNmKn

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

        const res = (opType === BUTTON_OPERATION_TYPE__UPDATE)
            ? await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}`, this.props.ankenId, params)
                : await FetchUtils.post2FdApi(`${API_MTMR_DETAIL}`, params)


        // // UPDATEの場合は更新としてPUT
        // if(opType === BUTTON_OPERATION_TYPE__UPDATE){
        //     console.log("更新")

        //     const res = await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}hogehoge`, this.props.ankenId, params)

        //     console.log(res)


        // }
        // // それ以外は新規登録
        // else{
        //     console.log("新規登録")

        //     const res = await FetchUtils.post2FdApi(`${API_MTMR_DETAIL}`, params)

        //     console.log(res)
        // }
        
        console.log(res)

        if(res.success){
            showAlertMsg(SUCCESS_MSG__HZN)
        }
        else{
            showErrMsg(ERR_MSG__HZN + "\n" + JSON.stringify(_.get(res, "data", {})))
        }

        
        

    }

    /**
     * 更新ボタン押下時処理
     */
    onUpdClick(){
        this.onHznClick(BUTTON_OPERATION_TYPE__UPDATE)
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

            case this.PAGE_STATE_DEF.UPD_ALL_PAGE:
                return getMtmtIriAllContents(this)
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

            case this.PAGE_STATE_DEF.UPD_ALL_PAGE:
                return (
                    <div style={{textAlign: "center"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onUpdClick}
                        >
                            修正
                        </Button>
                    </div>
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
            <div className="OM0103-wrapper inner-wrapper" style={this.props.style}>
                <Paper className="page-header-wrapper">

                    <Typography variant="h5" gutterBottom>
                            見積登録
                    </Typography>

                    {
                        this.state.pageState !== this.PAGE_STATE_DEF.UPD_ALL_PAGE
                            && (
                                <Stepper activeStep={Number(this.state.pageState)}>
                                    {
                                        this.PAGE_STATE_TITLE_ARR.map(label => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                            )
                    }

                    { this.props.ankenId }

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
