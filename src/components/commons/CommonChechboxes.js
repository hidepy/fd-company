import React from "react"
import PropTypes from 'prop-types'
import CommonCheckbox from "./CommonCheckbox"
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'

export default function CommonCheckboxes(props){

    return (
        <FormControl component="fieldset">
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