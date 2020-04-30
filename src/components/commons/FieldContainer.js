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
import FieldItem from "./FieldItem"

const FieldContainer = (props)=> {

    return (props.items || [])
        .map((v, i)=> (<FieldItem key={i} {...v} />))

}

export default FieldContainer