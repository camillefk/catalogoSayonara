import './searchBar.css';

const SearchBar = ({ placeholder }) => {
    return (
      <input type="text" placeholder={placeholder} className="search-input" />
    );
  };
  
  export default SearchBar;
  