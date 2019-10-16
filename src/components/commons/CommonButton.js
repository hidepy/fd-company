import React from "react"
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';



export default function CommonButton(props){

    return (
      <Button variant="contained" onClick={props.onChange}>
        {props.label}
      </Button>
    )
}

CommonButton.propTypes ={
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,

}