import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
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

        <div class="MuiListItemText-root">
          <span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0103`}>OM0103-見積依頼の登録(物事)</Link>
          </span>
        </div>

      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="OM0104-見積一覧の確認(物事)" /> */}
        <div class="MuiListItemText-root">
          <span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
            <Link to={`${process.env.PUBLIC_URL}/OM0104`}>OM0104-見積一覧の確認(物事)</Link>
          </span>
        </div>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </div>
  )
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
