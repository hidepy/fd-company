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
import CommonCheckbox from "./CommonCheckbox"
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'

export default function CommonCheckboxes(props){

    return (
        <FormControl component="fieldset" disabled={!!props.disabled}>
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
            {
                (props.items || [])
                    .map((v, i)=> <CommonCheckbox key={i} name={props.name} {...v} onChange={props.onChange} />)
            }
            </FormGroup>
        </FormControl>
    )
}

CommonCheckboxes.propTypes ={
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        checked: PropTypes.bool,
        label: PropTypes.string,
        value: PropTypes.string,
        color: PropTypes.string,
    }))
}