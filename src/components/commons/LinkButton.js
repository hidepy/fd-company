import React from "react"
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';



export default function LinkButton(props){

  const { onChange, label,  ...rest} = props

  

  return (
    <Button onClick={onChange} {...rest}>
      {label}
    </Button>
  )
}

LinkButton.propTypes ={
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
}