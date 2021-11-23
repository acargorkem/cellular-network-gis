/* eslint-disable no-unused-vars */
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

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 20,
      width: '6rem',
      fontSize: '0.7rem',
      fontFamily: 'var(--paper-font-common-base_-_font-family)',
      padding: 0.25,
      '&:hover': {
        cursor: 'pointer',
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0px 6px',
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    option: (base) => ({
      ...base,
      color: 'black',
      fontSize: '0.7rem',
      fontFamily: 'var(--paper-font-common-base_-_font-family)',
    }),
    menu: (base) => ({
      ...base,
      width: '6rem',
    }),
  };

  return (
    <Select
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
        },
      })}
      styles={customStyles}
    />
  );
}

export default CustomSelector;
