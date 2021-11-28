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
    setText(acceptedText);
  };

  const onChangeHandle = (e) => {
    const isValid = e.target.validity.valid;
    isValid ? setIsValid(true) : setIsValid(false);
    setText(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key == 'Enter') {
      acceptEdit();
    } else if (e.key == 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="editable-text-container">
      {isEditActive ? (
        <input
          pattern=".{1,30}"
          className="editable-text-content"
          required
          defaultValue={acceptedText}
          onChange={(e) => onChangeHandle(e)}
          onKeyDown={onKeyDown}
        ></input>
      ) : (
        <span>{acceptedText}</span>
      )}

      <div className="editable-text_button-container">
        {isEditActive ? (
          <>
            <AiOutlineCheck
              onClick={acceptEdit}
              className="editable-text-button active"
            />
            <AiOutlineClose
              onClick={cancelEdit}
              className="editable-text-button active"
            />
          </>
        ) : (
          <AiFillEdit className="editable-text-button" onClick={openEditMenu} />
        )}
      </div>
    </div>
  );
}
