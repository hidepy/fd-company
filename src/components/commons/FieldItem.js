import React from "react"
import TextField from '@material-ui/core/TextField'

import {
    INPUT_FIELD_TYPE_TEXT
} from "../../constants/common"

const INPUT_TYPE_DEF = {
    [INPUT_FIELD_TYPE_TEXT]: TextField,
}

const FieldItem = (props)=> {

    const { type, ...rest } = props 
    const Component = INPUT_TYPE_DEF[type]

    return (<Component {...rest} className={"field-item"} />)
}

export default FieldItem