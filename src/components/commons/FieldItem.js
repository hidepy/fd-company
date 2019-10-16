import React from "react"
import TextField from '@material-ui/core/TextField'
import Select from "./CommonSelect"
import Checkbox from "./CommonCheckbox"
import Checkboxes from "./CommonChechboxes"
import Radio from "./CommonRadio"
import Button from "./CommonButton"
import Table from "./CommonTable"

import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    OUTPUT_FIELD_TYPE_TABLE,
    BREAK_LINE
} from "../../constants/common"

const INPUT_TYPE_DEF = {
    [INPUT_FIELD_TYPE_TEXT]: TextField,
    [INPUT_FIELD_TYPE_SELECT]: Select,
    [INPUT_FIELD_TYPE_CHECKBOX]: Checkbox,
    [INPUT_FIELD_TYPE_CHECKBOXES]: Checkboxes,
    [INPUT_FIELD_TYPE_RADIO]: Radio,
    [INPUT_FIELD_TYPE_BUTTON]: Button,
}

const FieldItem = (props)=> {

    const { type, ...rest } = props 
    const Component = INPUT_TYPE_DEF[type] || (()=> <span />)

    if(type === BREAK_LINE){
        return (<div />)
    }

    if(type === OUTPUT_FIELD_TYPE_TABLE){
        return(
            <Table {...rest} />
        )
    }

    return (<Component {...rest} className={"field-item"} />)
}

export default FieldItem
