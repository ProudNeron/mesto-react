import React, {useState} from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [selectedCard, setSelectedCardState] = useState(null);

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleCardClick(card) {
    setSelectedCardState(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setSelectedCardState(null);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm title={'Редактировать профиль'}
                     name={'edit-user-data'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" required id="user-name" minLength="2" maxLength="40"
               className="popup__form-item popup__form-item_user_name text-input"/>
        <span className="popup__input-error user-name-error"></span>
        <input type="text" required id="user-about" minLength="2" maxLength="200"
               className="popup__form-item popup__form-item_user_about text-input"/>
        <span className="popup__input-error user-about-error"></span>
        <button type="submit" aria-label="Сохранить" className="popup__submit-btn">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm title={'Новое место'}
                     name={'add-card'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" required id="place-name" minLength="2" maxLength="30" placeholder="Название"
               className="popup__form-item popup__form-item_image_name text-input"/>
        <span className="popup__input-error place-name-error"></span>
        <input type="url" required id="place-url" placeholder="Ссылка на картинку"
               className="popup__form-item popup__form-item_image_url text-input"/>
        <span className="popup__input-error place-url-error"></span>
        <button type="submit" aria-label="Создать" className="popup__submit-btn">Создать</button>
      </PopupWithForm>
      <PopupWithForm title={'Обновить аватар'}
                     name={'change-avatar'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" required id="avatar-url" placeholder="Ссылка на изображение"
               className="popup__form-item text-input"/>
        <span className="popup__input-error avatar-url-error"></span>
        <button type="submit" className="popup__submit-btn">Сохранить</button>
      </PopupWithForm>
    </>
  );
}

export default App;
