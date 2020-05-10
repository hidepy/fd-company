// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/05/09
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import React from 'react'
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import { getModalStyle, convNestedObjProp2Plain, convNestedArrProp2Plain, showErrMsg, showConfirmMsg } from "../../utils/CommonUtils"
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
import { API_ANKN, API_ANKN_L, API_TRHKSK_MST } from '../../constants/apiPath';

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import OM0103 from "../../containers/OM0103"
import { Button, TextField } from '@material-ui/core';
import CommonButton from '../commons/CommonButton';
import CommonIconButton from "../commons/CommonIconButton"
import LinkButton from '../commons/LinkButton';
import { ERR_MSG__FETCH, MSG__DELETE_CONFIRM, ERR_MSG__DELETE } from '../../constants/message';
import "./TrhkskMstPopup.scss"
import CommonTable from '../commons/CommonTable';

class TrhkskMstPopup extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isTrhkskMstPopupOpened: false,
            kishNo: "",
            kishNm: "",
            searchedKishList: []
        }

        this.onKishSelectClick = this.onKishSelectClick.bind(this)
        this.onTrhkskSearchClick = this.onTrhkskSearchClick.bind(this)
        this.onTrhkskMstPopupOpenClick = this.onTrhkskMstPopupOpenClick.bind(this)
        this.onTrhkskMstPopupCloseClick = this.onTrhkskMstPopupCloseClick.bind(this)

        this.onTextChange = onTextChange(this)

        this.kishListHeaderDef = [
            { type: INPUT_FIELD_TYPE_BUTTON, id: "trhkSkKishSelectButton", label: "選択", onChange: this.onKishSelectClick, style: { width: "120px" } },
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNo", label: "会社コード", style: { width: "120px" } },
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "会社名", style: { width: "120px" } },
        ]

    }

    onKishSelectClick(event){
        const el = _.get(event, "target", null)

        if(!el) return

        const rowindex = el.closest("[rowindex]").getAttribute("rowindex")

        const item = this.state.searchedKishList[rowindex]

        this.props.onSelectCallback(item)

        this.onTrhkskMstPopupCloseClick()
    }

    onTrhkskMstPopupOpenClick(){
        this.setState({
            isTrhkskMstPopupOpened: true
        })
    }

    onTrhkskMstPopupCloseClick(){
        this.setState({
            isTrhkskMstPopupOpened: false
        })
    }

    async onTrhkskSearchClick(){
        const params = {}

        if(this.state.kishNo) params["trhk_sk_kish_no"] = this.state.kishNo
        if(this.state.kishNm) params["trhk_sk_kish_nm"] = this.state.kishNm

        const res = await FetchUtils.getFromFdApi(API_TRHKSK_MST, params)

        this.setState({ searchedKishList: _.get(res, "data", []) })
    }

    render() {

        return (
            <div className="trhksk-mst-popup-wrapper inner-wrapper">

                <Button variant="contained" onClick={this.onTrhkskMstPopupOpenClick}>取引先検索</Button>

                <Modal
                    open={this.state.isTrhkskMstPopupOpened}
                    onClose={this.onTrhkskMstPopupCloseClick}
                >
                    {
                        <div style={{...getModalStyle(), height: "auto", maxHeight: "90vh", overflowY: "scroll"}} className="contents-wrap">

                            <div className="trhksk-mst-popup-inner">
                                <Paper>
                                    <TextField value={this.state.kishNo} label="取引先コード" onChange={this.onTextChange("kishNo")} />
                                    <TextField value={this.state.kishNm} label="取引先名" onChange={this.onTextChange("kishNm")} />

                                    <Button variant="contained" color="primary" onClick={this.onTrhkskSearchClick}>検索</Button>
                                    </Paper>

                                <Paper>
                                    <CommonTable
                                        headerDef={this.kishListHeaderDef}
                                        items={this.state.searchedKishList}
                                    />
                                </Paper>
                            </div>

                        </div>

                    }
                </Modal>

            </div>
        )
    }

}

TrhkskMstPopup.propTypes = {
    onSelectCallback: PropTypes.func.isRequired,
}

export default TrhkskMstPopup