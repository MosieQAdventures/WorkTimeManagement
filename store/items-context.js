import { createContext, useReducer } from "react";
import { getTimeBetweenDates } from "../util.js/date";

export const ItemsContext = createContext({
  items: [],
  addItem: ({dateStart, dateEnd, total, description}) => {},
  deleteItem: (id) => {},
  updateItem: (id, {dateStart, dateEnd, total, description}) => {},
});

function itemsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state]
    case 'UPDATE':
      const updatableItemIndex = state.findIndex((item) => item.id === action.payload.id);
      const updatableItem = state[updatableItemIndex];
      const updatedItem = { ...updatableItem, ...action.payload.data};
      const updatedItems = [...state];
      updatedItems[updatableItemIndex] = updatedItem;
      return updatedItems;
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload)
    default:
      return state;
  }
}

export default function ItemsContextProvider({children}) {
  const [itemsState, dispatch] = useReducer(itemsReducer, DUMMY_ITEMS);

  function addItem(itemData) {
    dispatch({ type: 'ADD', payload: itemData });
  }
  function deleteItem(id) {
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateItem(id, itemData) {
    dispatch({ type: 'UPDATE', payload: {id: id, data: itemData} });
  }

  const value = {
    items: itemsState,
    addItem: addItem,
    deleteItem: deleteItem,
    updateItem: updateItem,
  }  

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}


const DUMMY_ITEMS = [
  {
    id: 'date1',
    dateStart: new Date("2023-01-11T08:00:00+01:00"),
    dateEnd: new Date("2023-01-11T15:45:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-01-11T08:00:00+01:00"),new Date("2023-01-11T15:45:00+01:00")), //in hours
    description: "custom notatki",
  },
  {
    id: 'date2',
    dateStart: new Date("2023-02-12T08:00:00+01:00"),
    dateEnd: new Date("2023-02-12T08:15:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-02-12T08:00:00+01:00"),new Date("2023-02-12T08:15:00+01:00")), //in hours
    description: "custom notatki",
  },
  {
    id: 'date3',
    dateStart: new Date("2023-02-14T08:00:00+01:00"),
    dateEnd: new Date("2023-02-14T16:00:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-02-14T08:00:00+01:00"),new Date("2023-02-14T16:00:00+01:00")), //in hours
    description: "custom notatki",
  },
  {
    id: 'date4',
    dateStart: new Date("2023-02-16T08:00:00+01:00"),
    dateEnd: new Date("2023-02-16T17:15:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-02-16T08:00:00+01:00"),new Date("2023-02-16T17:15:00+01:00")), //in hours
    description: "custom notatki",
  },
];