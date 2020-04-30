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