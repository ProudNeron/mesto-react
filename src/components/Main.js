import React, {useState, useEffect} from "react";
import {api} from "../utils/Api.js";
import Card from "./Card.js";

function Main(props) {
  const [user, setProfileDataState] = React
    .useState({name: '', description: '', avatar: ''});
  const [cards, setCardsState] = useState([]);

  useEffect(() => {
    const userProfileData = api.getProfileData();
    userProfileData.then((profileData) => {
      setProfileDataState({name: profileData.name,
        description: profileData.about, avatar: profileData.avatar});
    }).catch(err => alert(err));
  }, []);

  useEffect(() => {
    api.getAllCards().then((dataCards) => {
      dataCards.sort((j, k) => Date.parse(j.createdAt) - Date.parse(k.createdAt));
      setCardsState(dataCards);
    }).catch(err => alert(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <img src={`${user.avatar}`} alt="аватарка" className="profile__image"/>
        <button type="button" aria-label="изменить аватар"
                onClick={props.onEditAvatar} className="profile__change-avatar-button"></button>
        <div className="profile__user-info">
          <div className="profile__flex-row">
            <h1 className="profile__user-name">{user.name}</h1>
            <button type="button" aria-label="редактировать профиль" onClick={props.onEditProfile}
                    className="profile__edit-button"></button>
          </div>
          <p className="profile__about-user">{user.description}</p>
        </div>
        <button type="button" aria-label="добавить карточку" onClick={props.onAddPlace}
                className="profile__add-button"></button>
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) =>
            <Card card={card} onCardClick={props.onCardClick} key={card._id}/>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;