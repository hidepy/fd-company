import React from "react"
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function CommonTable(props){

  const { headerDef, items } = props

    return (
        <Table size="small">
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
                      (headerDef || []).map((v, index)=> (
                        <TableCell key={index}>{row[v.id]}</TableCell>
                      ))
                        
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