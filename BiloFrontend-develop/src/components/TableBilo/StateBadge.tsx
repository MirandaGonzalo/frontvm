import React from 'react';

type StateBadgeProps = {
  state: string;
  color: string;
};

const StateBadge: React.FC<StateBadgeProps> = ({ state, color }) => {
  return (
    <span
      style={{
        backgroundColor: `${color}`,
        borderRadius: '1rem',
        color: 'white',
        fontWeight: 500,
        display: 'inline-block',
        minWidth: '10rem',
        padding: '0.6rem',
        textAlign: 'center',
        fontSize: '12px',
      }}
    >
      {state?.toUpperCase()}
    </span>
  );
};

export default StateBadge;
