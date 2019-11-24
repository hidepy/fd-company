import React from 'react';

import FetchUtils from "../../utils/FetchUtils"
import {
  API_TGT_ROLES
} from "../../constants/httpRequest"

export default class Portal extends React.Component{

  onTestClick(){
    FetchUtils.get(API_TGT_ROLES)
  }

  render(){
    return(
      <div>
        ここがTOPページ

        <button onClick={this.onTestClick}>REST API テスト!!</button>
      </div>
    )
  }

}