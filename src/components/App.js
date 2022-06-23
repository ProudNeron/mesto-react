import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [selectedCard, setSelectedCardState] = React.useState(false);

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
    setSelectedCardState(false);
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
                     name={'edit-user-data'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={''} />
      <PopupWithForm title={'Новое место'}
                     name={'add-card'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={''} />
      <PopupWithForm title={'Обновить аватар'}
                     name={'change-avatar'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={''} />
    </>
  );
}

export default App;
