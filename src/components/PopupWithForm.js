function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">
          {props.title}
        </h2>
        <form action="submit" name={`${props.children}`} noValidate className="popup__form">
          <input type="text" required minLength="2" maxLength="40"
                 className="popup__form-item popup__form-item_user_name text-input" />
          <span className="popup__input-error user-name-error"></span>
          <input type="text" required  minLength="2" maxLength="200"
                 className="popup__form-item popup__form-item_user_about text-input" />
          <span className="popup__input-error user-about-error"></span>
          <button type="submit" aria-label="Сохранить" className="popup__submit-btn">Сохранить</button>
        </form>
        <button type="button" aria-label="Закрыть попап" onClick={props.onClose} className="popup__closed-btn"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;