import React, {useState, useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() =>{
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });

    onClose(false);
  }

  return (
    <PopupWithForm title='Редактировать профиль' name={'edit-user-data'} onSubmit={handleSubmit}
                   isOpen={isOpen} btnText={'Сохранить'} onClose={onClose}>
      <input type="text" value={name || ''} onChange={(e) => setName(e.target.value)}
             required id="user-name" minLength="2" maxLength="40"
             className="popup__form-item popup__form-item_user_name text-input"/>
      <span className="popup__input-error user-name-error"></span>
      <input type="text" value={description || ''} onChange={(e) => setDescription(e.target.value)}
             required id="user-about" minLength="2" maxLength="200"
             className="popup__form-item popup__form-item_user_about text-input"/>
      <span className="popup__input-error user-about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;