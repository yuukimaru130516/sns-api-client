import React from 'react';
import { useState } from 'react';
import {Row, Col, Image, Badge} from 'react-bootstrap';

const Tweet = (tweets) => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState("all");
  const [userTweet, setUserTweet] = useState([]);
  const [replay_show, setReplay_show] = useState('hidden');

  let times = [];
  let diffTimes = "";

  const dayOfWeekStrJP = [ " (日)", " (月)", " (火)", " (水)", " (木)", " (金)", " (土)" ]

  // ユーザー登録されている場合ユーザー名を返す
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

  const getReply = (tweetId) => {
    const Reply =  tweets.tweets.filter((tweet) => {
      return tweet.in_reply_to_text_id ===  tweetId
    })
    return Reply

  }


  return (
    page === "all" ?
    <div className="pt-5 pb-5">
      <h2 className="pt-5">ツイート一覧</h2>
      {
      tweets.tweets.slice(0, limit)
        .map((tweet, index) => {
        return <div key={index} >
          { getTimeDate(tweet._created_at)}
          {
            tweet.in_reply_to_text_id ?
            <div></div>
            :
            <div>
              <hr/>
              <Row>
                <Col xs={8} md={8}>
                  <h3 onClick={() => {userPage(isExistUserName(tweet._user_id), tweet._user_id)}}>{isExistUserName(tweet._user_id)}</h3>
                </Col>
                <Col xs={4} md={4} className="text-end">
                  <p className="small text-secondary">{diffTimes}</p>
                </Col>
              </Row>
              <p className="small text-secondary">@{tweet._user_id}</p>
              <p className="pt-2 pb-2">{tweet.text} </p>
              <Row>
                {
                  getReply(tweet.id).length === 0 ? <Col xs={2} md={2}></Col> : <Col xs={2} md={2} className="text-end">
                    {
                    replay_show === 'hidden' ? <Image src={process.env.PUBLIC_URL + '/comment-alt.svg'} onClick={() => {setReplay_show('show')}}/>  : 
                    <Image src={process.env.PUBLIC_URL + '/comment-alt-back.svg'} onClick={() => {setReplay_show('hidden')}}/> 
                    }
                  </Col>
                }
                <Col xs={10} md={10} className="text-end">
                <p className="small text-secondary"> {`${times[0]}年${times[1]}月${times[2]}日${times[3]}時${times[4]}分`}
                  {dayOfWeekStrJP[new Date(tweet._created_at).getDay()]}
                </p>
                </Col>
              </Row>


              {
                replay_show === "hidden" ? <div></div> :
                <div>
                  {/* リプライの表示 */}
                    {getReply(tweet.id).map((reply, index) => {
                      return <div key={index} className="">
                        <hr className="mt-0"/>
                          {/* 返信先 */}
                          <Badge pill bg="primary">reply</Badge>
                          <p>返信先: <span className="text-primary"> @{tweet._user_id}</span></p>
                          <Row>
                            <Col xs={8} md={8}>
                              <h3 onClick={() => {userPage(isExistUserName(reply._user_id), reply._user_id)}}>{isExistUserName(reply._user_id)}</h3>
                            </Col>
                            <Col xs={4} md={4} className="text-end">
                              <p className="small text-secondary">{diffTimes}</p>
                            </Col>
                          </Row>
                          <p className="small text-secondary">@{reply._user_id}</p>
                          <p className="pt-2 pb-2">{reply.text} </p>
                          <p className="small text-secondary text-end"> {`${times[0]}年${times[1]}月${times[2]}日${times[3]}時${times[4]}分`}
                            {dayOfWeekStrJP[new Date(reply._created_at).getDay()]}
                          </p>
                      </div>
                    })}
                </div>
              }



            </div>
          }
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
