// 見積関連Utils(型定義/helper)
//   ⇒ 本来は分けるべきかとも思えど...constではないし...helperという雰囲気でもないし...

import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FieldItem from "../components/commons/FieldItem"

import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    BREAK_LINE
} from "../constants/common"

import {
    INPUT_AREA_TITLE_IRISH,
    INPUT_AREA_TITLE_NMT,
    INPUT_AREA_TITLE_NTJ_HISO_JKN
} from "../constants/MtmrIri"

/**
 * 見積 ページヘッダ部の定義(ここにあるのは不適な気がする) TODO: 
 * @param {*} props 
 */
export const getItemDef4PageHeader = props=> [
    //{ type: INPUT_FIELD_TYPE_BUTTON, id: "dataTrkm", label: "データ取込", onChange: export const TODO_YOU_DEFINE_SOMETHING("dataTrkm")},
    // { type: INPUT_FIELD_TYPE_BUTTON, id: "onsiInput", label: "音声入力", onChange: export const TODO_YOU_DEFINE_SOMETHING("onsiInput")},
    // { type: INPUT_FIELD_TYPE_BUTTON, id: "mailTrkm", label: "メール取込", onChange: export const TODO_YOU_DEFINE_SOMETHING("mailTrkm")},
    // { type: INPUT_FIELD_TYPE_BUTTON, id: "fileTrkm", label: "ファイル（PDF・CSV）取込", onChange: export const TODO_YOU_DEFINE_SOMETHING("fileTrkm")},
]

/**
 * 見積 依頼者入力の定義
 * @param {*} props 
 */
export const getItemDef4IrishContents = props=>  [
    { type: INPUT_FIELD_TYPE_TEXT, id: "kishCd", label: "会社コード", onChange: props.onTextChange("kishCd") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "kishNm", label: "会社名", onChange: props.onTextChange("kishNm") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "kishNmKn", label: "会社名（カナ）", onChange: props.onTextChange("kishNmKn") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "yubnNo", label: "郵便番号", onChange: props.onTextChange("yubnNo") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "address", label: "所在地", onChange: props.onTextChange("address") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshNm", label: "担当者名", onChange: props.onTextChange("tntoshNm") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "tntoshNmKn", label: "担当者名（カナ）", onChange: props.onTextChange("tntoshNmKn") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "telNo", label: "電話番号", onChange: props.onTextChange("telNo") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "mail", label: "メール", onChange: props.onTextChange("mail") },
]

/**
 * 見積 荷物入力の定義
 * @param {*} props 
 */
export const getItemDef4NmtContents = props=> [
    { type: INPUT_FIELD_TYPE_RADIO, id: "nmtType", label: "荷物種別", onChange: props.onRadioChange("nmtType"), style: {width: "100%"},
        items: [
            { value: "0", label: "機械/機械部品"},
            { value: "1", label: "繊維/衣類"},
            { value: "2", label: "日用品"},
            { value: "3", label: "食料品"},
            { value: "4", label: "その他"},            
        ]
    },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名", onChange: props.onTextChange("nmtNm") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_RADIO, id: "unitload", label: "ユニットロード", onChange: props.onRadioChange("unitload"),
        items: [
            { value: "0", label: "パレット"},
            { value: "1", label: "コンテナ"},
            { value: "2", label: "無し"},            
        ]
    },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_RADIO, id: "nisgtKonpoKeti", label: "荷姿（梱包形態）", onChange: props.onRadioChange("nisgtKonpoKeti"),
        items: [
            { value: "0", label: "段ボール"},
            { value: "1", label: "折り畳みコンテナ"},
            { value: "2", label: "通い箱"},
            { value: "3", label: "袋"},
            { value: "4", label: "缶"},
            { value: "5", label: "その他"},            
        ]
    },
    { type: INPUT_FIELD_TYPE_TEXT, id: "nisgtSnt", label: "荷姿（その他）", onChange: props.onTextChange("nisgtSnt") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "snpoUnitloadNsgt", label: "寸法（ユニットロード or 荷姿）", onChange: props.onTextChange("snpoUnitloadNsgt") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "juryoUnitloadNsgt", label: "重量（ユニットロード or 荷姿）", onChange: props.onTextChange("juryoUnitloadNsgt") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "kosuUnitloadNsgt", label: "個数（ユニットロード or 荷姿）", onChange: props.onTextChange("kosuUnitloadNsgt") },
]

