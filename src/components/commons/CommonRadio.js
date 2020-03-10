import React from "react"
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export default function CommonRadio(props){

    //const _value = props.value || ""
    const {value: _value, className, label, name, onChange, disabled, style } = props

console.log(props)

    return (
    <div className={`MuiFormControl-root ${className}`} style={style || {}}>
        <FormControl component="fieldset" disabled={!!disabled}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                aria-label={name}
                name={name}
                value={_value}
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