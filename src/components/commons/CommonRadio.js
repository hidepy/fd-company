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
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { isEmpty, isValidUrl, getValidVal, getValidStrVal } from "../../utils/CommonUtils";


export default function CommonRadio(props){
    const {value: _value, className, label, name, onChange, disabled, style, required } = props

    // const radioVal = !isEmpty(_value) ? "" + _value : ""
    const radioVal = getValidStrVal(_value)

    return (
    <div className={`MuiFormControl-root ${className}`} style={style || {}}>
        <FormControl component="fieldset" disabled={!!disabled} required={required}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                aria-label={name}
                name={name}
                value={radioVal}
                onChange={onChange}
                row
            >
                {
                    (props.items || []).map((v, i)=> {
                        return (
                            <FormControlLabel key={i} value={v.value} control={<Radio />} label={v.label} />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    </div>
    )
}

CommonRadio.propTypes ={
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.label,
    }))

}