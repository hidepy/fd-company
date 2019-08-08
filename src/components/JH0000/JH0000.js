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

import "./JH0000.scss"

export default class JH0000 extends React.Component{

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
        this.onLoginClick = this.onLoginClick.bind(this)

        this.itemDef = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "userId", label: "ユーザID", onChange: this.onTextChange("userId") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "password", label: "パスワード", onChange: this.onTextChange("password") },
        ]

    }

    onTextChange(propKey){
        return event=> this.setState({ [propKey]: event.target.value })
    }

    onLoginClick(){

console.log(this)

        //showAlertMsg("保存しました")
        this.props.history.push("/JH0101")


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
                    <HznButton text="ログイン" onClick={this.onLoginClick} />
                </Grid>

                
            </div>
        )
    }

}

