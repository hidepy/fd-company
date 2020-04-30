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
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import DividerMargin from "../commons/DividerMargin"
import HznButton from "../commons/HznButton"

import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';

import FieldItem from "../commons/FieldItem"
import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_DATE,
    INPUT_FIELD_TYPE_BUTTON,
    INPUT_FIELD_TYPE_ICON_LINK,
    OUTPUT_FIELD_TYPE_TEXT,
    OUTPUT_FIELD_TYPE_TABLE,
    BREAK_LINE,
    INPUT_FIELD_TYPE_BUTTON_LINK
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
    lpad,
} from "../../utils/CommonUtils"
import CommonButton from '../commons/CommonButton';

import add from 'date-fns/add'
import { format } from 'date-fns'


export default class OM0401 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
            kknFrom: format(add(new Date(), {months: -1}), "yyyy/MM/dd"),
            kknTo: format(new Date(), "yyyy/MM/dd"),
			trhkSkKishNm: "",
			trhkSkCd: "",
			seikyuSts: "",
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.TODO_YOU_DEFINE_SOMETHING = function(){} // TODO: 
        this.onMove2SeikyushoSkse = this.onMove2SeikyushoSkse.bind(this)

        this.itemDef4SearchCondition = [
            { type: INPUT_FIELD_TYPE_DATE, id: "kknFrom", label: "期間(From)", /*onChange: this.onSelectChange("kknFrom")*/ onChange: function(v1){console.log(v1)}},
            { type: INPUT_FIELD_TYPE_DATE, id: "kknTo", label: "期間(To)", onChange: this.onSelectChange("kknTo")},
            { type: BREAK_LINE},
			      { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "取引先会社名", onChange: this.onTextChange("trhkSkKishNm")},
			      { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkCd", label: "取引先コード", onChange: this.onTextChange("trhkSkCd")},
			      { type: INPUT_FIELD_TYPE_SELECT, id: "seikyuSts", label: "請求ステータス", 
				      items: [{"value":"0","label":"未請求"},{"value":"1","label":"請求中"},{"value":"2","label":"領収"},{"value":"3","label":"領収後処理"},{"value":"4","label":"完了"}]
            },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "searchButton", label: "検索", onChange: ()=> alert("検索しました"), color: "primary"}
        ]

        this.itemDef4SearchedList = [{
            type: OUTPUT_FIELD_TYPE_TABLE,
            id: "seikyuLst",
            label: "請求一覧",
            headerDef: [
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "取引先会社名"},
                // { type: OUTPUT_FIELD_TYPE_TEXT, id: "zipNo", label: "郵便番号"},
                // { type: OUTPUT_FIELD_TYPE_TEXT, id: "address", label: "住所"},
                // { type: OUTPUT_FIELD_TYPE_TEXT, id: "telNo", label: "電話番号"},
                // { type: OUTPUT_FIELD_TYPE_TEXT, id: "mail", label: "メール"},
                // { type: OUTPUT_FIELD_TYPE_TEXT, id: "tk", label: "月"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "seikyuNo", label: "請求No."},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hkkoD", label: "発行日"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "shriKjt", label: "支払期日"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "seikyuKngk", label: "請求金額(円)"},
                { type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "seikyuSts", label: "請求ステータス", onChange: this.TODO_YOU_DEFINE_SOMETHING("seikyuSts"), color: "primary",
                    items: [{"value":"0","label":"未請求"},{"value":"1","label":"請求中"},{"value":"2","label":"領収"},{"value":"3","label":"領収後処理"},{"value":"4","label":"完了"}]
                },
                //{ type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "seikyushoDL", label: "請求書DL", onChange: this.TODO_YOU_DEFINE_SOMETHING("seikyushoDL"), color: "primary"},
                { type: INPUT_FIELD_TYPE_ICON_LINK, icon: (<GetAppIcon />), id: "seikyushoDL", label: "請求書DL", onChange: this.TODO_YOU_DEFINE_SOMETHING("seikyushoDL"), color: "primary"},
                //{ type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "seikyushoNoKosn", label: "請求書の更新", onChange: this.onMove2SeikyushoSkse, color: "primary"},
                { type: INPUT_FIELD_TYPE_ICON_LINK, icon: (<EditIcon />), id: "seikyushoNoKosn", label: "請求書の更新", onChange: this.onMove2SeikyushoSkse},

            ],
            items: []
        }]
            
    }


    onMove2SeikyushoSkse(event){

        this.props.history.push(`${process.env.PUBLIC_URL}/OM0402`, {seikyushoId: ""})

    }

    seikyuTableCreator(){

        // TODO: テストデータではなく取引先情報を取得してセットするように
        const _dummyTrhkskSeikyuLst = [...(new Array(10)).keys()]
        .map(i=> {
            return {
                trhkSkKishCd: lpad(i, 10),
                trhkSkKishNm: "取引先" + i,
                trhkSkKishCd: lpad(i, 10),
                trhkSkKishNm: "取引先" + i,
                mtmrJuchuNo: lpad(i, 10),
                shosi: "詳細テキスト" + i,
                kngk: (i + 1) * 10000,
                seikyubn: (i + 1) * 9000,
                hisoD: "2020/01/" + lpad(i + 1, 2),
                hisosk: "配送先" + i,
                nmtNm: "荷物名" + i,
                seikyuKngk: (i + 2) * 1234,
                seikyuNo: "SKN" + lpad(i, 7),
            }
        })

        this.itemDef4SearchedList[0].items = _dummyTrhkskSeikyuLst

        return this.itemDef4SearchedList

    }

    // TODO: 
    TODO_YOU_DEFINE_SOMETHING(){

    }

    onHznClick(){

		// TODO: 

    }


    render(){

const classes = {}

        return (

            
            <div className="OM0401-wrapper inner-wrapper">

                <Paper className="input-items-wrapper">
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            請求一覧
                        </Typography>

                        <CommonButton label="請求書の作成" onChange={()=> this.props.history.push(`${process.env.PUBLIC_URL}/OM0402`, {seikyushoId: ""})} />

                        <DividerMargin />

                        {
                            this.itemDef4SearchCondition.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }

                        <Divider />


                        {
                            // どうするか...正直propsに入れる必要ない気がしてきた
                            this.seikyuTableCreator().map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} />))
                        }
                    </React.Fragment>
                </Paper>
                
            </div>
        )
    }

}
