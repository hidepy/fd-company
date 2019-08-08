import React from 'react'
import { Redirect } from 'react-router-dom'

const Auth = (props) => {
    return (
        props.isAuthenticated ? props.children : <Redirect to={'/'}/>
    )
}

export default Auth