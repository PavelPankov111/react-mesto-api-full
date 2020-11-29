import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props){
    const {isOpen, close, onAddPlace} = props
    const [name ,setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleSubmit(e){
        e.preventDefault();

        onAddPlace({
            name,
            link
        })
    }

    function getName(e){
        setName(e.target.value)
    }

    function getLink(e){
        setLink(e.target.value)
    }

    return(
        <PopupWithForm title="Новое место" namePopup="-pluse" titleButton="Создать" isOpen={isOpen} close={close} onSubmit={handleSubmit}>
            <div className="popup-pluse__inputs">
                <input type="text" autoComplete="off" id="name-card" name="name" className="popup-pluse__input popup__input" placeholder="Название" required ="1" maxLength="30" onChange={getName}/> 

                <span id="name-card-error" className="error"></span>

                <input  type="url" autoComplete="off" id="link" name="link" className="popup__input  popup-pluse__input-link" placeholder="Ссылка на картинку" required onChange={getLink}/> 

                <span id="link-error" className="error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;