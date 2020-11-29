import React from 'react';
import popupVectorElement from '../images/close__icon.svg';

function ImagePopup(props) {
    return (
        <div className={`popup popup-element ${props.isOpen && "popup_opened"} `}>
            <div className="popup__element-container">
                <img className="popup__element-image" alt="" src={props.url} />
                <h2 className="popup__element-text">{props.title}</h2>
                <button type="reset" className="popup__vector-button" onClick={props.onClose}>
                    <img className="popup__vector-element" src={popupVectorElement} alt="кнопка закрытия" />
                </button>
            </div>
        </div>
    )
}

export default ImagePopup;