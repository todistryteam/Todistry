import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-block large"></div>
      <div className="skeleton-row">
        <div className="skeleton-block medium"></div>
        <div className="skeleton-block medium"></div>
      </div>
      <div className="skeleton-block small"></div>
    </div>
  );
};

export default SkeletonLoader;
