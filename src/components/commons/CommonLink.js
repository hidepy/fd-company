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
import Link from '@material-ui/core/Link'

export default function CommonLink(props){

  const { onChange, value, ...rest} = props

  return (
    <Link href="#" onClick={onChange} {...rest}>
      {value}
    </Link>
  )
}

CommonLink.propTypes ={
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
}