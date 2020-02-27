import React from "react"
import TextField from '@material-ui/core/TextField'
import Select from "./CommonSelect"
import Checkbox from "./CommonCheckbox"
import Checkboxes from "./CommonChechboxes"
import Radio from "./CommonRadio"
import Button from "./CommonButton"
import LinkButton from "./LinkButton"
import Table from "./CommonTable"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import {
    INPUT_FIELD_TYPE_TEXT,
    INPUT_FIELD_TYPE_DATE,
    INPUT_FIELD_TYPE_SELECT,
    INPUT_FIELD_TYPE_CHECKBOX,
    INPUT_FIELD_TYPE_CHECKBOXES,
    INPUT_FIELD_TYPE_RADIO,
    INPUT_FIELD_TYPE_BUTTON,
    INPUT_FIELD_TYPE_BUTTON_LINK,
    OUTPUT_FIELD_TYPE_TEXT,
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
    [INPUT_FIELD_TYPE_BUTTON_LINK]: LinkButton,
}

const FieldItem = (props)=> {

    const { type, ...rest } = props 
    const Component = INPUT_TYPE_DEF[type] || (()=> <span />)

    if(!!props.customComponent){
        return props.customComponent
    }

    if(type === BREAK_LINE){
        return (<div />)
    }

    if(type === OUTPUT_FIELD_TYPE_TEXT){
        return (<TextField className="field-item" disabled={true} {...rest} />)
    }

    if(type === OUTPUT_FIELD_TYPE_TABLE){
        return(
            <Table {...rest} />
        )
    }

    if(type === INPUT_FIELD_TYPE_DATE){
        return(
            <KeyboardDatePicker
                className="field-item"
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                // margin="normal"
                // id="date-picker-inline"
                // label="Date picker inline"
                // value={selectedDate}
                // onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                {...rest}
            />
        )
    }


    return (<Component {...rest} className={"field-item"} />)
}

export default FieldItem
