
import React from 'react'
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
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
    INPUT_FIELD_TYPE_BUTTON 
} from "../../constants/common"
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

export default class OM0403 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
			nmtNm   : "",
			unitload    : "",
			nsgtTypeKonpoKeti   : "",
			snpoUnitloadNsgt	: "",
			juryoUnitloadNsgt	: "",
			kosuUnitloadNsgt	: "",
			untn	: "",
			juryotai	: "",
			kyItai	: "",
			nnryoScg	: "",
			tmkmRyo	: "",
			tmkmUm	: "",
			trSRyo	: "",
			trSUm	: "",
			ftiSgyoRyo	: "",
			tnirUm	: "",
			lblHrUm	: "",
			ykmtUm	: "",
			ttmtUm	: "",
			hisgyoUm	: "",
			sntRyokn	: "",
			wrbkKngk	: "",
			gokeKngk	: "",
			biko	: "",
			kknn	: "",
			edit	: "",
			entry	: "",
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.TODO_YOU_DEFINE_SOMETHING = function(){} // TODO: 

        this.itemDef = [
			{ type: INPUT_FIELD_TYPE_TEXT, id: "nmtNm", label: "荷物名", onChange: this.onTextChange("nmtNm") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "unitload", label: "ユニットロード", onChange: this.onRadioChange("unitload") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "nsgtTypeKonpoKeti", label: "荷姿種別（梱包形態）", onChange: this.onRadioChange("nsgtTypeKonpoKeti") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "snpoUnitloadNsgt", label: "寸法（ユニットロード or 荷姿）", onChange: this.onTextChange("snpoUnitloadNsgt") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "juryoUnitloadNsgt", label: "重量（ユニットロード or 荷姿）", onChange: this.onTextChange("juryoUnitloadNsgt") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "kosuUnitloadNsgt", label: "個数（ユニットロード or 荷姿）", onChange: this.onTextChange("kosuUnitloadNsgt") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "untn", label: "運賃", onChange: this.onTextChange("untn") },
			{ type: INPUT_FIELD_TYPE_SELECT, id: "juryotai", label: "重量帯", onChange: this.onSelectChange("juryotai") },
			{ type: INPUT_FIELD_TYPE_SELECT, id: "kyItai", label: "距離帯", onChange: this.onSelectChange("kyItai") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "nnryoScg", label: "燃料サーチャージ", onChange: this.onTextChange("nnryoScg") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "tmkmRyo", label: "積込み料", onChange: this.onTextChange("tmkmRyo") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "tmkmUm", label: "積込み有無", onChange: this.onRadioChange("tmkmUm") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trSRyo", label: "取卸し料", onChange: this.onTextChange("trSRyo") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "trSUm", label: "取卸し有無", onChange: this.onRadioChange("trSUm") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "ftiSgyoRyo", label: "附帯作業料", onChange: this.onTextChange("ftiSgyoRyo") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "tnirUm", label: "棚入れ有無", onChange: this.onRadioChange("tnirUm") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "lblHrUm", label: "ラベル貼り有無", onChange: this.onRadioChange("lblHrUm") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "ykmtUm", label: "横持ち有無", onChange: this.onRadioChange("ykmtUm") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "ttmtUm", label: "縦持ち有無", onChange: this.onRadioChange("ttmtUm") },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "hisgyoUm", label: "はい作業有無", onChange: this.onRadioChange("hisgyoUm") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "sntRyokn", label: "その他料金", onChange: this.onTextChange("sntRyokn") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "wrbkKngk", label: "割引金額", onChange: this.onTextChange("wrbkKngk") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "合計金額", onChange: this.onTextChange("gokeKngk") },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "biko", label: "備考", onChange: this.onTextChange("biko") },
			// { type: INPUT_FIELD_TYPE_BUTTON, id: "edit", label: "保存", onChange: this.onHznClick("edit") },
        ]

        
        this.itemDef4PageHeader = getItemDef4PageHeader(this)

        this.itemDef4IrishContents = getItemDef4IrishContents(this)

        this.itemDef4NmtContents = getItemDef4NmtContents(this)

        this.itemDef4NtjContents = getItemDef4NtjContents(this)

        this.itemDef4HisoJknContents = getItemDef4HisoJknContents(this)
    }

    onHznClick(){

		// TODO: 

    }

    render(){

        return (
            <div className="OM0403-wrapper inner-wrapper" style={this.props.style}>

                <Paper>
                {
                    getMtmtIriAllContents(this, true)
                }
                </Paper>

                <Paper className="input-items-wrapper">
                {
                    this.itemDef.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>

                <Grid item xs={12} className="footer-butons">
                    <HznButton text="保存" onClick={this.onHznClick} />
                </Grid>
                
            </div>
        )
    }

}
