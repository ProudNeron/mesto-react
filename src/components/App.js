import {useState, useEffect} from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState('');
  const [selectedCard, setSelectedCardState] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', cohort: '', _id: ''});
  const [cards, setCardsState] = useState([]);

  useEffect(() => {
    const userProfileData = api.getProfileData();

    userProfileData.then((profileData) => {
      setCurrentUser(profileData);
    }).catch(err => alert(err));
  },[]);

  useEffect(() => {
    api.getAllCards().then((dataCards) => {
      dataCards.sort((j, k) => Date.parse(k.createdAt) - Date.parse(j.createdAt));
      setCardsState(dataCards);
    }).catch(err => alert(err));
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpenState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleCardClick(card) {
    setSelectedCardState(card);
  }

  function handleDeleteBtnClick(cardId) {
    setDeletingCardId(cardId);
  }

  function closeAllPopups() {
    setEditAvatarPopupState(false);
    setEditProfilePopupOpenState(false);
    setAddPlacePopupState(false);
    setDeletingCardId('');
    setSelectedCardState(null);
  }

  function handleUpdateUser({name, about}) {
    api.patchProfileData({name, about}).then((data) => {
      setCurrentUser(data);
    }).catch(err => alert(err));
  }

  function handleUpdateAvatar(link) {
     api.patchProfileAvatar(link).then((data) => {
      setCurrentUser(data);
    }).catch(err => alert(err));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.postCard({name, link}).then( (newCard) => {
      setCardsState((prevState) => [newCard, ...prevState]);
      }).catch(err => alert(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(j => j._id == currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCardsState((state) => state.map(c => c._id == card._id ? newCard : c));
      }).catch(err => alert(err));
    } else {
      api.putLike(card._id).then((newCard) => {
        setCardsState((state) => state.map(c => c._id == card._id ? newCard : c));
      }).catch(err => alert(err));
    }
  }

  function handleCardDelete() {
    api.deleteCard(deletingCardId).then(() => {
      setCardsState((prevState) => prevState.filter(c => c._id != deletingCardId));
    }).catch(err => alert(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main cards={cards}
              onEditProfile={handleEditProfileClick} onCardLike={handleCardLike} onDeleteBtn={handleDeleteBtnClick}
              onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      <SubmitPopup onCardDelete={handleCardDelete} isOpen={deletingCardId} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
