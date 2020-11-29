import React from 'react';
import popupVector from '../images/close__icon.svg';

function InfoTooltip(props){
    return(
        <div className={`popup popup${props.namePopup} ${props.isOpen ? 'popup_opened' : ''} `}>
            <form name="OpenForm" method="get" action="#" className={`form popup${props.namePopup}__container popup__form`} noValidate>
                <button type="reset" className="popup__vector-button" onClick={props.close}>
                    <img className={`popup${props.namePopup}__vector`} src={popupVector} alt="кнопка закрытия" />
                </button>
                <div className={`popup${props.namePopup}__content`}>
                    <img alt="изображение ответа" src={props.image} className={`popup${props.namePopup}__image`} />
                    <h3 className={`popup${props.namePopup}__title`}>{props.title}</h3>
                </div>
            </form>
        </div>
    )
}

export default InfoTooltip;