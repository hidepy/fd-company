import React from "react"
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';



export default function CommonButton(props){

  const { onChange, label, ...rest} = props

  return (
    <Button variant= "contained" onClick={onChange} {...rest}>
      {label}
    </Button>
  )
}

CommonButton.propTypes ={
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
}