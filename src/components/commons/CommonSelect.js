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

    return (
        <FormControl className={"field-item common-select"} {...breakpoints}>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>

            <Select
                value={props.value}
                onChange={props.onChange}
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