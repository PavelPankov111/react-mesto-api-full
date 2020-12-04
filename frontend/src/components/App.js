import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import '../pages/index.css'
import ImagePopup from './ImagePopup'
import { api } from '../utils/Api';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import DeletePopup from './DeletePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Register from './Register'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import { Route, Switch, useHistory } from 'react-router-dom'
import union from '../images/union.svg'
import union2 from '../images/union2.svg'
import InfoTooltip from './InfoTooltip';

function App() {
  const popupDeletSubmitButton = document.querySelector('.popup-delete__button')
  const popupPluseButton = document.querySelector('.popup-pluse__button')
  const popupAvatarButton = document.querySelector('.popup-avatar__button')
  const popupButton = document.querySelector('.popup__button')
  const history = useHistory()
  const [cards, setCards] = React.useState([]);

  const [loggedIIn, setLoggedIIn] = React.useState(false)
  const [isPopupInfotooltipOpen, setIsPopupInfotooltipOpen] = React.useState(false)
  const [img, setImg] = React.useState()
  const [title, setTitle] = React.useState('')

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      api.checkToken(localStorage.getItem('jwt'))
        .then((res) => {
          if (res) {
            setLoggedIIn(true)
            setHandleEmail(res.email)
            history.push('/')
          }
        })
    }
  }
  React.useEffect(() => {
    tokenCheck()
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    avatar: '',
    about: '',
    _id: ''
  });

  React.useEffect(() => {
    if (!loggedIIn) {
      return 
    }
    api.getUserInfo(localStorage.getItem('jwt'))
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIIn])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false)

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true)
  }

  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false)

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlaceOpen(false)
    setIsEditAvatarOpen(false)
    setIsImagePopupOpen(false)
    setIsPopupDeleteOpen(false)
    setIsPopupInfotooltipOpen(false)
  }

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(link, name) {
    setSelectedCard({
      title: name,
      url: link
    })
    setIsImagePopupOpen(true)
  }


  React.useEffect(() => {
    api.getInitialCards(localStorage.getItem('jwt'))
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIIn])

  function handleClickLike(props) {
    const isLiked = props.likes.some((i) => i === currentUser._id);
    const cardCallback = (newCard) => {
      const newCards = cards.map((c) => (c._id === props._id ? newCard : c));
      setCards(newCards);
    };

    if (!isLiked) {
      api.setLike(props._id, localStorage.getItem('jwt')).then(cardCallback);
    } else {
      api.removeLike(props._id, localStorage.getItem('jwt')).then(cardCallback);
    }
  }

  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = React.useState(false)
  const [cardDelete, setCardDelete] = React.useState([])

  function handleDeleteItem(item) {
    setCardDelete(item)
    handleDeleteOpen()
  }

  function handleDeleteOpen() {
    setIsPopupDeleteOpen(true)
  }

  function handleDeleteCard(evt) {
    evt.preventDefault()
    popupDeletSubmitButton.textContent = 'Удаление...'
    api.deleteCard(cardDelete._id, localStorage.getItem('jwt'))
      .then(() => {
        const newCards = cards.filter(function (c) {
          popupDeletSubmitButton.textContent = 'Да'
          return c._id !== cardDelete._id;
        })
        setIsPopupDeleteOpen(false)
        setCards(newCards)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(item) {
    popupButton.textContent = "Сохранение..."
    api.changeUserInfo(item, localStorage.getItem('jwt'))
      .then((obj) => {
        setCurrentUser(obj)
        setIsEditProfilePopupOpen(false)
        popupButton.textContent = "Сохранить"
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(obj) {
    popupAvatarButton.textContent = "Сохранение..."
    api.changeAvatar(obj, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res)
        setIsEditAvatarOpen(false)
        popupAvatarButton.textContent = "Сохранить"
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(item) {
    popupPluseButton.textContent = "Сохранение..."
    api.addCard(item, localStorage.getItem('jwt'))
      .then((res) => {
        console.log(res)
        setCards([res, ...cards]);
        setIsAddPlaceOpen(false)
        popupPluseButton.textContent = "Сохранить"
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [handleEmail, setHandleEmail] = React.useState('')

  function handleLogIn() {
    setLoggedIIn(true)
  }

  function handleClear() {
    localStorage.removeItem('jwt')
    setCurrentUser({})
    setLoggedIIn(false)
  }

  function onRegister(email, password) {
    api.register(email, password).then((res) => {
      if (res.statusCode !== 400) {
        setImg(union)
        setIsPopupInfotooltipOpen(true)
        setTitle('Вы успешно зарегистрировались!')
        history.push('/sing-in')
      }
    })
      .catch((err) => {
        console.log(err)
        setIsPopupInfotooltipOpen(true)
        setImg(union2)
        setTitle('Что-то пошло не так! Попробуйте ещё раз.')
      })
  }

  function onLogin(email, password) {
    api.login(email, password).then((res) => {

      if (res.token) {
        localStorage.setItem('jwt', res.token)
        tokenCheck()
        handleLogIn()
        setHandleEmail(email)
        history.push('/')

      }
    })
      .catch(() => {
        setImg(union2)
        setTitle('Что-то пошло не так! Попробуйте ещё раз.')
        setIsPopupInfotooltipOpen(true)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <InfoTooltip namePopup="-infotooltip" isOpen={isPopupInfotooltipOpen} close={closeAllPopups} image={img} title={title} />
        <Header email={handleEmail} onClick={handleClear} />

        <Switch>
          <Route path="/sing-in">
            <Login login={onLogin} />
          </Route>

          <Route path="/sing-up">
            <Register register={onRegister} />
          </Route>
          <ProtectedRoute loggedIn={loggedIIn} exact path='/'>
            <DeletePopup title="Вы уверенны?" namePopup="-delete" titleButton="Да" isOpen={isPopupDeleteOpen} close={closeAllPopups} handleSubmit={handleDeleteCard} />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} >
            </Main>
            <section className="elements">
            { cards.map(({ ...whatever }) => <Card {...whatever} key={whatever._id} onCardDelete={() => handleDeleteItem(whatever)} onCardClick={handleCardClick} onClickLike={() => { handleClickLike(whatever) }} />)}
            </section>
            <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlaceOpen} close={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarOpen} close={closeAllPopups} />
            <ImagePopup url={selectedCard.url} title={selectedCard.title} isOpen={isImagePopupOpen} onClose={closeAllPopups}>
            </ImagePopup>
          </ProtectedRoute>
        </Switch>

        <Footer />
      </div>

    </CurrentUserContext.Provider>
  )
}

export default App;
