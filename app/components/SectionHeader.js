// app/components/SectionHeader.js

import React from 'react';

/**
 * A reusable header component for sections.
 * @param {object} props - The component's properties.
 * @param {string} props.title - The main heading text.
 * @param {string} props.description - The paragraph text below the heading.
 */
const SectionHeader = ({ title, description }) => {
  return (
    // Note: The outer div with className "timeline-section" provides the dark background.
    // You can wrap this component in a different div if you need another background color.
    <div className="timeline-section">
      <div className="timeline-header">
        <h1 className="newscrollh1">{title}</h1>
        <p className="newscrollp">{description}</p>
      </div>
    </div>
  );
};

export default SectionHeader;