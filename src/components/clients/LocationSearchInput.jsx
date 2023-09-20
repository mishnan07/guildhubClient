// LocationSearchInput.js
import React, { useState } from 'react';
import Geosuggest from 'react-geosuggest';

function LocationSearchInput() {
  const [suggestions, setSuggestions] = useState([]);

  // Handle location selection
  const onSuggestSelect = (suggest) => {
    if (suggest) {
      console.log('Selected Location:', suggest.label);
      // You can use the selected location here
    }
  };

  // Handle suggestion updates
  const onSuggestNoResults = () => {
    console.log('No suggestions found');
    // You can handle this case, e.g., display a message
  };

  const onSuggestUpdate = (suggests) => {
    setSuggestions(suggests);
  };

  return (
    <div>
      <h3>Location Search</h3>
      <Geosuggest
        placeholder="Search for places in Kerala"
        onSuggestSelect={onSuggestSelect}
        onSuggestNoResults={onSuggestNoResults}
        onSuggestUpdate={onSuggestUpdate}
        location="Kerala" // Set the location to Kerala
        radius="50000" // Set an appropriate radius (in meters) to cover Kerala
        types={['(regions)']} // Limit suggestions to regions (places)
      />
      <ul>
        {suggestions.map((suggest) => (
          <li key={suggest.label}>{suggest.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default LocationSearchInput;
