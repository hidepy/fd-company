// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import React from "react"
import TextField from '@material-ui/core/TextField'
import Select from "./CommonSelect"
import Checkbox from "./CommonCheckbox"
import Checkboxes from "./CommonChechboxes"
import Radio from "./CommonRadio"
import Button from "./CommonButton"
import LinkButton from "./LinkButton"
import IconButton from "./CommonIconButton"
import Table from "./CommonTable"
import Link from "./CommonLink"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    KeyboardDateTimePicker,
  } from '@material-ui/pickers';

import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_DATE,
    INPUT_FIELD_TYPE_DATETIME,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    INPUT_FIELD_TYPE_BUTTON_LINK,
    INPUT_FIELD_TYPE_ICON_LINK,
    OUTPUT_FIELD_TYPE_TEXT,
    OUTPUT_FIELD_TYPE_LINK,
    OUTPUT_FIELD_TYPE_TABLE,
    BREAK_LINE,
    INPUT_FIELD_TYPE_CHECKBOX_ORIGINAL
} from "../../constants/common"
import { getValidVal } from "../../utils/CommonUtils"

const INPUT_TYPE_DEF = {
    [INPUT_FIELD_TYPE_TEXT]: TextField,
    [INPUT_FIELD_TYPE_SELECT]: Select,
    [INPUT_FIELD_TYPE_CHECKBOX]: Checkbox,
    [INPUT_FIELD_TYPE_CHECKBOXES]: Checkboxes,
    [INPUT_FIELD_TYPE_RADIO]: Radio,
    [INPUT_FIELD_TYPE_BUTTON]: Button,
    [INPUT_FIELD_TYPE_BUTTON_LINK]: LinkButton,
    [INPUT_FIELD_TYPE_ICON_LINK]: IconButton,
    [OUTPUT_FIELD_TYPE_LINK]: Link
}

const FieldItem = (props)=> {

    const { type, customComponent, ...rest } = props 
    const Component = INPUT_TYPE_DEF[type] || (()=> <span />)
    const className = `field-item ${props.className ? props.className : ""}`

    if(!!customComponent){
        const CC = props.customComponent

        return (
            <div { ...rest }>
            {
                CC
            }
            </div>
        )
    }

    if(type === BREAK_LINE){
        return (<div />)
    }

    if(type === OUTPUT_FIELD_TYPE_TEXT){
        return (<TextField className={className} disabled={true} {...rest} value={getValidVal(rest.value)} />)
    }

    if(type === OUTPUT_FIELD_TYPE_TABLE){
        return(
            <Table {...rest} />
        )
    }

    if(type === INPUT_FIELD_TYPE_CHECKBOX_ORIGINAL){
        return (
            <input type="checkbox" {...rest} />
        )
    }

    if(type === INPUT_FIELD_TYPE_DATE){

        return(
            <KeyboardDatePicker
                className={className}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                inputlabelprops={{
                    shrink: true,
                }}
                {...rest}
            />
        )
    }

    if(type === INPUT_FIELD_TYPE_DATETIME){
        return(
            <KeyboardDateTimePicker
                className={className}
                disableToolbar
                variant="inline"
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                inputlabelprops={{
                    shrink: true,
                }}
                ampm={false}
                {...rest}
            />
        )
    }


    return (<Component {...rest} inputlabelprops={{
        shrink: true,
      }} className={className} value={getValidVal(rest.value)} />)
}

export default FieldItem
