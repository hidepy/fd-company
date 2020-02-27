/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'data1', 'Tupelo, MS', 'VISA ⠀•••• 3719', 100),
  createData(1, '16 Mar, 2019', 'data2', 'London, UK', 'VISA ⠀•••• 2574', 200),
  createData(2, '16 Mar, 2019', 'data3', 'Boston, MA', 'MC ⠀•••• 1253', 300),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>xx一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>データ1</TableCell>
            {/* <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell> */}
            <TableCell align="right">個数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.date}</TableCell> */}
              <TableCell>{row.name}</TableCell>
              {/* <TableCell>{row.shipTo}</TableCell> */}
              {/* <TableCell>{row.paymentMethod}</TableCell> */}
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          詳細
        </Link>
      </div>
    </React.Fragment>
  );
}
