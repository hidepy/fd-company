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
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import Paper from '@material-ui/core/Paper'
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import {
    showAlertMsg,
    onTextChange,
    onDateChange,
    onSelectChange,
    onRadioChange,
    convCamelKeyObj2SnakeKeyObj,
    showErrMsg,
    checkFormInputs,
    convServerDatetimeStr2ClientDateObj,
    getModalStyle,
    isEmpty,
} from "../../utils/CommonUtils"
import {
    getItemDef4PageHeader,
    getItemDef4IrishContents,
    getItemDef4NmtContents,
    getItemDef4NtjContents,
    getItemDef4HisoJknContents,
    getMtmtIriAllContents,
    mtmrIriStates,
    getSisnMtmrIri,
    getMtmrSendParameter
} from "../../utils/MtmrIriUtils"
import {
    INPUT_AREA_TITLE_ARR, ANKN_STS_CD__MTMR_TORK_SM, ANKN_STS_CD__MTMR_MI_TORK
} from "../../constants/MtmrIri"
import { BUTTON_OPERATION_TYPE__ENTRY, BUTTON_OPERATION_TYPE__UPDATE } from '../../constants/common';
import { API_MTMR_DETAIL } from '../../constants/apiPath';
import FetchUtils from '../../utils/FetchUtils';
import _ from "lodash"
import { SUCCESS_MSG__HZN, ERR_MSG__FETCH, ERR_MSG__HZN, MSG__OM0103_TORKGO_POPUP } from '../../constants/message';
import TrhkskMstPopup from '../fd-commons/TrhkskMstPopup';

