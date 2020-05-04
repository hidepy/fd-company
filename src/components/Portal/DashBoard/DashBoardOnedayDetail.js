// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Title from "./Title"
import UragRekPaper from "./UragRekPaper"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getModalStyle } from '../../../utils/CommonUtils';
import Modal from '@material-ui/core/Modal';
import { OUTPUT_FIELD_TYPE_TABLE, INPUT_FIELD_TYPE_TEXT } from '../../../constants/common';
import FieldItem from '../../commons/FieldItem';

import styles from "./DashBoardOnedayDetail.module.scss"

export default class DashBoardOnedayDetail extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            rekUragInf: [{ name: "1日", urag: 123456, hiyo: 45678 }]
        }



        // 売上, コスト, 利益, 利益率, 案件数, 要確認案件
        this.itemDef4JsskDetailList = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "mtmrLst", label: "",
            headerDef: [
                { type: INPUT_FIELD_TYPE_TEXT, id: "trhkSkKishNm", label: "会社名", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "shukskNm", label: "集荷先名", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "hisoskNm", label: "配送先名", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "kyoriTi", label: "距離帯", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "juryoTi", label: "重量帯", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "rek", label: "利益", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "urag", label: "売上", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "cost", label: "コスト", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "yoKknn", label: "要確認", },
            ],
            items: []
        }]

        this.itemDef4JsskOnedayDetailList = [{
            type: OUTPUT_FIELD_TYPE_TABLE, id: "mtmrLst2", label: "",
            headerDef: [
                { type: INPUT_FIELD_TYPE_TEXT, id: "urag", label: "売上", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "cost", label: "コスト", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "rek", label: "利益", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "rekrt", label: "利益率", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "anknsu", label: "案件数", },
                { type: INPUT_FIELD_TYPE_TEXT, id: "yoKknn", label: "要確認案件", },
            ],
            items: []
        }]

    }


    jsskTableCreator() {

        const items = []

        for (let i = 0; i < 10; i++) {
            const item = {
                trhkSkKishNm: "取引先会社" + i,
                shukskNm: "集荷先" + i,
                hisoskNm: "配送先" + i,
                kyoriTi: i * 5,
                juryoTi: i * 4,
                rek: i * 14,
                urag: i * 19,
                cost: i * 5,
                yoKknn: "",

            }

            items.push(item)
        }

        this.itemDef4JsskDetailList[0].items = items

        return this.itemDef4JsskDetailList
    }

    jsskOnedayTableCreator() {

        const items = []

        for (let i = 0; i < 1; i++) {
            const item = {
                trhkSkKishNm: "取引先会社" + i,
                shukskNm: "集荷先" + i,
                hisoskNm: "配送先" + i,
                urag: 312500,
                cost: 262500,
                rek: 50000,
                rekRt: 16,
                anknsu: 5,
                yoKknn: 2,
            }

            items.push(item)
        }

        this.itemDef4JsskOnedayDetailList[0].items = items

        return this.itemDef4JsskOnedayDetailList
    }


    render() {

        return (

            <div>

                <Container maxWidth="lg">

                    <Grid container spacing={3}>

                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={styles.jsskSmr__paper}>
                                <React.Fragment>
                                    <Title>実績サマリ</Title>

                                    <div className={styles.jsskSmr__wrap}>
                                        <div className={styles.jsskSmr__item}>
                                            <BarChart width={250} height={250} data={this.state.rekUragInf}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar name="売上" dataKey="urag" fill="#8884d8" />
                                                <Bar name="費用" dataKey="hiyo" fill="#82ca9d" />
                                            </BarChart>
                                        </div>

                                        <div className={styles.jsskSmr__item}>
                                            {
                                                this.jsskOnedayTableCreator().map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                                            }
                                        </div>

                                    </div>

                                </React.Fragment>
                            </Paper>
                        </Grid>



                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={styles.jsskSmr__paper}>
                                <React.Fragment>
                                    <Title>実績詳細</Title>

                                    {
                                        this.jsskTableCreator().map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} value={this.state[v.id]} />))
                                    }

                                </React.Fragment>
                            </Paper>
                        </Grid>




                    </Grid>

                </Container>

            </div>
        )
    }
}
