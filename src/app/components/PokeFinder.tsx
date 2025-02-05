'use client'

import { useFetch } from "../hooks/useFetch";
import { PokemonBasicInfo, PokemonDetailedInfo } from "../interface";
import { useState } from 'react';
import { useFetchMany } from "../hooks/useFetchMany";
import PokemonCard from "../components/PokemonCard";


const itemsPerPage = 20;  // Number of items to display per page

export default function Home() {

  // Fetch data 
  const { data: poke_list, error: error_list } = useFetch<PokemonBasicInfo>(
    "https://pokeapi.co/api/v2/pokemon?limit=1500"
  );



  // Query
  const [searchQuery, setSearchQuery] = useState('');
 
  const filteredItems = poke_list.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


  // Fetch page detail
  const { data: poke_details, loading: loading_details, error: error_details } = useFetchMany<PokemonDetailedInfo>(
    currentItems.map(item=>`${item.url}`),[searchQuery,currentPage]
  );
  


  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  
  if (error_details) {
    return (
          <div className="text-red-500">
            <p>Error loading Pokemon details: {error_details}</p>
          </div>
    );
  }
  
  if (error_list) {
    return (
          <div className="text-red-500">
            <p>Error loading Pokemon list: {error_list}</p>
          </div>
    );
  }
  return (
    <>
        {/* Search Bar */}
        <div className="mb-6 w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-2xl p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <h1 className="text-4xl font-bold my-5">Resultados de la busqueda</h1>
        { /* Pokemon List */
        searchQuery &&
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <p className="text-gray-500">No items found</p>
            ) : (
              (!loading_details ) 
              ?
              currentItems.map((poke_list, index) => (
                <div key={index} className="">
                  { poke_details[index] && <PokemonCard pokemon={poke_details[index]}  /> }
                </div>
              ))
              :
                  <div className="flex justify-center items-center h-200">
                    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                  </div>
            )}
          </div>
        }
        
        {/* Pagination */
        searchQuery && filteredItems.length > 20 && !loading_details &&
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="mx-2 self-center">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredItems.length}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
        }
    </>
  );
}
