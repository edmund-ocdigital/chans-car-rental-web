import React from "react"
import SearchItem from "./SearchItem"

import "../../assets/styles/search-list.css"

import carList from "../../data/car-list.json"

// This component should eventually be taking in props from an api call
// to dynamically display data
const SearchList = (props) => {
  const cars = carList["car-list"]
  const searchParameters = props.searchParameters;
  return(
    <>
    { cars.map(( item, id ) => (
      <SearchItem
        key= { id }
        image={ item.img }
        category={ item.catId }
        name={ item.name }
        person={ item.person }
        luggage={ item.luggage }
        doors={ item.doors }
        transmission="Auto"
        oldPrice={ item.price }
        price={ item.price }
        searchParameters = {searchParameters}
      />
    ))}
    </>
  )
}

export default SearchList