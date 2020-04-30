// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

// 見積関連Utils(型定義/helper)
//   ⇒ 本来は分けるべきかとも思えど...constではないし...helperという雰囲気でもないし...

import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FieldItem from "../components/commons/FieldItem"
import _ from "lodash"

import {
    MST_KEY__ANKN_STS_CD, MST_KEY__NMT_TYPE_CD, MST_KEY__UNITLOAD_TYPE_CD, MST_KEY__NSGT_TYPE_CD, MST_KEY__KKNBT_UM_CD, MST_KEY__KNSI_KH_CD
} from "../constants/MstCdKey"

import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    INPUT_FIELD_TYPE_DATE,
    BREAK_LINE,
    INPUT_FIELD_TYPE_DATETIME
} from "../constants/common"

import {
    INPUT_AREA_TITLE_IRISH,
    INPUT_AREA_TITLE_NMT,
    INPUT_AREA_TITLE_NTJ,
    INPUT_AREA_TITLE_HISO_JKN
} from "../constants/MtmrIri"
import { getMstCdSelectionFromMap } from './CommonUtils'

export const mtmrIriStates = {
    trhkSkKishNo: "",
    trhkSkKishNm: "",
    trhkSkKishNmKn: "",
    zipNo: "",
    address: "",
    trhkSkTntoshNm: "",
    trhkSkTntoshNmKn: "",
    trhkSkTelNo: "",
    trhkSkMail: "",
    nmtTypeCd: "",
    nmtNm: "",
    unitloadTypeCd: "",
    nsgtTypeCd: "",
    nsgtSnt: "",
    snpo: "",
    juryo: "",
    kosu: "",
    shukKiboNtj: new Date(),
    shuksk: "",
    shukskNm: "",
    hisoKiboNtj: new Date(),
    hisosk: "",
    hisoskNm: "",
    knsiKh: "",
    tmksnKh: "",
    noiUm: "",
    kknbtInk: "",
    tmkmYh: "",
    trorsYh: "",
    tnirYh: "",
    lblHrYh: "",
    ykmtYh: "",
    ttmtYh: "",
    hiSgyoYh: "",
    sntJokn: "",
    kiboKngk: "",
    confirm: "",
    edit: "",
    entry: "",
}

/**
 * 見積 ページヘッダ部の定義(ここにあるのは不適な気がする) TODO: 
 * @param {*} _this 
 */
export const getItemDef4PageHeader = _this=> [
    //{ type: INPUT_FIELD_TYPE_BUTTON, id: "dataTrkm", label: "データ取込", onChange: export const TODO_YOU_DEFINE_SOMETHING("dataTrkm")},
    // { type: INPUT_FIELD_TYPE_BUTTON, id: "onsiInput", label: "音声入力", onChange: export const TODO_YOU_DEFINE_SOMETHING("onsiInput")},
    // { type: INPUT_FIELD_TYPE_BUTTON, id: "trhkSkMailTrkm", label: "メール取込", onChange: export const TODO_YOU_DEFINE_SOMETHING("trhkSkMailTrkm")},
    // { type: INPUT_FIELD_TYPE_BUTTON, id: "fileTrkm", label: "ファイル（PDF・CSV）取込", onChange: export const TODO_YOU_DEFINE_SOMETHING("fileTrkm")},
]

/**
 * 見積 依頼者入力の定義
 * @param {*} _this 
 */
export const getItemDef4IrishContents = _this=>  [
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishId", label: "会社コード", onChange: _this.onTextChange("trhkSkKishId"), required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "会社名", onChange: _this.onTextChange("trhkSkKishNm") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNmKn", label: "会社名（カナ）", onChange: _this.onTextChange("trhkSkKishNmKn") , required: true },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "zipNo", label: "郵便番号", onChange: _this.onTextChange("zipNo") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "address", label: "所在地", onChange: _this.onTextChange("address") , required: true },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNm", label: "担当者名", onChange: _this.onTextChange("trhkSkTntoshNm") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTntoshNmKn", label: "担当者名（カナ）", onChange: _this.onTextChange("trhkSkTntoshNmKn") , required: true },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkTelNo", label: "電話番号", onChange: _this.onTextChange("trhkSkTelNo") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkMail", label: "メール", onChange: _this.onTextChange("trhkSkMail") , required: true },
]

/**
 * 見積 荷物入力の定義
 * @param {*} _this 
 */
export const getItemDef4NmtContents = _this=> [
    { type: INPUT_FIELD_TYPE_RADIO, id: "nmtTypeCd", label: "荷物種別", onChange: _this.onRadioChange("nmtTypeCd"), style: {width: "100%"},　required: true,
        items: getMstCdSelectionFromMap(MST_KEY__NMT_TYPE_CD, _this.props.AppRoot.mstCdMap)
        /*[
            { value: "0", label: "機械/機械部品"},
            { value: "1", label: "繊維/衣類"},
            { value: "2", label: "日用品"},
            { value: "3", label: "食料品"},
            { value: "4", label: "その他"},     
        ]*/
    },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名", onChange: _this.onTextChange("nmtNm") , required: true },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_RADIO, id: "unitloadTypeCd", label: "ユニットロード", onChange: _this.onRadioChange("unitloadTypeCd"), required: true,
        items: getMstCdSelectionFromMap(MST_KEY__UNITLOAD_TYPE_CD, _this.props.AppRoot.mstCdMap)
        /*[
            { value: "001", label: "パレット"},
            { value: "002", label: "コンテナ"},
            { value: "003", label: "無し"},       
        ]*/
    },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_RADIO, id: "nsgtTypeCd", label: "荷姿（梱包形態）", onChange: _this.onRadioChange("nsgtTypeCd"), required: true,
        items: getMstCdSelectionFromMap(MST_KEY__NSGT_TYPE_CD, _this.props.AppRoot.mstCdMap)
        /*[
            { value: "0", label: "段ボール"},
            { value: "1", label: "折り畳みコンテナ"},
            { value: "2", label: "通い箱"},
            { value: "3", label: "袋"},
            { value: "4", label: "缶"},
            { value: "5", label: "その他"},
        ]*/
    },
    { type: INPUT_FIELD_TYPE_TEXT, id: "nsgtSnt", label: "荷姿（その他）", onChange: _this.onTextChange("nsgtSnt") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "snpo", label: "寸法（ユニットロード or 荷姿）", onChange: _this.onTextChange("snpo") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "juryo", label: "重量（ユニットロード or 荷姿）", onChange: _this.onTextChange("juryo") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "kosu", label: "個数（ユニットロード or 荷姿）", onChange: _this.onTextChange("kosu") , required: true },
]

