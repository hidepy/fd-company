import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Auth from "./Auth"

import AppMain from "../AppMain"

import OM0103 from "../OM0103"
import OM0104 from "../OM0104"

import SignIn from "../SignIn"
import Portal from "../Portal"

import "./AppRoot.scss"

export default class AppRoot extends React.Component{

    render(){

        return (

            <div id="app">

                {/* <Dashboard> */}

                    <BrowserRouter>
                        <Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={SignIn} />

                            <Auth isAuthenticated={true}> 
                            {/* TODO: Auth状態 */}
                                <AppMain funcTitle={"fd-appもっく"}>
                                    <Switch>

                                        <Route path={`${process.env.PUBLIC_URL}/portal`} component={Portal} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0103`} component={OM0103} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0104`} component={OM0104} />

                                    </Switch>
                                </AppMain>
                            </Auth>
                        </Switch>
                    </BrowserRouter>
                    
                {/* </Dashboard> */}

            </div>
        )

    }

}

