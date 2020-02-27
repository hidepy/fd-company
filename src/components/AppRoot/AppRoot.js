import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Auth from "./Auth"

import AppMain from "../AppMain"

import OM0103 from "../OM0103"
import OM0104 from "../../containers/OM0104"
import OM0105 from "../OM0105"

import SignIn from "../SignIn"
import Portal from "../Portal"

import "./AppRoot.scss"
import OM0401 from '../OM0401/OM0401'
import OM0402 from '../OM0402/OM0402'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';


export default class AppRoot extends React.Component{

    render(){

        return (
<MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div id="app">

                    <BrowserRouter>
                        <Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={SignIn} />

                            <Auth isAuthenticated={true}> 
                            {/* TODO: Auth状態 */}
                                <AppMain funcTitle={"fd-app-mock"}>
                                    <Switch>

                                        <Route path={`${process.env.PUBLIC_URL}/portal`} component={Portal} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0103`} component={OM0103} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0104`} component={OM0104} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0105`} component={OM0105} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0401`} component={OM0401} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0402`} component={OM0402} />

                                    </Switch>
                                </AppMain>
                            </Auth>
                        </Switch>
                    </BrowserRouter>
                    
                {/* </Dashboard> */}

            </div>

</MuiPickersUtilsProvider>
        )

    }

}

