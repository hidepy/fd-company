// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

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

