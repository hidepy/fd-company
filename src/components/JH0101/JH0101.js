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
            userId: "",
            password: "",
            selectTest: "",
            checkTest: "",
            checkTestMulti: {

            },
        }

        //this.onTextChange = this.onTextChange.bind(this)
        this.onHznClick = this.onHznClick.bind(this)
        this.onTextChange = onTextChange(this)
        this.onSelectChange = onSelectChange(this)

        // this.itemDef = [
        //     //{ type: INPUT_FIELD_TYPE_TEXT, id: "userId", label: "ユーザID", onChange: this.onTextChange("userId") },
        //     { type: INPUT_FIELD_TYPE_TEXT, id: "userId", label: "ユーザID", onChange: this.onTextChange("userId") },
        //     { type: INPUT_FIELD_TYPE_TEXT, id: "password", label: "パスワード2", onChange: onTextChange("password", this) },
        //     { type: INPUT_FIELD_TYPE_TEXT, id: "password", label: "パスワード5", onChange: this.onTextChange("password") },
        //     { type: INPUT_FIELD_TYPE_SELECT, id: "selectTest", label: "select項目", onChange: this.onSelectChange("selectTest"), selection: [
        //         {value: "01", label: "sel01"},
        //         {value: "02", label: "sel02"},
        //         {value: "03", label: "sel03"},
        //     ] },
        //     { type: INPUT_FIELD_TYPE_CHECKBOX, id: "checkTest", label: "checkbox1", value: "check-test-val", onChange: this.onCheckboxChange("checkTest"), },
        //     { type: INPUT_FIELD_TYPE_CHECKBOXES, id: "checkTestMulti", label: "checkbox2", onChange: this.onCheckboxChange("checkTestMulti"), 
        //         items: [
        //             {label: "checkbox1", value: "check-test-val1"},
        //             {label: "checkbox2", value: "check-test-val2"},
        //             {label: "checkbox3", value: "check-test-val3"},
        //         ]
        //     },
        // ]
        this.itemDef = [
            { type: INPUT_FIELD_TYPE_TEXT, id: "userId", label: "ユーザID", onChange: onTextChange("userId") },
            { type: INPUT_FIELD_TYPE_TEXT, id: "password", label: "パスワード5", onChange: this.onTextChange("password") },
            { type: INPUT_FIELD_TYPE_SELECT, id: "selectTest", label: "select項目", onChange: this.onSelectChange("selectTest"), selection: [
                {value: "01", label: "sel01"},
                {value: "02", label: "sel02"},
                {value: "03", label: "sel03"},
            ] },
            { type: INPUT_FIELD_TYPE_CHECKBOX, id: "checkTest", label: "checkbox1", value: "check-test-val", onChange: this.onCheckboxChange("checkTest"), },
            { type: INPUT_FIELD_TYPE_CHECKBOXES, id: "checkTestMulti", label: "checkbox2", onChange: this.onCheckboxChange("checkTestMulti"), 
                items: [
                    {label: "checkbox1", value: "check-test-val1"},
                    {label: "checkbox2", value: "check-test-val2"},
                    {label: "checkbox3", value: "check-test-val3"},
                ]
            },
        ]
    }

//     onTextChange(propKey){
        
//         return event=>{

// console.log(event.target)

//             this.setState({ [propKey]: event.target.value })
//         }

//     }


    onCheckboxChange(propKey){
        return event=>{

            console.log(event.target.checked)
            console.log(event.target)

            const res = {
                ...this.state[propKey],
                [event.target.value]: event.target.checked
            }

            this.setState({ [propKey]: res})
            
        }
    }

    // onSelectChange(propKey){


    //     return event=> {
    //         this.setState({ [propKey]: event.target.value })
    //     }
    // }

    onHznClick(){

console.log(this.state)

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

