function ImagePopup(props){
  return (
    <div className={`popup popup_type_img ${props.card ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <button type="button" aria-label="Закрыть" onClick={props.onClose} className="popup__closed-btn"></button>
        <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}
             onClick={() => {props.onCardClick(props.card)}} className="popup__image"/>
        <figcaption className="popup__image-caption">{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;