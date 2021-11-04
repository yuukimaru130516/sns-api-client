import React from 'react'
import Tweet from './Tweet';
import User from './User';
import Home from './Home';
import NewTweet from './NewTweet';
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Image} from 'react-bootstrap';

const App = () => {
  const [tab, setTab] = useState('home');
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);

  const url = `https://versatileapi.herokuapp.com/api`;

  useEffect(() => {
    fetchTweet();
    fetchUser();
  },[]);


  const fetchTweet = async () => {
    await axios.get(url + '/text/all?$orderby=_created_at desc')
      .then((res) => {
        setTweets(res.data);
      });
  }

  const fetchUser = async () => {
    await axios.get(url + '/user/all')
      .then((result) => {
        setUsers(result.data);
      });
  }

  return (
    <div className="bg-light">
      <header className="bg-white pt-2 fixed-top">
        <Row className=" pb-2">
          <Col xs={10} md={10} className="pt-1">
            <Image src={process.env.PUBLIC_URL + '/logo.png' } />
          </Col>
          <Col xs={2} md={2} className="text-start pt-3">
            <Image src={process.env.PUBLIC_URL + '/menu-burger.svg'}/>
          </Col>
        </Row>
      </header>
      <main className="container pt-5 mt-5 pb-5 mb-5" >
        {
        tab === 'tweet' ? <Tweet tweets={tweets} users={users}/> :
        tab === 'home' ? <Home /> : tab === 'user' ? <User users={users}/> : <NewTweet/>
        }
      </main>
      <footer className="fixed-bottom  bg-white">
          <Row className="pt-3 pb-3">
            <Col xs={3} md={3} className="text-center" onClick={() => setTab('home')}>
              {
                tab === 'home' ? <Image src={process.env.PUBLIC_URL + '/home2.svg'}/> :
                <Image src={process.env.PUBLIC_URL + '/home.svg'} />
              }
            </Col>
            <Col xs={3} md={3} className="text-center" onClick={() => setTab('tweet')}>
              {
                tab === 'tweet' ? <Image src={process.env.PUBLIC_URL + '/comment2.svg'}/> :
                <Image src={process.env.PUBLIC_URL + '/comment.svg'}/>
              }
            </Col>
            <Col xs={3} md={3} className="text-center" onClick={() => setTab('user')}>
              {
                tab === 'user' ? <Image src={process.env.PUBLIC_URL + '/user2.svg'}/> :
                <Image src={process.env.PUBLIC_URL + '/user.svg'}/>
              }
            </Col>
            <Col xs={3} md={3} className="text-center" onClick={() => setTab('newTweet')}>
              {
                tab === 'newTweet' ? <Image src={process.env.PUBLIC_URL + '/edit2.svg'}/> :
                <Image src={process.env.PUBLIC_URL + '/edit.svg'}/>
              }
            </Col>
          </Row>
      </footer>
    </div>
  )
}

export default App
