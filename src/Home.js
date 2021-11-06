import React from 'react'
import { Form } from 'react-bootstrap';
import { useState } from 'react';

const Home = ({onCreateUser}) => {
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [tab, setTab] = useState('new');

  const submitUserInfo = (e) => {
    e.preventDefault();
    onCreateUser(userName, userBio);
  }

  return (
    tab === "new" ?
    <div className="pt-5 vh-100">
      <h3 className="pt-5">新規登録</h3>
      <Form className="pt-3" onSubmit={submitUserInfo}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>ユーザー名</Form.Label>
          <Form.Control type="text"
          value={userName} onChange = {(e) => {setUserName(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>自己紹介</Form.Label>
          <Form.Control as="textarea" rows={3} 
          value={userBio} onChange={(e) => {setUserBio(e.target.value)}}/>
        </Form.Group>
        <button className="float-right btn btn-dark" type="submit">登録</button>
      </Form>
      <p onClick={() => {setTab('home')}}>ログインはこちら</p>
    </div>
    :
    <div className="pt-5 vh-100">
      <h2 className="pt-5">ホーム</h2>
      <p onClick={() => {setTab('new')}}>新規登録はこちら</p>
    </div>
  )
}

export default Home
