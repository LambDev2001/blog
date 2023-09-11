import React from 'react';
import { FixedSizeList as List } from 'react-window';

// Step 2: Import FixedSizeList from react-window

const Row = ({ index, style, data }) => {
  // Step 3: Create a Row Component
  const item = data[index];
  return (
    <div style={style} key={index}>
      {/* Your row content here */}
      <div>{item.name}</div>
    </div>
  );
};

const MyComponent = () => {
  const data = [
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    { name: 'Row 1' },
    { name: 'Row 2' },
    
    // Add more data here
  ];

  return (
    <List
      height={300}
      width={300}
      itemSize={35}
      itemCount={data.length}
      itemData={data}
    >
      {Row}
    </List>
  );
};

export default MyComponent;
