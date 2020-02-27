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
}));

export default function DashBoard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>

      {/* <main className={classes.content}> */}
        
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={3}>

          <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>今月の利益</Title>
                  <Typography component="p" variant="h4">
                    198,798円
                  </Typography>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    2019/12/30
                  </Typography>
                  <div>
                    <Link color="primary" href="javascript:;">
                      詳細を見る
                    </Link>
                  </div>
                </React.Fragment>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>今月の売上</Title>
                  <Typography component="p" variant="h4">
                    398,798円
                  </Typography>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    2019/12/30
                  </Typography>
                  <div>
                    <Link color="primary" href="javascript:;">
                      詳細を見る
                    </Link>
                  </div>
                </React.Fragment>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>今月の費用</Title>
                  <Typography component="p" variant="h4">
                    200,000円
                  </Typography>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    2019/12/30
                  </Typography>
                  <div>
                    <Link color="primary" href="javascript:;">
                      詳細を見る
                    </Link>
                  </div>
                </React.Fragment>
              </Paper>
            </Grid>


            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Chart
                  title={"本日"}
                  yaxisLabel={"売上(円)"}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Chart
                  title={"昨日"}
                  yaxisLabel={"売上(円)"}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Orders />
              </Paper>
            </Grid>

          </Grid>

        </Container>

      {/* </main> */}
    </div>
  );
}
