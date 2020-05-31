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
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'


export default function CommonSelect(props){

    const breakpoints = {}
    const bpDef= ["xs", "sm", "md", "lg", "xl"]

    bpDef.forEach(s=> {
        if(!!props[s]) breakpoints[s] = props[s]
    })

    const handler = (event, v2, v3)=> { props.onChange({selectOptionals: {...props}, ...event}) }

    return (
        <FormControl className={"field-item common-select"} {...breakpoints} style={props.style}>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>

            <Select
                value={props.value}
                //onChange={props.onChange}
                //onChange={myevent.bind(null,"id","name")}
                onChange={handler}
                inputProps={{
                    name: props.name || props.id,
                    id: props.id,
                }}
            >
            {
                (props.items || []).map((v, i)=> (
                    <MenuItem key={i} value={v.value}>{v.label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
    )
}

CommonSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    }))

}