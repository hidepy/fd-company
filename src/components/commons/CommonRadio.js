import React from "react"
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export default function CommonRadio(props){

    return (
    <div className={`MuiFormControl-root ${props.className}`}>
        <FormControl component="fieldset" >
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup
                aria-label={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                row
            >
                {
                    (props.items || []).map(v=> {
                        return (
                            <FormControlLabel value={v.value} control={<Radio />} label={v.label} />
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