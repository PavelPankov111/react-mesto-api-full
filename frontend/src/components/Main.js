import React from 'react';
import profileVectorButton from '../images/vector1.svg'
import profileVectorAdd from '../images/vector2.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
    const userInfo = React.useContext(CurrentUserContext)
    if(!userInfo){
        return null
    }

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-info">
                    <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
                        <img name="avatar" className="profile__avatar" alt="Здесь должна быть аватарка" src={userInfo.avatar} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__button">
                            <h1 name="name" className="profile__title">{userInfo.name}</h1>
                            <button type="button" className="profile__edit-button" title="Редактировать">
                                <img className="profile__vector-button" src={profileVectorButton} alt="карандашек" onClick={props.onEditProfile} />
                            </button>
                        </div>
                        <p name="about" className="profile__subtitle">{userInfo.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__button-add" title="Добавить" onClick={props.onAddPlace}>
                    <img className="profile__vector-add" src={profileVectorAdd} alt="плюсик" />
                </button>
            </section>
            <div className="loading"></div>
        </main>
    )
}

export default Main;