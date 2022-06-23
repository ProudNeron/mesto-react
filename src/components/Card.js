import React from "react";

function Card(props) {
  return (
    <li className="card">
      <img src={props.card.link} alt={props.card.name}
           onClick={() => {props.onCardClick({link: props.card.link, name: props.card.name})}}
           className="card__image" />
      <button type="button" aria-label="Удалить карточку" className="card__delete-btn"></button>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__reaction">
          <button type="button" aria-label="Нравится" className="card__like-button"></button>
          <span className="card__like-counter">{props.card.likes.length || ''}</span>
        </div>
      </div>
    </li>);
}

export default Card;