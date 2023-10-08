import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceAutocomplete = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await axios.get('https://place-autocomplete1.p.rapidapi.com/autocomplete/json', {
        params: {
          input,
          radius: 500
        },
        headers: {
          'X-RapidAPI-Key': 'ee76a14853msh4e63a069f0979c9p1ee302jsna05ff117a937',
          'X-RapidAPI-Host': 'place-autocomplete1.p.rapidapi.com'
        }
      });
      setSuggestions(response.data.predictions);
    };

    if (input.length > 2) {
      fetchSuggestions();
    }
  }, [input]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion.place_id);
    // Update the address field in your React application here
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter an address"
        value={input}
        onChange={handleChange}
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceAutocomplete;
