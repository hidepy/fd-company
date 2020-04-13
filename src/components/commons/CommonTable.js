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
  OUTPUT_FIELD_TYPE_LINK
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
  || type === OUTPUT_FIELD_TYPE_LINK

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
            {items.map((row, rowIndex) => (
              <TableRow key={`${row.id}-${rowIndex}`}>
                    {
                      (headerDef || []).map((v, index)=> {

                        let val = row[v.id]
                        const onChange = (v.onChange || function(){}).bind({...v, rowIndex, value: val })

                        if(v.withComma) val = toCommaStr(val)

                        return (
                          <TableCell key={index} style={{textAlign: v.align || "left", ...v.style}}>
                            {
                              isInputComponent(v.type)
                                ? (<FieldItem {...v} onChange={onChange} type={v.type} value={val} />)
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