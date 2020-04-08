import React from "react"
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';

export default function CommonIconButton(props){

  const { onChange, label, icon, ...rest} = props

  const IconComponent = icon

  return (
    <IconButton onClick={onChange} {...rest}>
    {
        IconComponent
    }
    </IconButton>
  )
}

CommonIconButton.propTypes ={
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
}