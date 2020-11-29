import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const inputRef = React.useRef()
  const { isOpen, close, onUpdateAvatar } = props

  function handleAvatarSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value)
  }

  return (
    <PopupWithForm title="Обновить аватар" namePopup="-avatar" titleButton="Сохранить" isOpen={isOpen} close={close} onSubmit={handleAvatarSubmit}>
      <input ref={inputRef} type="url" autoComplete="off" id="avatar-link" name="avatar-link" className="popup__input popup-avatar__input-link" placeholder="Ссылка на картинку" required />
      <span id="avatar-link-error" className="error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;