import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const { name, likes, link, onCardClick, owner, onClickLike, onCardDelete } = props;

    function handleClick() {
        onCardClick(link, name)
    }

    const user = React.useContext(CurrentUserContext);
    if(!user){
        return null 
    }
    const isOwn = owner._id === user._id;

    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__trashs_visible' : 'element__trashs'}`
    );

    const isLiked = likes.some(i => i._id === user._id);

    const cardLikeButtonClassName = `${isLiked ? 'element__button-like_active' : 'element__button-like '}`

    return (
        <div className="element">
            <img className="element__image" alt={name} src={link} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} onClick={onCardDelete} type="reset">
            </button>
            <div className="element__title-like">
                <h2 className="element__title">{name}</h2>
                <div className="element__like-counter">
                    <button type="button" className={cardLikeButtonClassName} onClick={onClickLike}>
                    </button>
                    <p className="element__counter">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;