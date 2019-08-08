import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Auth from "./Auth"
import JH0000 from "../JH0000"
import JH0101 from "../JH0101"
import JH0102 from "../JH0102"
import Dashboard from "./DashBoard/Dashboard"


export default class AppRoot extends React.Component{

    constructor(props){

        super(props)

    }


    
    render(){


        return (

            <div id="app">

                <Dashboard>

                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={JH0000} />

                            <Auth isAuthenticated={true}> 
                            {/* TODO: Auth状態 */}
                                <Switch>
                                    <Route path='/JH0101' component={JH0101} />
                                    <Route path='/JH0102' component={JH0102} />
                                </Switch>
                            </Auth>
                        </Switch>
                    </BrowserRouter>
                    
                </Dashboard>

            </div>
        )

    }

}

