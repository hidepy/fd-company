import React from 'react'
import PropTypes from "prop-types"

import Dashboard from "./DashBoard/Dashboard"

export default class AppMain extends React.Component{
    
    static contextTypes = {
        router: PropTypes.object
    }
    
    render(){

        return (

            <div id="app-main">

                <Dashboard funcTitle={this.props.funcTitle}>
                {
                    this.props.children
                }
                </Dashboard>

            </div>
        )

    }

}

