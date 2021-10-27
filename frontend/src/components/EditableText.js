import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import './EditableText.css';

export default function EditableText(props) {
  const [isEditActive, setisEditActive] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [text, setText] = useState(props.content);
  const [acceptedText, setAcceptedText] = useState(text);

  useEffect(() => {
    setAcceptedText(props.content);
  }, [props.content]);

  const openEditMenu = () => {
    setisEditActive(!isEditActive);
  };

  const acceptEdit = () => {
    if (!isValid) return;
    setAcceptedText(text);
    setisEditActive(!isEditActive);
    props.onChange(text);
  };

  const cancelEdit = () => {
    setisEditActive(!isEditActive);
  };

  const onChangeHandle = (e) => {
    const isValid = e.target.validity.valid;
    isValid ? setIsValid(true) : setIsValid(false);
    setText(e.target.value);
  };

  return (
    <div className="editable-text-container">
      {isEditActive ? (
        <input
          pattern=".{3,30}"
          className="editable-text-content"
          required
          defaultValue={acceptedText}
          onChange={(e) => onChangeHandle(e)}
        ></input>
      ) : (
        <span>{acceptedText}</span>
      )}

      <div className="editable-text-button">
        {isEditActive ? (
          <>
            <AiOutlineCheck onClick={acceptEdit} className="active" />
            <AiOutlineClose onClick={cancelEdit} className="active" />
          </>
        ) : (
          <AiFillEdit onClick={openEditMenu} />
        )}
      </div>
    </div>
  );
}
