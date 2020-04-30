import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {Link} from "react-router-dom";

export const mainListItems = (props)=> {

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        {/* <ListItemText primary="ポータル" /> */}
        <div className="MuiListItemText-root">
          <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/portal`}>ポータル</Link>
          </span>
        </div>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="OM0103-見積依頼の登録(物事)" /> */}

        <div className="MuiListItemText-root">
          <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0103`}>OM0103-見積依頼の登録(物事)</Link>
          </span>
        </div>

      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="OM0104-見積一覧の確認(物事)" /> */}
        <div className="MuiListItemText-root">
          <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0104`}>OM0104-見積一覧の確認(物事)</Link>
          </span>
        </div>
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <div className="MuiListItemText-root">
          <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0105`}>OM0105-見積回答の作成</Link>
          </span>
        </div>
      </ListItem> */}
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <div className="MuiListItemText-root">
          <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0401`}>OM0401-請求一覧</Link>
          </span>
        </div>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <div className="MuiListItemText-root">
          <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0402`}>OM0402-請求書作成</Link>
          </span>
        </div>
      </ListItem>

    </div>
  )
};
