import React from 'react'
import PropTypes from "prop-types"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import HznButton from "../commons/HznButton"
import FieldItem from "../commons/FieldItem"
import {
    INPUT_FIELD_TYPE_TEXT
} from "../../constants/common"
import {
    showAlertMsg
} from "../../utils/CommonUtils"

export default class JH0101 extends React.Component{

    static contextTypes = {
        router: PropTypes.object
      }

    constructor(props){

        super(props)

        this.state = {
            userId: "",
            password: "",
        }

        this.onTextChange = this.onTextChange.bind(this)
        this.onHznClick = this.onHznClick.bind(this)

        this.itemDef = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "userId", label: "ユーザID", onChange: this.onTextChange("userId") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "password", label: "パスワード", onChange: this.onTextChange("password") },
        ]

    }

    onTextChange(propKey){
        return event=> this.setState({ [propKey]: event.target.value })
    }

    onHznClick(){

        showAlertMsg("保存しました")

    }

    render(){

        return (
            <div className="jh0000-wrapper">
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

