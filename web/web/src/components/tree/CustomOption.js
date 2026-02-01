// components/CustomOption.js

import React from 'react';
import { components } from 'react-select';

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
        />
        {props.data.label}
      </div>
    </components.Option>
  );
};

export default CustomOption;
