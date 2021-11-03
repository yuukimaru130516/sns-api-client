import React from 'react';
import { useState } from 'react';
import {Row, Col} from 'react-bootstrap';

const Tweet = (tweets) => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState("all");
  const [userTweet, setUserTweet] = useState([]);

  const dayOfWeekStrJP = [ " (日)", " (月)", " (火)", " (水)", " (木)", " (金)", " (土)" ]

  // ユーザー登録されている場合ユーザー名を返す
  // TODO ユーザーIDをキーとした、ユーザー名の配列を作成する
  const isExistUserName = (tweetUserId) => {
    let userName;
    tweets.users.forEach(user => {
     if(user._user_id === tweetUserId) {
       userName = user.name;
      }else if(!userName) {
        userName = "Unregistered"
      }
    })
    return userName;
  }

  const userPage = (user_name, tweetUserId) => {
    user_name === "Unregistered" ? setPage("all") : setPage(user_name);
    const userTweet = tweets.tweets.filter(tweet => {
      return tweet._user_id === tweetUserId
    })
    setUserTweet(userTweet);
  }


  return (
    page === "all" ?
    <div>
      <h2>ツイート一覧</h2>
      {
      tweets.tweets.slice(0, limit)
        .map((tweet, index) => {
        return <div key={index} onClick={() => {userPage(isExistUserName(tweet._user_id), tweet._user_id)}}>
        <hr/>
        <h3>{isExistUserName(tweet._user_id)}</h3>
        <p>{tweet.text} </p>
        <p> {new Date(tweet._created_at).getFullYear()}年
            {new Date(tweet._created_at).getMonth() + 1}月
            {new Date(tweet._created_at).getDate()}日
            {new Date(tweet._created_at).getHours()}時
            {new Date(tweet._created_at).getMinutes()}分
            {dayOfWeekStrJP[new Date(tweet._created_at).getDay()]}
        </p>
        </div>
        })
      }
      <button onClick={() => {setLimit(limit + 20)}}>更に読みこむ</button>
    </div>
    :
    <div>
      <Row>
        <Col sm={10}>
        <h2>{page}</h2>
        </Col>
        <Col sm={2}>
        <button className="sm-2" onClick={() => setPage("all")}>戻る</button>
        </Col>
      </Row>
      {
      userTweet.map((tweet, index) => {
        return <div key={index}>
        <hr/>
        <p>{tweet.text} </p>
        <p> {new Date(tweet._created_at).getFullYear()}年
            {new Date(tweet._created_at).getMonth() + 1}月
            {new Date(tweet._created_at).getDate()}日
            {new Date(tweet._created_at).getHours()}時
            {new Date(tweet._created_at).getMinutes()}分
            {dayOfWeekStrJP[new Date(tweet._created_at).getDay()]}
        </p>
        </div>
        })
      }
    </div>
  )
}


export default Tweet
