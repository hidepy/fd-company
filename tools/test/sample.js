
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
} from "../../constants/common"
import {
    showAlertMsg,
    onTextChange,
    onSelectChange,
} from "../../utils/CommonUtils"

export default class JH0101 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){

        super(props)

        this.state = {
            companyName: "",
            name: "",
            nameKana: "",
            suryo: "",
            hznButton: "",
        }

        //this.onTextChange = this.onTextChange.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)

        this.itemDef = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "companyName", label: "会社名", onChange: this.onTextChange("companyName") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "name", label: "お名前", onChange: this.onTextChange("name") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "nameKana", label: "お名前（カナ）", onChange: this.onTextChange("nameKana") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "suryo", label: "数量", onChange: this.onTextChange("suryo") },
            { type: INPUT_FIELD_TYPE_BUTTON, id: "hznButton", label: "確認ボタン", onChange: this.undefined("hznButton") },
        ]
    }

    onHznClick(){

        // TODO: 

    }

    render(){

        return (
            <div className="JH0101-wrapper">
                <Paper className="input-items-wrapper">
                {
                    this.itemDef.map((v, i)=> (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                }
                </Paper>

                <Grid item xs={12} className="footer-butons">
                    <HznButton text="確認" onClick={this.onHznClick} />
                </Grid>
                
            </div>
        )
    }

}