export default class OM0103 extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        anknId: PropTypes.string, // 前画面からあ渡された案件ID
        openAsUpd: PropTypes.bool, // 本画面の起動方式 更新参照画面として開く場合はtrue
    }

    constructor(props) {

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
            isTorkgoPopupShown: false,
            responseAnknId: "",

            ...mtmrIriStates
        }

        this.onTrhkskSelectCallback = this.onTrhkskSelectCallback.bind(this)
        this.onTorkgoPopupCloseClick = this.onTorkgoPopupCloseClick.bind(this)
        this.updatePageState = this.updatePageState.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.onUpdClick = this.onUpdClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onDateChange = onDateChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.TODO_YOU_DEFINE_SOMETHING = function () { } // TODO: 

        this.itemDef4PageHeader = getItemDef4PageHeader(this)

        this.itemDef4IrishContents = getItemDef4IrishContents(this)

        this.itemDef4NmtContents = getItemDef4NmtContents(this)

        this.itemDef4NtjContents = getItemDef4NtjContents(this)

        this.itemDef4HisoJknContents = getItemDef4HisoJknContents(this)

    }

    async componentDidMount() {

        // デフォルト値設定

        if (this.props.openAsUpd) {

            const anknId = this.props.anknId

            console.log(anknId)

            // APIコール
            const res = await FetchUtils.getFromFdApi(`${API_MTMR_DETAIL}/${anknId}`)

            console.log(res)

            if (res.success) {
                const anknData = _.get(res, "data", {})

                //const trhkskKishData = _.get(anknData, "trhkSkKish", {})

                const mtmrMisiData = getSisnMtmrIri(_.get(anknData, "trnAnknMisi"))
                const shukKiboNtj = convServerDatetimeStr2ClientDateObj(mtmrMisiData.shukKiboNtj)
                const hisoKiboNtj = convServerDatetimeStr2ClientDateObj(mtmrMisiData.hisoKiboNtj)

                this.setState({
                    //...trhkskKishData,
                    ...anknData,
                    ...mtmrMisiData,
                    shukKiboNtj,
                    hisoKiboNtj
                }, () => console.log(this.state))
            }
            else {
                showErrMsg(ERR_MSG__FETCH)
            }

        }
        else {
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
     * 取引先マスタ選択時のコールバック
     * @param {*} trhkskItem 
     */
    onTrhkskSelectCallback(trhkskItem){
        this.setState({
            trhkSkKishId: trhkskItem.trhkSkKishId,
            trhkSkKishNo: trhkskItem.trhkSkKishNo,
            trhkSkKishNm: trhkskItem.trhkSkKishNm,
            trhkSkKishNmKn: trhkskItem.trhkSkKishNmKn,
            trhkSkKishZipNo: trhkskItem.trhkSkKishZipNo,
            trhkSkKishAddress: trhkskItem.trhkSkKishAddress,
        })
    }

    /**
     * 登録後ポップアップクローズハンドラ
     */
    onTorkgoPopupCloseClick(){
        this.setState({
            isTorkgoPopupShown: false,
        })
    }

    /**
     * 保存ボタン押下時処理
     * @param {*} opType 保存ボタン押下種別(デフォルトは新規)
     */
    async onHznClick(opType = BUTTON_OPERATION_TYPE__UPDATE) {

        // 共通ロジックを使用して送信パラメータを生成
        const params = getMtmrSendParameter(this.state, ANKN_STS_CD__MTMR_MI_TORK)

        console.log(params)

        const res = (opType === BUTTON_OPERATION_TYPE__UPDATE)
            ? await FetchUtils.put2FdApi(`${API_MTMR_DETAIL}`, this.props.anknId, params)
            : await FetchUtils.post2FdApi(`${API_MTMR_DETAIL}`, params)

        console.log(res)

        if (res.success) {
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
     * 更新ボタン押下時処理
     */
    onUpdClick() {
        this.onHznClick(BUTTON_OPERATION_TYPE__UPDATE)
    }

    /**
     * ページ状態によって表示するコンテンツを制御
     * @param {object} state 
     */
    getPageByState(this_state) {

        const pageState = this_state.pageState

        switch (pageState) {
            case this.PAGE_STATE_DEF.IRISH_PAGE:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4IrishContents.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.NMT_PAGE:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4NmtContents.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.NTJ_BSH:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4NtjContents.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.HISO_JOKN:
                return (
                    <Paper className="page-contents-wrapper">
                        {
                            this.itemDef4HisoJknContents.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                        }
                    </Paper>
                )

            case this.PAGE_STATE_DEF.CONFIRM_PAGE:
                return getMtmtIriAllContents(this, true)

            case this.PAGE_STATE_DEF.UPD_ALL_PAGE:
                return getMtmtIriAllContents(this)
        }
    }

    getInpageTitle(state) {
        return (
            <Typography variant="h6" gutterBottom>
                {
                    this.PAGE_STATE_TITLE_ARR[Number(state)]
                }
            </Typography>
        )
    }



    /**
     * ページ内遷移時共通ロジック
     * @param {*} pageDefArr 
     * @param {*} successCallback 
     */
    pageSwitchCommonFlow(pageDefArr, successCallback) {

        return () => {
            // formエラーチェック
            const msg = checkFormInputs(this.state, pageDefArr)

            // 問題なしで後続の処理実施
            if (!msg) successCallback()
            else showErrMsg(msg)
        }
    }


    /**
     * フッタボタン(戻る/次へ/確定)押下時のページ制御処理
     * @param {*} state 
     */
    getFooterButtonByState(state) {
        switch (state) {
            case this.PAGE_STATE_DEF.IRISH_PAGE:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.pageSwitchCommonFlow(this.itemDef4IrishContents, this.updatePageState(this.PAGE_STATE_DEF.NMT_PAGE))}
                    >
                        次へ
                    </Button>
                )
            case this.PAGE_STATE_DEF.NMT_PAGE:
                return (
                    <React.Fragment>
                        <Button
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.IRISH_PAGE)}
                        >
                            戻る
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.pageSwitchCommonFlow(this.itemDef4NmtContents, this.updatePageState(this.PAGE_STATE_DEF.NTJ_BSH))}
                        >
                            次へ
                        </Button>
                    </React.Fragment>
                )
            case this.PAGE_STATE_DEF.NTJ_BSH:
                return (
                    <React.Fragment>
                        <Button
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.NMT_PAGE)}
                        >
                            戻る
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.pageSwitchCommonFlow(this.itemDef4NtjContents, this.updatePageState(this.PAGE_STATE_DEF.HISO_JOKN))}
                        >
                            次へ
                        </Button>
                    </React.Fragment>

                )
            case this.PAGE_STATE_DEF.HISO_JOKN:
                return (
                    <React.Fragment>
                        <Button
                            onClick={this.updatePageState(this.PAGE_STATE_DEF.NTJ_BSH)}
                        >
                            戻る
                            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.pageSwitchCommonFlow(this.itemDef4HisoJknContents, this.updatePageState(this.PAGE_STATE_DEF.CONFIRM_PAGE))}
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
                    <div style={{ textAlign: "center" }}>
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
    updatePageState(state) {
        return () => {

            document.getElementsByTagName("main")[0].scrollTo(0, 0)

            this.setState({
                pageState: state
            })
        }
    }

    render() {

        return (
            <div className="OM0103-wrapper inner-wrapper" style={this.props.style}>
                <Paper className="page-header-wrapper">

                    <Typography variant="h5" gutterBottom>
                        見積依頼の登録
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

                    {this.props.anknId}

                    <React.Fragment>

                        {
                            this.getInpageTitle(this.state.pageState)
                        }

                        {
                            this.itemDef4PageHeader.map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }

                        {
                            // ページの状態によって表示コンテンツを制御
                            this.getPageByState(this.state)
                        }

                        <div style={{ textAlign: "right" }}>
                            {
                                this.getFooterButtonByState(this.state.pageState)
                            }
                        </div>

                    </React.Fragment>
                </Paper>

                <Modal
                    open={this.state.isTorkgoPopupShown}
                    onClose={this.onTorkgoPopupCloseClick}
                >
                    {
                        <div style={{...getModalStyle(), height: "auto"}} className="contents-wrap">

                            <div className="inner-popup" style={{backgroundColor: "#fff", margin: "64px;"}}>
                                <p style={{padding: "32px", fontWeight: "bold"}}>
                                    { MSG__OM0103_TORKGO_POPUP }
                                </p>
                                
                                <Button variant="contained" style={{margin: "16px"}} onClick={(()=> {this.props.history.goBack()}).bind(this)}>一覧へ戻る</Button>

                                <Button variant="contained" style={{margin: "16px"}} onClick={(()=> {this.props.history.push(`${process.env.PUBLIC_URL}/OM0105`, {anknId: this.state.responseAnknId})}).bind(this)}>見積回答を作成</Button>
                            </div>

                        </div>

                    }
                </Modal>

            </div>
        )
    }

}
