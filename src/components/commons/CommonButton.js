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