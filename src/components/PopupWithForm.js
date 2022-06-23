function PopupWithForm({name, title,  isOpen, onClose, children}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">
          {title}
        </h2>
        <form action="submit" name={`${children}`} noValidate className="popup__form">
          {children}
        </form>
        <button type="button" aria-label="Закрыть попап" onClick={onClose} className="popup__closed-btn"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;