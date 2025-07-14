import React, { Dispatch, SetStateAction } from "react";

// const person = {
//     name: "John",
//     age: 36,
//     location: 'gotham city'
// }
//  De structure the object ^
// const {name, age, location} = person;
// de structures the props given through the values in its called component function
interface SearchProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  className?: string; // Make className optional with '?'
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex w-full">
      <input
        className="bg-gray-300 w-full px-4 py-3 rounded-lg max-w-3xl mx-auto"
        type="text"
        placeholder="Search Teachers/Classes"
        value={searchTerm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(event.target.value)
        }
      />
    </div>
  );
};

export default Search;
