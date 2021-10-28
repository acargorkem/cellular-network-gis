import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sidebarSlice } from '../../store/sidebarSlice';

export default function SidebarToggleButton() {
  const [isSidebarShown, setisSidebarShown] = useState(true);
  const dispatch = useDispatch();

  const onClickHandle = () => {
    setisSidebarShown(!isSidebarShown);
    dispatch(sidebarSlice.actions.sidebarToggle());
  };

  const toggleStyle = () => {
    return isSidebarShown ? 'active' : '';
  };

  return (
    <button
      className={`button-sidebar ${toggleStyle()}`}
      onClick={onClickHandle}
    >
      SideBar On/Off
    </button>
  );
}
