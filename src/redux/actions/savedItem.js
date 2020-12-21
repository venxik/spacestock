import { SAVE_ITEM, DELETE_ITEM } from "../constants";

const saveItem = (item) => {
  return {
    type: SAVE_ITEM,
    payload: item
  }
}
const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    payload: item
  }
}
export {
  saveItem,
  deleteItem
}
