import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 2) { 
        try {
          const response = await axios.get(`/api/places?location=${input}`);
          setSuggestions(response.data.predictions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [input]);

  const handleSelectSuggestion = async (placeId) => {
    try {
      const { data } = await axios.get(`/api/coordinatesByPlaceId?placeId=${placeId}`);
      navigate(`/weather/${data.lat}/${data.lng}`);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <div>
      <input
        // className="border-4 border-black rounded p-2"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for cities"
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelectSuggestion(suggestion.place_id)}>
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
