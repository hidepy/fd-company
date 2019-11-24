import { RECEIVE_MTMR_LIST } from "../actions/OM0104"

const initialState = {
    mtmrList: [],
}

export default function(state = initialState, action){

    switch (action.type) {
      case RECEIVE_MTMR_LIST:
        return Object.assign({}, state, {
            mtmrList: action.payload.mtmrList
        })

      default:
        return state
    }
  }