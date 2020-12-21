import { SAVE_ITEM, DELETE_ITEM } from "../constants";

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  savedList: [],
};

const savedItemReducers = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case SAVE_ITEM:
      return {
        ...state, savedList: state.savedList.concat(action.payload)
      }
    case DELETE_ITEM:
      return {
        ...state,
        savedList: state.savedList.filter((item, index) => item.id !== action.payload.id)
      }
    default:
      return state
  }
}
export default savedItemReducers
