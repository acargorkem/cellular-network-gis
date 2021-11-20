import Select from 'react-select';
import { useEffect, useState } from 'react';

const options = [
  {
    label: 'Dense urban',
    value: 500,
  },
  {
    label: 'Urban',
    value: 750,
  },
  {
    label: 'Sub urban',
    value: 1000,
  },
  {
    label: 'Rural',
    value: 2000,
  },
  {
    label: 'Village',
    value: 4000,
  },
];

function CustomSelector({ selectedDistance, handleChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    const getInitialValue = () => {
      return options.find((option) => option.value == selectedDistance);
    };
    setSelectedValue(getInitialValue());
  }, [selectedDistance]);

  return (
    <Select
      className="selector"
      classNamePrefix="selector"
      value={selectedValue}
      defaultValue={selectedValue}
      onChange={handleChange}
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: '0.5rem',
        colors: {
          ...theme.colors,
          primary25: '#8ab4f8',
          primary: '#202124',
        },
      })}
    />
  );
}

export default CustomSelector;
