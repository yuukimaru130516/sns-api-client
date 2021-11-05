import React from 'react';
import { useState } from 'react';
import {Row, Col, Image} from 'react-bootstrap';

const Tweet = (tweets) => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState("all");
  const [userTweet, setUserTweet] = useState([]);

  let times = [];
  let diffTimes = "";

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

  const getTimeDate = (tweetTime) => {
    times = [];
    const createTime = new Date(tweetTime);
    const miriCreateTime = createTime.getTime();
    times.push(createTime.getFullYear(), createTime.getMonth() + 1,
    createTime.getDate(), createTime.getHours(), createTime.getMinutes());

    //TODO 現在の時刻を取得してツイートが何分前か表示する
    const nowTime = new Date().getTime();
    const diff = nowTime - miriCreateTime;
    const diffDisplayTime = diff/(1000*60*60);
    diffDisplayTime < 24 ? diffTimes = Math.floor(diffDisplayTime) + "時間前" : diffTimes = Math.floor(diffDisplayTime/24) + "日前";
  }


  return (
    page === "all" ?
    <div className="pt-5 pb-5">
      <h2 className="pt-5">ツイート一覧</h2>
      {
      tweets.tweets.slice(0, limit)
        .map((tweet, index) => {
        return <div key={index} onClick={() => {userPage(isExistUserName(tweet._user_id), tweet._user_id)}}>
          { getTimeDate(tweet._created_at)}
          <hr/>
          <Row>
            <Col xs={8} md={8}>
              <h3>{isExistUserName(tweet._user_id)}</h3>
            </Col>
            <Col xs={4} md={4} className="text-end">
              <p className="small text-secondary">{diffTimes}</p>
            </Col>
          </Row>
          <p className="small text-secondary">@{tweet._user_id}</p>
          <p className="pt-2 pb-2">{tweet.text} </p>
          <p className="small text-secondary text-end"> {`${times[0]}年${times[1]}月${times[2]}日${times[3]}時${times[4]}分`}
              {dayOfWeekStrJP[new Date(tweet._created_at).getDay()]}
          </p>
        </div>
        })
      }
      <hr/>
      <div onClick={() => {setLimit(limit + 20)}} className="text-center pb-5">
        <Image src={process.env.PUBLIC_URL + '/rotate-right.svg'}/>
      </div>
    </div>
    :
    <div className="pt-5 mt-5 pb-5">
      <Row>
        <Col xs={10} md={10}>
        <h2>{page}</h2>
        </Col>
        <Col xs={2} md={2}>
          <div onClick={() => {setPage('all')}} className="text-end">
            <Image src={process.env.PUBLIC_URL + '/angle-double-left.svg'}/>
          </div>
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
