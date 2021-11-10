import { useState, useEffect } from 'react';
import Select from 'react-select';
import './WorkingAreaSelector.css';

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

export default function WorkingAreaSelector(props) {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const getInitialValue = () => {
      return options.find((option) => option.value == props.selectedDistance);
    };
    setSelectedValue(getInitialValue());
  }, [props.selectedDistance]);

  const handleChange = (selectedOption) => {
    props.setDistance(selectedOption.value, props.arrayIndex);
    setSelectedValue(selectedOption);
  };

  return (
    <div className="selector-working-area">
      <div className="selector-text">Base station working area</div>
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
    </div>
  );
}
