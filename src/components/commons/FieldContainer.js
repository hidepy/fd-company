import React from "react"
import FieldItem from "./FieldItem"

const FieldContainer = (props)=> {

    return (props.items || [])
        .map((v, i)=> (<FieldItem key={i} {...v} />))

}

export default FieldContainer