/**
 * 見積 日時/場所/配送条件 入力の定義
 * @param {*} _this 
 */
export const getItemDef4NtjContents = _this=> [
    { type: INPUT_FIELD_TYPE_DATETIME, id: "shukKiboNtj", label: "集荷希望日時", onChange: _this.onDateChange("shukKiboNtj") , required: true, format: "yyyy/MM/dd HH:mm" },
    { type: INPUT_FIELD_TYPE_TEXT, id: "shuksk", label: "集荷先", onChange: _this.onTextChange("shuksk") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "shukskNm", label: "集荷先名", onChange: _this.onTextChange("shukskNm") , required: true },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_DATETIME, id: "hisoKiboNtj", label: "配送希望日時", onChange: _this.onDateChange("hisoKiboNtj") , required: true, format: "yyyy/MM/dd HH:mm" },
    { type: INPUT_FIELD_TYPE_TEXT, id: "hisosk", label: "配送先", onChange: _this.onTextChange("hisosk") , required: true },
    { type: INPUT_FIELD_TYPE_TEXT, id: "hisoskNm", label: "配送先名", onChange: _this.onTextChange("hisoskNm") , required: true },
]

    //{ type: BREAK_LINE },

export const getItemDef4HisoJknContents = _this=> [
    { type: INPUT_FIELD_TYPE_RADIO, id: "knsiKh", label: "混載可否", onChange: _this.onRadioChange("knsiKh"), required: true,
        items: getMstCdSelectionFromMap(MST_KEY__KNSI_KH_CD, _this.props.AppRoot.mstCdMap)
        // items: [
        //     { value: "0", label: "可" },
        //     { value: "1", label: "否" },
        // ],
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "tmksnKh", label: "積み重ね可否", onChange: _this.onRadioChange("tmksnKh"), required: true,
        items: [
            { value: "0", label: "可" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "nioiUm", label: "匂いの有無", onChange: _this.onRadioChange("nioiUm"), required: true,
        items: [
            { value: "0", label: "有り" },
            { value: "1", label: "無し" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "kknbtInk", label: "危険物", onChange: _this.onRadioChange("kknbtInk"), required: true,
        items: getMstCdSelectionFromMap(MST_KEY__KKNBT_UM_CD, _this.props.AppRoot.mstCdMap)
        // items: [
        //     { value: "0", label: "一般" },
        //     { value: "1", label: "危険物" },
        // ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "tmkmYh", label: "積込み要否", onChange: _this.onRadioChange("tmkmYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "trorsYh", label: "取卸し要否", onChange: _this.onRadioChange("trorsYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "tnirYh", label: "棚入れ要否", onChange: _this.onRadioChange("tnirYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "lblHrYh", label: "ラベル貼り要否", onChange: _this.onRadioChange("lblHrYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "ykmtYh", label: "横持ち要否", onChange: _this.onRadioChange("ykmtYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "ttmtYh", label: "縦持ち要否", onChange: _this.onRadioChange("ttmtYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "hisgyoYh", label: "はい作業要否", onChange: _this.onRadioChange("hiSgyoYh"), required: true,
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "sntJokn", label: "その他条件", onChange: _this.onTextChange("sntJokn") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "kiboKngk", label: "希望金額", onChange: _this.onTextChange("kiboKngk") },
]

/**
 * 見積依頼の全入力(or出力)表示項目を取得する
 * @param {object} this_state 
 */
export const getMtmtIriAllContents = (_this, disabled = false)=> {

    const this_state = _this.state

    return (
        <React.Fragment>
            <Paper className="page-contents-wrapper mtmr-iri-irish">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_IRISH}
                </Typography>

                {
                    _this.itemDef4IrishContents.map((v, i)=> (<FieldItem key={i} disabled={disabled} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>

            <Paper className="page-contents-wrapper mtmr-iri-nmt">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_NMT}
                </Typography>
                {
                    _this.itemDef4NmtContents.map((v, i)=> (<FieldItem key={i} disabled={disabled} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>


            <Paper className="page-contents-wrapper mtmr-iri-ntj">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_NTJ}
                </Typography>
                {
                    _this.itemDef4NtjContents.map((v, i)=> (<FieldItem key={i} disabled={disabled} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>

            <Paper className="page-contents-wrapper mtmr-iri-jkn">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_HISO_JKN}
                </Typography>
                {
                    _this.itemDef4HisoJknContents.map((v, i)=> (<FieldItem key={i} disabled={disabled} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>
        </React.Fragment>
    )
}


/**
 * 最新1件の見積明細を取得する TODO: 
 * @param {*} mtmrMisiArr 
 */
export const getSisnMtmrIri = mtmrMisiArr=> _.get(mtmrMisiArr, "[0]", {})