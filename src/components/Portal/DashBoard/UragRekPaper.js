// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import _ from "lodash"
import FieldItem from "../../commons/FieldItem"
import {
  INPUT_FIELD_TYPE_TEXT,
  INPUT_FIELD_TYPE_SELECT,
  INPUT_FIELD_TYPE_CHECKBOX,
  INPUT_FIELD_TYPE_CHECKBOXES,
  INPUT_FIELD_TYPE_RADIO,
  INPUT_FIELD_TYPE_BUTTON,
  INPUT_FIELD_TYPE_ICON_LINK,
  OUTPUT_FIELD_TYPE_LINK,
  OUTPUT_FIELD_TYPE_TABLE,
  INPUT_FIELD_TYPE_BUTTON_LINK
} from "../../../constants/common"
import {
  showAlertMsg,
  onTextChange,
  onSelectChange,
  onRadioChange,
  convServerDatetimeStr2ClientDateTimeStr,
} from "../../../utils/CommonUtils"

const useStyles = makeStyles({
  leadText: {
    fontWeight: "bold"
  }
});

export default class UragRekPaper extends React.Component {

  constructor(props) {

    super(props)

    const jissekiTableData = [
      {
        name: "2020/03",
        jisseki: 1800000,
        mikomi: 3500000,
        mokuhyo: 5000000
      }
    ]

    this.state = {
      jissekiTableData,
      uragRekList: []
    }

    this.onTextChange = onTextChange(this)
    this.onSelectChange = onSelectChange(this)
    this.onRadioChange = onRadioChange(this)

    this.itemDef4SearchedList = [{
      type: OUTPUT_FIELD_TYPE_TABLE, id: "mtmrLst", label: "見積一覧",
      headerDef: [
        { type: INPUT_FIELD_TYPE_TEXT, id: "label", label: "", onChange: this.onTextChange("trhkSkKishNm") },
        { type: INPUT_FIELD_TYPE_TEXT, id: "urag", label: "売上(円)", onChange: this.onTextChange("trhkSkKishNm") },
        { type: INPUT_FIELD_TYPE_TEXT, id: "kensu", label: "件数", onChange: this.onTextChange("shukKiboNtj") },
        { type: INPUT_FIELD_TYPE_TEXT, id: "tnk", label: "平均単価(円)", onChange: this.onTextChange("shukskNm") },
      ],
      items: []
    }]

  }

  componentDidMount() {
    this.setState({
      uragRekList: [
        { label: "目標", urag: 5000000, kensu: 100, tnk: 50000 },
        { label: "見込", urag: 3500000, kensu: 50, tnk: 70000 },
        { label: "差分", urag: -1500000, kensu: -50, tnk: 20000 },
      ]
    })
  }

  uragRekTableCreator(items) {

    this.itemDef4SearchedList[0].items = items || []

    return this.itemDef4SearchedList

  }


  render() {

    const classes = this.props

    const jissekiTableData = [
      {
        name: "2020/03",
        jisseki: 1800000,
        mikomi: 3500000,
        mokuhyo: 5000000
      }
    ]

    return (
      <React.Fragment>
        <Title>{this.props.title}</Title>

        <p className={classes.fontWeight}>{this.props.leadComment}</p>

        {/* <Typography component="p" variant="h4">
        198,798円
      </Typography> */}

        <BarChart width={500} height={250} data={jissekiTableData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="jisseki" stackId="a" fill="#113399" />
          <Bar dataKey="mikomi" stackId="a" fill="#3388bb" />
          <Bar dataKey="mokuhyo" stackId="a" fill="#aaccff" />
        </BarChart>

        <div>
          {
            this.uragRekTableCreator(_.get(this.state, "uragRekList", [])).map((v, i) => (<FieldItem key={i} {...v} xs={12} md={4} />))
          }
        </div>


        {/* <Typography color="textSecondary" className={classes.depositContext}>
        2019/12/30
      </Typography>

      <div>
        <Link color="primary" href="javascript:;">
          詳細を見る
        </Link>
      </div> */}

      </React.Fragment>
    )
  }
}
