import { useSelector, useDispatch } from 'react-redux';
import { geojsonSlice } from '../store/geojsonSlice';
import { useEffect, useState } from 'react';
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
  const dispatch = useDispatch();
  const [selectedOption, setselectedOption] = useState();
  const coverageAreaDistance = useSelector(
    (state) => state.coverageArea.distances[props.arrayIndex]
  );

  useEffect(() => {
    const getSelectedFromRedux = () => {
      return options.find((option) => option.value == coverageAreaDistance);
    };
    const selectedOption = getSelectedFromRedux();
    setselectedOption(selectedOption);
  }, [coverageAreaDistance]);

  const updateDistances = (value, index) => {
    dispatch(geojsonSlice.actions.setDistance({ value, index }));
  };

  const handleChange = (selectedOption) => {
    setselectedOption(selectedOption);
    updateDistances(selectedOption.value, props.arrayIndex);
  };

  return (
    <div className="selector-working-area">
      Base station working area
      <Select
        className="selector"
        classNamePrefix="selector"
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
