import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SkipCard from './SkipCard';
import './SkipSelectionPage.css';

const SkipSelectionPage = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  
  useEffect(() => {
    axios
      .get('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then((res) => {
        console.log('Fetched skips:', res.data);
        setSkips(res.data);
      })
      .catch((err) => console.error('Error fetching skips:', err));
  }, []);
  
  return (
    <div className="skip-selection-page">
      <header>
        <h1>Choose Your Skip</h1>
        <p>Select the skip size that fits your needs best.</p>
      </header>
      <div className="skip-list">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip?.id === skip.id}
            onSelect={() => setSelectedSkip(skip)}
          />
        ))}
      </div>
      <div className="skip-footer-bar">
        <span>{selectedSkip ? `${selectedSkip.size} Yard Skip` : 'Select a Skip'}</span>
        <span>
          {selectedSkip ? `£${selectedSkip.price_before_vat} 14 day hire` : '£--- 14 day hire'}
        </span>
      </div>
      <div className="action-buttons">
        <button className="back-btn">← Back</button>
        <button className="next-btn" disabled={!selectedSkip}>
          Continue →
        </button>
      </div>
    </div>
  ); 
};
export default SkipSelectionPage;
