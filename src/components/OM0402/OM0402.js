
import React from 'react'
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
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
import { TextField } from '@material-ui/core';

export default class OM0402 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
			trhkSkKishNm: "",
			trhkSkCd: "",
			zipNo: "",
			address: "",
			telNo: "",
			mail: "",
			seikyuKngkGoke: "198198",
			mtmrJuchuNo: "",
			shosi: "",
			kngk: "",
			seikyubn: "",
			hisoD: "",
			hisosk: "",
			nmtNm: "",
			hkkoD: "",
			shriKgn: "",
			biko: "",
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.TODO_YOU_DEFINE_SOMETHING = function(){} // TODO: 

        this.itemDef4SeikyuskInf = [
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "取引先会社名", onChange: this.onTextChange("trhkSkKishNm")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkCd", label: "取引先コード", onChange: this.onTextChange("trhkSkCd")},
            { type: BREAK_LINE },
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "zipNo", label: "郵便番号"},
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "address", label: "住所"},
			{ type: OUTPUT_FIELD_TYPE_TEXT, id: "telNo", label: "電話番号"},
            { type: OUTPUT_FIELD_TYPE_TEXT, id: "mail", label: "メール"},
        ]

        this.itemDef4JuchuInfLst= [{

            type: OUTPUT_FIELD_TYPE_TABLE,
            id: "ankenLst",
            label: "受注案件一覧",
            headerDef: [
                //{ type: OUTPUT_FIELD_TYPE_TEXT, id: "seikyuKngkGoke", label: "請求金額合計"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "mtmrJuchuNo", label: "見積・受注No."},
                { type: INPUT_FIELD_TYPE_BUTTON_LINK, id: "shosi", label: "詳細", onChange: this.TODO_YOU_DEFINE_SOMETHING("shosi"), color: "primary"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "kngk", label: "金額"},
                { type: INPUT_FIELD_TYPE_TEXT, id: "seikyubn", label: "請求分", onChange: this.onTextChange("seikyubn")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hisoD", label: "配送日"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hisosk", label: "配送先"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名"},
            ]
        }]

        this.itemDef4Footer = [
			{ type: INPUT_FIELD_TYPE_TEXT, id: "hkkoD", label: "発行日", onChange: this.onTextChange("hkkoD")},
            { type: INPUT_FIELD_TYPE_TEXT, id: "shriKgn", label: "支払期限", onChange: this.onTextChange("shriKgn")},
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "biko", label: "備考", onChange: this.onTextChange("biko"), style: {width: "90%"}},
        ]
    }


    componentDidMount(){
        console.log("OM0402-")
        console.log(this)
    }


    juchuTableCreator(){

        // TODO: テストデータではなく取引先情報を取得してセットするように
        const _dummyData = [...(new Array(10)).keys()]
        .map(i=> {
            return {
                trhkSkKishCd: lpad(i, 10),
                trhkSkKishNm: "取引先" + i,
                mtmrJuchuNo: lpad(i, 10),
                shosi: "詳細テキスト" + i,
                kngk: (i + 1) * 10000,
                seikyubn: (i + 1) * 9000,
                hisoD: "2020/01/" + lpad(i + 1, 2),
                hisosk: "配送先" + i,
                nmtNm: "荷物名" + i,
            }
        })

/*
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "mtmrJuchuNo", label: "見積・受注No."},
                { type: INPUT_FIELD_TYPE_BUTTON, id: "shosi", label: "詳細", onChange: this.TODO_YOU_DEFINE_SOMETHING("shosi")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "kngk", label: "金額"},
                { type: INPUT_FIELD_TYPE_TEXT, id: "seikyubn", label: "請求分", onChange: this.onTextChange("seikyubn")},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hisoD", label: "配送日"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "hisosk", label: "配送先"},
                { type: OUTPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名"},
*/

        this.itemDef4JuchuInfLst[0].items = _dummyData

        return this.itemDef4JuchuInfLst

    }

    // TODO: 
    TODO_YOU_DEFINE_SOMETHING(){

    }

    onHznClick(){

		// TODO: 

    }

    render(){

        return (
            <div className="OM0402-wrapper inner-wrapper">
                <Paper className="input-items-wrapper">

                    <Typography variant="h5" gutterBottom>請求先情報</Typography>
                    {
                        this.itemDef4SeikyuskInf.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                    }
                </Paper>

                <Paper>
                    <Typography variant="h5" gutterBottom>受注案件一覧</Typography>

                    <div>
                        <TextField className="field-item" disabled={true} defaultValue={this.state.seikyuKngkGoke} label={"請求額合計"} />
                    </div>

                    {
                        this.juchuTableCreator().map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} />))
                    }
                </Paper>

                <Paper>
                    {
                        this.itemDef4Footer.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                    }
                </Paper>

                <Grid item xs={12} className="footer-butons">
                    <HznButton text="確認" onClick={this.onHznClick} />
                </Grid>
                
            </div>
        )
    }

}
