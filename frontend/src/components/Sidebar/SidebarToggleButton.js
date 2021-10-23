import { useDispatch } from 'react-redux';
import { sidebarSlice } from '../../store/sidebarSlice';

export default function SidebarToggleButton({ addClass }) {
  const dispatch = useDispatch();

  const onClickHandle = () => {
    dispatch(sidebarSlice.actions.sidebarToggle());
  };

  return (
    <button className={`button-sidebar ${addClass}`} onClick={onClickHandle}>
      SideBar On/Off
    </button>
  );
}
