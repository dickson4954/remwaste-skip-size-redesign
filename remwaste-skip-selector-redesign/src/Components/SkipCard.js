import React from 'react';
import './SkipCard.css';

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const {
    size = 'Unknown',
    price_before_vat = 'N/A',
    image,
    hire_period_days
  } = skip;

  const price = price_before_vat;
  const hirePeriod = hire_period_days
    ? `${hire_period_days} day hire included`
    : '14 day hire included';

  const defaultImage =
    'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={`skip-card-wrapper ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${size} yard skip`}
    >
      <div className="skip-card-float">
        <div className="skip-image-container" aria-hidden="true">
          <img
            loading="lazy"
            src={image || defaultImage}
            alt={`${size} yard skip`}
            className="skip-img"
          />
          <span className="badge" aria-label={`${size} yard skip size`}>
            {size} yard
          </span>
        </div>

        <div className="skip-content">
          <h3>{size} Yard Skip</h3>
          <p className="hire-period">{hirePeriod}</p>
          <p className="skip-price">£{price}</p>
          <button
            className={`select-skip-btn ${isSelected ? 'active' : ''}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation(); 
              onSelect();
            }}
            aria-pressed={isSelected}
            aria-label={
              isSelected
                ? `${size} yard skip selected`
                : `Select ${size} yard skip`
            }
          >
            {isSelected ? '✓ Selected' : 'Select This Skip →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
