import React from 'react'

// const person = {
//     name: "John",
//     age: 36,
//     location: 'gotham city'
// }
//  De structure the object ^
// const {name, age, location} = person;
'// de structures the props given through the values in its called component function'
const Search = ({searchTerm, setSearchTerm}) => {
    // searchTerm = 'i a, batmand not' // dont do this
    return (
        <div className="search">
            <div>
                <img src='search.svg' alt="search" />

                <input type="text"
                placeholder='Search through thousands of movies'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
        </div>
    )
}
export default Search
