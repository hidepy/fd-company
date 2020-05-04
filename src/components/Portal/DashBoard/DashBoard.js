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
import DashBoardOnedayDetail from './DashBoardOnedayDetail';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },



  modal: {
    height: "100%",
    overflowY: "scroll",
    padding: "8px",
    backgroundColor: "rgb(255, 255, 255)",
  }
}));

export default function DashBoard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);



  const data = [...Array.from(new Array(31)).keys()]
    .map(i => {

      const day = i + 1

      return {
        name: "" + day + "日",
        urag: Math.random() * 10000,
        hiyo: Math.random() * 10000 * 0.85,
      }
    })

  const onUragHiyoClick = (data, i) => {
    setOpen(true)
  }

  return (

    <div className={classes.root}>

      <Container maxWidth="lg" className={classes.container}>

        <Grid container spacing={3}>

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>レコメンド</Title>

                <div>
                  <ul>
                    <li>
                      2/21の案件実績を確認しましょう。請求金額の見直しの余地がありそうです。
                    </li>
                    <li>
                      XXX
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
              <UragRekPaper title={"今月の売上"} leadComment={"あと1,500,000円で目標達成です！"} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
              <UragRekPaper title={"今月の利益"} />
            </Paper>
          </Grid>

        </Grid>

        <Grid container spacing={3}>

          <Grid item xs={12} md={12} lg={12}>

            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>日次の売上/費用</Title>

                <div style={{ textAlign: "center" }}>
                  <BarChart width={1100} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="売上" dataKey="urag" fill="#8884d8" onClick={onUragHiyoClick} />
                    <Bar name="費用" dataKey="hiyo" fill="#82ca9d" />
                  </BarChart>
                </div>

              </React.Fragment>
            </Paper>

          </Grid>

        </Grid>


        <Modal
          open={open}
          onClose={()=> setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {
            <div style={getModalStyle()} className="contents-wrap">

              <div className={classes.modal}>
                <DashBoardOnedayDetail />
              </div>

            </div>

          }
        </Modal>

      </Container>

    </div>
  );
}
