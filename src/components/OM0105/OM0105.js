
import React from 'react'
import PropTypes from "prop-types"
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
    BREAK_LINE
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
    onRadioChange,
} from "../../utils/CommonUtils"

import "./OM0105.scss"
import { getMtmtIriAllContents, getItemDef4IrishContents, getItemDef4NmtContents, getItemDef4NtjHisoJknContents } from '../../utils/MtmrIriUtils'
import { Typography } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';




//export default class OM0105 extends React.Component{
export default class OM0105 extends React.PureComponent{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
            truckInfLst: [],
            tiouKh: "0",
            calcHoho: "0",
			truckType: "0",
			disu: "",
			add: "",
			shukNtj: "",
			shukSk: "集荷先です",
			hisoNtj: "",
			hisoSk: "",
			untn: "19800",
			juryoOb: "",
			kyoriOb: "",
			nnryoScg: "",
			tmkmRyo: "",
			tmkmUm: "",
			trSRyo: "",
			trSUm: "",
			ftiSgyoRyo: "",
			tnirUm: "",
			lblHrUm: "",
			ykmtUm: "",
			ttmtUm: "",
			hisgyoUm: "",
			sntRyokn: "",
			wrbkKngk: "",
			gokeKngk: "",
			biko: "",
			kknn: "",
			edit: "",
			entry: "",
			mtmrshDL: "",
        }

        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)
        this.onRadioChange = onRadioChange(this)
        this.TODO_YOU_DEFINE_SOMETHING = this.TODO_YOU_DEFINE_SOMETHING.bind(this)
        this.onTruckAddButtonClick = this.onTruckAddButtonClick.bind(this)
        this.onSwitchTruckTypeButtonClick = this.onSwitchTruckTypeButtonClick.bind(this)
        this.onTruckDeleteButtonClick = this.onTruckDeleteButtonClick.bind(this)

        this.itemDef4Head = [
            { type: INPUT_FIELD_TYPE_RADIO, id: "tiouKh", label: "対応可否", onChange: this.onRadioChange("tiouKh"),
                items: [{"value":"0","label":"可"},{"value":"1","label":"否"}]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_RADIO, id: "calcHoho", label: "計算方法（車両貸しor混載）", onChange: this.onRadioChange("calcHoho"), 
                items: [{"value":"0","label":"車両貸し"},{"value":"1","label":"混載"}]
            },
        ]

        this.itemDef4trkInf = [
            // { type: INPUT_FIELD_TYPE_RADIO, id: "type", label: "種別", onChange: this.onRadioChange("type"), 
            //     items: [{"value":"0","label":"2t"},{"value":"1","label":"4t"},{"value":"2","label":"10t"}],
            //     customComponent: (
            //         <div style={{display: "inline-block"}}>
            //             {
            //                 [{"value":"0","label":"2t"},{"value":"1","label":"4t"},{"value":"2","label":"10t"}]
            //                     .map((v, i)=> (
            //                         <Fab 
            //                             key={i} 
            //                             size="small" 
            //                             color={("" + i) === this.state.truckType ? "primary" : "default"} 
            //                             aria-label="add" 
            //                             variant="extended" 
            //                             style={{width: "128px", height: "64px", margin: "8px"}}
            //                             onClick={()=> this.onSwitchTruckTypeButtonClick(v.value)}
            //                         >
            //                             <LocalShippingIcon />
            //                     <span>{v.label}-{this.state.truckType}-{i}</span>
            //                         </Fab>
                          
            //                     ))
            //             }
            //         </div>
            //     )
            // },
            { type: INPUT_FIELD_TYPE_TEXT, id: "disu", label: "台数", onChange: this.onTextChange("disu")},
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "add", label: "追加", onChange: this.onTruckAddButtonClick, style: {margin: "16px"} },
        ]

        this.itemDef4rtInf = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "shukNtj", label: "集荷日時", onChange: this.onTextChange("shukNtj")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "shukSk", label: "集荷先", onChange: this.onTextChange("shukSk")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "hisoNtj", label: "配送日時", onChange: this.onTextChange("hisoNtj")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "hisoSk", label: "配送先", onChange: this.onTextChange("hisoSk")},
        ]

        this.itemDef4mtmrKngk = [
            { type: OUTPUT_FIELD_TYPE_TEXT, id: "untn", label: "運賃", disabled: true },
			{ type: INPUT_FIELD_TYPE_SELECT, id: "juryoOb", label: "重量帯", onChange: this.onSelectChange("juryoOb")},
			{ type: INPUT_FIELD_TYPE_SELECT, id: "kyoriOb", label: "距離帯", onChange: this.onSelectChange("kyoriOb")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "nnryoScg", label: "燃料サーチャージ", onChange: this.onTextChange("nnryoScg")},
			{ type: INPUT_FIELD_TYPE_TEXT, id: "tmkmRyo", label: "積込み料", onChange: this.onTextChange("tmkmRyo")},
            { type: INPUT_FIELD_TYPE_RADIO, id: "tmkmUm", label: "積込み有無", onChange: this.onRadioChange("tmkmUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "trSRyo", label: "取卸し料", onChange: this.onTextChange("trSRyo")},
            { type: INPUT_FIELD_TYPE_RADIO, id: "trSUm", label: "取卸し有無", onChange: this.onRadioChange("trSUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "ftiSgyoRyo", label: "附帯作業料", onChange: this.onTextChange("ftiSgyoRyo")},
            { type: INPUT_FIELD_TYPE_RADIO, id: "tnirUm", label: "棚入れ有無", onChange: this.onRadioChange("tnirUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
			{ type: INPUT_FIELD_TYPE_RADIO, id: "lblHrUm", label: "ラベル貼り有無", onChange: this.onRadioChange("lblHrUm")},
            { type: INPUT_FIELD_TYPE_RADIO, id: "ykmtUm", label: "横持ち有無", onChange: this.onRadioChange("ykmtUm"),
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "ttmtUm", label: "縦持ち有無", onChange: this.onRadioChange("ttmtUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: INPUT_FIELD_TYPE_RADIO, id: "hisgyoUm", label: "はい作業有無", onChange: this.onRadioChange("hisgyoUm"), 
                items: [{"value":"0","label":"有"},{"value":"1","label":"無"}]
            },
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "sntRyokn", label: "その他料金", onChange: this.onTextChange("sntRyokn")},
            { type: BREAK_LINE },
            { type: INPUT_FIELD_TYPE_TEXT, id: "wrbkKngk", label: "割引金額", onChange: this.onTextChange("wrbkKngk")},
            { type: BREAK_LINE },
            { type: OUTPUT_FIELD_TYPE_TEXT, id: "gokeKngk", label: "合計金額"},
            { type: BREAK_LINE },
			{ type: INPUT_FIELD_TYPE_TEXT, id: "biko", label: "備考", onChange: this.onTextChange("biko")},
        ]

        this.itemDef4footer = [
			// { type: INPUT_FIELD_TYPE_BUTTON, id: "kknn", label: "確認", onChange: this.TODO_YOU_DEFINE_SOMETHING},
			// { type: INPUT_FIELD_TYPE_BUTTON, id: "edit", label: "修正", onChange: this.TODO_YOU_DEFINE_SOMETHING},
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "entry", label: "登録", color: "secondary", onChange: this.TODO_YOU_DEFINE_SOMETHING},
			{ type: INPUT_FIELD_TYPE_BUTTON, id: "mtmrshDL", label: "見積書DL", color: "primary", onChange: this.TODO_YOU_DEFINE_SOMETHING},
        ]

        // 見積依頼用
        this.itemDef4IrishContents = getItemDef4IrishContents(this).map(v=> { return { ...v, disabled: true} })
        this.itemDef4NmtContents = getItemDef4NmtContents(this).map(v=> { return { ...v, disabled: true} })
        this.itemDef4NtjHisoJknContents = getItemDef4NtjHisoJknContents(this).map(v=> { return { ...v, disabled: true} })
    }


    /**
     * トラック情報削除ボタン押下時
     * @param {*} truckInf 
     * @param {*} i 
     */
    onTruckDeleteButtonClick(truckInf, idx){

        const truckInfLst = (this.state.truckInfLst || []).filter((v, i)=> i !== idx)

        this.setState({
            truckInfLst: truckInfLst
        })
    }

    /**
     * トラック種別ボタン押下時
     * @param {*} truckType 
     */
    onSwitchTruckTypeButtonClick(truckType){
        console.log(truckType)
        this.setState({
            truckType: truckType
        }, ()=> console.log(this.state))
    }

    /**
     * トラック情報追加ボタン押下時
     */
    onTruckAddButtonClick(){
        
        // 入力がそろってなければ虫
        if(!this.state.disu || !this.state.truckType) return

        const truckInfLst = this.state.truckInfLst || []
        truckInfLst.push({ truckType: this.state.truckType, disu: this.state.disu })

        this.setState({
            truckInfLst: truckInfLst,
            disu: "",
            truckType: "",
        })

    }

    // TODO: 
    TODO_YOU_DEFINE_SOMETHING(key){
        console.log(key)
        console.log(this.state)
        alert("保存しました")
    }

    onHznClick(){

		// TODO: 

    }

    render(){
console.log("[OM0105] rendering")
        return (
            <div className="OM0105-wrapper inner-wrapper">

    <ExpansionPanel className="iri-niyo-wrapper">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="iri-niyo-body"
          id="iri-niyo-header"
        >
          <Typography variant="h5"><DescriptionIcon />依頼内容</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Paper>
            {
                getMtmtIriAllContents(this)
            }
            </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>

                {/* <Paper>
                    <Typography variant="h5">依頼内容</Typography>
                    {
                        getMtmtIriAllContents(this)
                    }
                </Paper> */}


                <Paper>
                    <Typography variant="h5"><EditIcon />回答作成</Typography>

                    <Paper className="input-items-wrapper">
                        {
                            this.itemDef4Head.map((v, i)=> (<FieldItem key={`head-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Paper>
      

                    <Paper className="input-items-wrapper">
                        <Typography variant="h6">トラック情報</Typography>

                        <div>
                        {
[{"value":"0","label":"2t"},{"value":"1","label":"4t"},{"value":"2","label":"10t"}]
.map((v, i)=> (
    <Fab 
        key={i} 
        size="small" 
        color={("" + i) === this.state.truckType ? "primary" : "default"} 
        aria-label="add" 
        variant="extended" 
        style={{width: "128px", height: "64px", margin: "8px"}}
        onClick={()=> this.onSwitchTruckTypeButtonClick(v.value)}
    >
        <LocalShippingIcon />
<span>{v.label}</span>
    </Fab>

))
                        }
                        {
                            this.itemDef4trkInf.map((v, i)=> (<FieldItem key={`trhk-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                        </div>
                        {
                            (this.state.truckInfLst || [])
                                .map((v, i)=> (
<Chip
    icon={<LocalShippingIcon />}
    label={` Xトントラック ${v.disu}台`}
    onDelete={()=> this.onTruckDeleteButtonClick(v, i)}
    color="primary"
/>
                                ))
                        }
                    </Paper>

                    <Paper className="input-items-wrapper">
                        <Typography variant="h6">ルート情報</Typography>
                        {
                            this.itemDef4rtInf.map((v, i)=> (<FieldItem key={`rt-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Paper>

                    <Paper className="input-items-wrapper">
                        <Typography variant="h6">見積金額</Typography> 
                        {
                            this.itemDef4mtmrKngk.map((v, i)=> (<FieldItem key={`mtmr-kngk-item-${i}`} {...v} xs={12} md={4} value={this.state[v.id]} />))
                        }
                    </Paper>
                </Paper>

{/* <HznButton text="確認" onClick={this.onHznClick} /> */}
                <Grid item xs={12} className="footer-buttons">
                {
                    this.itemDef4footer.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Grid>
                
            </div>
        )
    }

}
