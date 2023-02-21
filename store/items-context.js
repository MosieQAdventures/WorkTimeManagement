import { createContext, useEffect, useReducer, useState } from "react";
import { getTimeBetweenDates } from "../util.js/date";
import { getItemFromAS, saveItemToAS, clearItemsFromAS, getAllKeysFromAS } from '../store/async-storage';


export const ItemsContext = createContext({
  items: [],
  addItem: ({idAsync, dateStart, dateEnd, total, description}) => {},
  deleteItem: (id, idAsync) => {},
  updateItem: (id, {idAsync, dateStart, dateEnd, total, description}) => {},

  isStartDisabled: false,
  setIsStartDisabled: () => {},
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
  const [fetchedItems, setFetchedItems] = useState([]);
  const [itemsState, dispatch] = useReducer(itemsReducer, START_ITEMS);
  const [isStartDisabled, setIsStartDisabledValue] = useState(false);

  function addItem(itemData) {
    dispatch({ type: 'ADD', payload: itemData });
  }
  function deleteItem(id) {
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateItem(id, itemData) {
    dispatch({ type: 'UPDATE', payload: {id: id, data: itemData} });
  }

  useEffect(() => {
    async function fetchData() {
      //load from db at the start of the app (once)
      //getItemFromAS('lastAddedItemId', setLastAddedItemId, true, false)
      getItemFromAS('isStartDisabled', setIsStartDisabledValue, false, true)
      
      let keys = [];
      try {
        keys = await getAllKeysFromAS()
        console.log("Keys in context: "+keys.length)
      } catch(e) {
        // read key error
      }

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].startsWith("idAsync")){ //console.log(keys[i])
        } else {//console.log("non idAsync key: " + keys[i])
        }
        
        try {
          getItemFromAS(keys[i], setFetchedItems, false, false)
        } catch(e) {
          //error handling
        }
      }
    }
    
    fetchData();
  }, [])

  //console.log("IS len: "+itemsState.length)
  //console.log("FI len: "+fetchedItems.length)

  useEffect(() => { // for every item in db
    if (fetchedItems[0] != undefined) {
      let item = JSON.parse(fetchedItems[0])
      item.dateStart = new Date(item.dateStart)
      item.dateEnd = new Date(item.dateEnd)
      //console.log(item.dateStart)

      dispatch({ type: 'ADD', payload: item });
    }
  }, [fetchedItems])




  function setIsStartDisabled() {
    let newValue = !isStartDisabled;
    setIsStartDisabledValue(newValue);
    saveItemToAS('isStartDisabled', newValue)
  }

  const value = {
    items: itemsState,
    addItem: addItem,
    deleteItem: deleteItem,
    updateItem: updateItem,

    isStartDisabled: isStartDisabled,
    setIsStartDisabled: setIsStartDisabled,
  }

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}

let START_ITEMS = [
  /*{
    id: 'dummy1',
    idAsync: 'dummy1',
    dateStart: new Date("2023-01-11T08:00:00+01:00"),
    dateEnd: new Date("2023-01-11T15:45:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-01-11T08:00:00+01:00"),new Date("2023-01-11T15:45:00+01:00")), //in hours
    description: "custom notatki",
  },
  {
    id: 'dummy2',
    idAsync: 'dummy2',
    dateStart: new Date("2023-02-14T08:00:00+01:00"),
    dateEnd: new Date("2023-02-14T08:15:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-02-12T08:00:00+01:00"),new Date("2023-02-12T08:15:00+01:00")), //in hours
    description: "custom notatki",
  },
  /*{
    id: 'dummy3',
    idAsync: 'dummy3',
    dateStart: new Date("2023-02-14T08:00:00+01:00"),
    dateEnd: new Date("2023-02-14T16:00:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-02-14T08:00:00+01:00"),new Date("2023-02-14T16:00:00+01:00")), //in hours
    description: "custom notatki",
  },
  {
    id: 'dummy4',
    idAsync: 'dummy4',
    dateStart: new Date("2023-02-16T08:00:00+01:00"),
    dateEnd: new Date("2023-02-16T17:15:00+01:00"),
    total: getTimeBetweenDates(new Date("2023-02-16T08:00:00+01:00"),new Date("2023-02-16T17:15:00+01:00")), //in hours
    description: "custom notatki",
  },*/
];



// updating data when finish clicked
// set isStart variable in db
// block add when isStart = true