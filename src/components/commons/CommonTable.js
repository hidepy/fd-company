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
  INPUT_FIELD_TYPE_CHECKBOX
} from "../../constants/common"

import {
  toCommaStr
} from "../../utils/CommonUtils"

import "./CommonTable.scss"

const isInputComponent = type=> 
  type === INPUT_FIELD_TYPE_BUTTON 
  || type === INPUT_FIELD_TYPE_BUTTON_LINK 
  || type === INPUT_FIELD_TYPE_ICON_LINK 
  || type === INPUT_FIELD_TYPE_CHECKBOX

export default function CommonTable(props){

  const { headerDef, items } = props

    return (
        <Table size="small" className="common-table">
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
            {items.map(row => (
              <TableRow key={row.id}>
                    {
                      (headerDef || []).map((v, index)=> {

                        let val = row[v.id]

                        if(v.withComma) val = toCommaStr(val)

                        return (
                        <TableCell key={index} style={{textAlign: v.align || "left"}}>
                          {
                            isInputComponent(v.type)
                              ? (<FieldItem {...v} type={v.type} value={val} />)
                                : val
                          }
                        </TableCell>
                      )})
                        
                    }
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}

CommonTable.propTypes ={
    headerDef: PropTypes.array.isRequired,
    items: PropTypes.func.isRequired,
}