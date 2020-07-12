// ======================================================================
// Project Name    : fd-app(on github hidepy)
// Creation Date   : 2020/04/30
// 
// Copyright © 2020 hideyuki.kawamura. All rights reserved.
// 
// This source code or any portion thereof must not be  
// reproduced or used in any manner whatsoever.
// ======================================================================

import React from "react"
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FieldItem from "./FieldItem";
import {
  INPUT_FIELD_TYPE_BUTTON,
  INPUT_FIELD_TYPE_BUTTON_LINK,
  INPUT_FIELD_TYPE_ICON_LINK,
  INPUT_FIELD_TYPE_CHECKBOX,
  INPUT_FIELD_TYPE_CHECKBOX_ORIGINAL,
  OUTPUT_FIELD_TYPE_LINK,
  INPUT_FIELD_TYPE_SELECT,
  INPUT_FIELD_TYPE_RADIO
} from "../../constants/common"

import {
  toCommaStr, convServerDatetimeStr2ClientDateTimeStr
} from "../../utils/CommonUtils"

import "./CommonTable.scss"

const isInputComponent = type=> 
  type === INPUT_FIELD_TYPE_BUTTON 
  || type === INPUT_FIELD_TYPE_BUTTON_LINK 
  || type === INPUT_FIELD_TYPE_ICON_LINK 
  || type === INPUT_FIELD_TYPE_CHECKBOX
  || type === INPUT_FIELD_TYPE_CHECKBOX_ORIGINAL
  || type === INPUT_FIELD_TYPE_RADIO
  || type === INPUT_FIELD_TYPE_SELECT
  || type === OUTPUT_FIELD_TYPE_LINK

const isCustomComponent = v=> !!v.customComponent

export default function CommonTable(props){

  const { headerDef, items } = props

    return (
        <Table size="small" className={`common-table ${props.tableClassName || ''}`}>
          <TableHead>
            <TableRow>
            {
              (headerDef || []).map((v, index) => {
                  return (
                    <TableCell key={index}>{v.label}</TableCell>
                  )
              })
            }
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row, rowIndex) => (
              <TableRow key={`${row.id}-${rowIndex}`}>
                    {
                      (headerDef || []).map((v, index)=> {

                        let val = row[v.id]
                        const onChange = (v.onChange || function(){}).bind({...v, rowIndex, value: val })

                        if(v.withComma) val = toCommaStr(val)

                        if(v.withConvServerDatetimeStr2ClientDateTimeStr) val = convServerDatetimeStr2ClientDateTimeStr(val)

                        const RowCustomComponent = row.rowCustomComponent || null

                        return (
                          <TableCell key={index} rowindex={rowIndex} style={{textAlign: v.align || "left", ...v.style}}>
                            {
                              RowCustomComponent
                                ? (<RowCustomComponent {...v} {...row} />)
                                  : isInputComponent(v.type) || isCustomComponent(v)
                                    ? (<FieldItem {...v} id={`${v.id}-${rowIndex}`} rowindex={rowIndex} onChange={onChange} type={v.type} value={val} />)
                                      : val
                            }
                          </TableCell>
                        )
                      })
                        
                    }
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}

CommonTable.propTypes ={
    headerDef: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
}