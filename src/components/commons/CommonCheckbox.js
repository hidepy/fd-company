import React from "react"
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'


export default function CommonCheckbox(props){

    return (
        <FormControlLabel
            control={
            <Checkbox
                checked={props.checked}
                onChange={props.onChange}
                value={props.value}
                color={props.color}
            />
            }
            label={props.label}
        />
    )
}

CommonCheckbox.propTypes ={
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    color: PropTypes.string,
}