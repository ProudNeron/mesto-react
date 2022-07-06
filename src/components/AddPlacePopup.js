import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({name, link});

    onClose();
  }

  return (
    <PopupWithForm title='Новое место' name={'add-card'} onSubmit={handleSubmit}
                   isOpen={isOpen} btnText={'Создать'} onClose={onClose}>
      <input type="text" onChange={(e) => setName(e.target.value)}
             required id="place-name" minLength="2" maxLength="30" placeholder="Название"
             className="popup__form-item popup__form-item_image_name text-input"/>
      <span className="popup__input-error place-name-error"></span>
      <input type="url" required id="place-url" placeholder="Ссылка на картинку"
             onChange={(e) => setLink(e.target.value)}
             className="popup__form-item popup__form-item_image_url text-input"/>
      <span className="popup__input-error place-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;