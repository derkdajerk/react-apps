import React from "react";

// const person = {
//     name: "John",
//     age: 36,
//     location: 'gotham city'
// }
//  De structure the object ^
// const {name, age, location} = person;
// de structures the props given through the values in its called component function
const Search = ({ searchTerm, setSearchTerm }) => {
  // searchTerm = 'i a, batmand not' // dont do this
  return (
    <div className="flex w-full">
      <input
        className="bg-gray-300 w-full px-4 py-3 rounded-lg max-w-3xl mx-auto"
        type="text"
        placeholder="Search Teachers/Classes"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
};
export default Search;
