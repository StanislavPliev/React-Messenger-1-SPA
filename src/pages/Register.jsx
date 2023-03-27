import React, { useState } from 'react'
// import addAvatar from '../img/addAvatar.png'
import addAvatar1 from '../img/addAvatar1.png'
// import addAvatar2 from '../img/addAvatar2.jpg'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, avatar)
      
      uploadTask.on(
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })

            await setDoc(doc(db, "userChats", res.user.uid), {

            })

            navigate('/');
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">Lama Chat</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Имя пользователя' />
          <input type="email" placeholder='E-mail' />
          <input type="password" placeholder='Пароль' />
          <input style={{display: "none"}} type="file" id='avatar' />
          <label htmlFor="avatar">
            <img src={addAvatar1} alt="" />
            <span>Добавьте фотографию</span>
          </label>
          <button>Зарегистрироваться</button>
          { err && <span style={{textAlign: "center", color: "darkred", fontSize: 12}}>Заполните все поля корректно</span> }
        </form>
        <p>У Вас уже есть аккаунт? <br /> <Link to="/login">Войти</Link></p>
      </div>
    </div>
  )
}

export default Register