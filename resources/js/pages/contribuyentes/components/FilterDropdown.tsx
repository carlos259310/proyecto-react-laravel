import React, { memo } from 'react';
import { Input } from 'antd';

interface FilterDropdownProps {
  value: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = memo(({ 
  value, 
  placeholder, 
  name, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: e.target.value });
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
});

FilterDropdown.displayName = 'FilterDropdown';

export default FilterDropdown;