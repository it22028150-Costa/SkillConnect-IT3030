import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import "./SearchComponent.css";
import SearchUserCard from "./SearchUserCard";

const SearchComponent = ({ setIsSearchVisible }) => {
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchUser = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const data = {
        jwt: token,
        query,
      };
      dispatch(searchUserAction(data));
    }
  };
  
  const debouncedHandleSearchUser = debounce(handleSearchUser, 500);

  return (
    <div className="search-container">
      <div className="px-3 pb-5">
        <input
          onChange={(e) => debouncedHandleSearchUser(e.target.value)}
          className="search-input"
          type="text"
          placeholder="Search users..."
          autoFocus
        />
      </div>

      <hr />
      
      <div className="px-3 pt-5 search-results">
        {searchQuery.trim() === "" ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <p className="text-center">Enter a name or username to search</p>
          </div>
        ) : !user?.searchResult || user?.searchResult?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold">No users found</p>
            <p className="text-sm text-gray-500">Try searching with a different name</p>
          </div>
        ) : (
          user?.searchResult?.map((item) => (
            <SearchUserCard 
              setIsSearchVisible={setIsSearchVisible} 
              key={item.id} 
              username={item.username} 
              image={item?.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
