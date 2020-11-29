import React from 'react';
import PopupWithForm from './PopupWithForm'

function DeletePopup(props) {
    const { title, namePopup, titleButton, isOpen, close } = props

    return (
        <PopupWithForm title={title} namePopup={namePopup} titleButton={titleButton} isOpen={isOpen} close={close} onSubmit={props.handleSubmit} />
    )
}

export default DeletePopup