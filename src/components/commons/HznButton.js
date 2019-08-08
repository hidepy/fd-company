import React from "react"
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import "./HznButton.scss"

export default function HznButton(props){
    return (
        <Button variant="contained" color="primary" className="hzn-button" onClick={props.onClick}>
            { props.text }
        </Button>
    )
}

HznButton.propTypes ={
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}