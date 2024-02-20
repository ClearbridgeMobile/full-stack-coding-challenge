import React from 'react';
import { truncateDescription } from '../utils/commonUtils';

const CompanyPanel = ({ company }) => {
  return (
    <div className="company-panel">
      <div className="company-info">
        <p className="company-name" >
          {company.name}
        </p>
        <p className="company-location">{`${company.city}, ${company.state}`}</p>
        <p className="company-description">{truncateDescription(company.description, 120)}</p>
      </div>
    </div>
  );
};

export default CompanyPanel;