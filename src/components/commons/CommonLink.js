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