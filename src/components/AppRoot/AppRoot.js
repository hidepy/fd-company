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
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Auth from "./Auth"

import AppMain from "../AppMain"

import OM0103 from "../../containers/OM0103"
import OM0104 from "../../containers/OM0104"
import OM0105 from "../../containers/OM0105"
import OM0301 from "../../containers/OM0301"
import OM0305 from "../../containers/OM0305"
import OM0401 from '../../containers/OM0401'
import OM0402 from '../../containers/OM0402'
import OM0403 from "../../containers/OM0403"

import SignIn from "../SignIn"
import Portal from "../Portal"

import "./AppRoot.scss"

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { isValidUrl } from '../../utils/CommonUtils'


export default class AppRoot extends React.Component {

    async componentDidMount(){
        // 共通データの取得 TODO: コード取得が終わるまでは画面操作不可にする
        const res = await this.props.getMstCdLst()

        console.log(res)

        // データready OKの場合にapp readyフラグを更新
        if(res.success){
            this.props.setIsAppReady(true)
        }
    }

    render() {

        return isValidUrl() && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div id="app">

                    <BrowserRouter>
                        <Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={SignIn} />

                            <Auth isAuthenticated={true && this.props.AppRoot.isAppReady}>

                                <AppMain funcTitle={"Ascend Logi"}>
                                    <Switch>

                                        <Route path={`${process.env.PUBLIC_URL}/portal`} component={Portal} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0103`} component={OM0103} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0104`} component={OM0104} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0105`} component={OM0105} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0301`} component={OM0301} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0305`} component={OM0305} />

                                        <Route path={`${process.env.PUBLIC_URL}/OM0401`} component={OM0401} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0402`} component={OM0402} />
                                        <Route path={`${process.env.PUBLIC_URL}/OM0403`} component={OM0403} />

                                    </Switch>
                                </AppMain>
                            </Auth>
                        </Switch>
                    </BrowserRouter>

                </div>

            </MuiPickersUtilsProvider>
        )

    }

}