/**
 * 見積 日時/場所/配送条件 入力の定義
 * @param {*} props 
 */
export const getItemDef4NtjHisoJknContents = props=> [
    { type: INPUT_FIELD_TYPE_TEXT, id: "shukKiboDatetime", label: "集荷希望日時", onChange: props.onTextChange("shukKiboDatetime") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "shukSk", label: "集荷先", onChange: props.onTextChange("shukSk") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "shukSkNm", label: "集荷先名", onChange: props.onTextChange("shukSkNm") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "hisoKiboDatetime", label: "配送希望日時", onChange: props.onTextChange("hisoKiboDatetime") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "hisoSk", label: "配送先", onChange: props.onTextChange("hisoSk") },
    { type: INPUT_FIELD_TYPE_TEXT, id: "hisoSkNm", label: "配送先名", onChange: props.onTextChange("hisoSkNm") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_RADIO, id: "knsiKh", label: "混載可否", onChange: props.onRadioChange("knsiKh"),
        items: [
            { value: "0", label: "可" },
            { value: "1", label: "否" },
        ],
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "tmksnKh", label: "積み重ね可否", onChange: props.onRadioChange("tmksnKh"),
        items: [
            { value: "0", label: "可" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "nioiUm", label: "匂いの有無", onChange: props.onRadioChange("nioiUm"),
        items: [
            { value: "0", label: "有り" },
            { value: "1", label: "無し" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "kknbtInk", label: "危険物", onChange: props.onRadioChange("kknbtInk"),
        items: [
            { value: "0", label: "一般" },
            { value: "1", label: "危険物" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "tmkmYh", label: "積込み要否", onChange: props.onRadioChange("tmkmYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "trorsYh", label: "取卸し要否", onChange: props.onRadioChange("trorsYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "tnirYh", label: "棚入れ要否", onChange: props.onRadioChange("tnirYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "lblHrYh", label: "ラベル貼り要否", onChange: props.onRadioChange("lblHrYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "ykmtYh", label: "横持ち要否", onChange: props.onRadioChange("ykmtYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "ttmtYh", label: "縦持ち要否", onChange: props.onRadioChange("ttmtYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: INPUT_FIELD_TYPE_RADIO, id: "hisgyoYh", label: "はい作業要否", onChange: props.onRadioChange("hiSgyoYh"),
        items: [
            { value: "0", label: "要" },
            { value: "1", label: "否" },
        ]
    },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "sntJokn", label: "その他条件", onChange: props.onTextChange("sntJokn") },
    { type: BREAK_LINE },
    { type: INPUT_FIELD_TYPE_TEXT, id: "kiboKngk", label: "希望金額", onChange: props.onTextChange("kiboKngk") },
]

/**
 * 見積依頼の全入力(or出力)表示項目を取得する
 * @param {object} this_state 
 */
export const getMtmtIriAllContents = (_this)=> {

    const this_state = _this.state

    return (
        <React.Fragment>
            <Paper className="page-contents-wrapper">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_IRISH}
                </Typography>

                {
                    _this.itemDef4IrishContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>

            <Paper className="page-contents-wrapper">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_NMT}
                </Typography>
                {
                    _this.itemDef4NmtContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>


            <Paper className="page-contents-wrapper">
                <Typography variant="h6">
                    {INPUT_AREA_TITLE_NTJ_HISO_JKN}
                </Typography>
                {
                    _this.itemDef4NtjHisoJknContents.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this_state[v.id]} />))
                }
            </Paper>
        </React.Fragment>
    )
}