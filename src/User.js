import React from 'react'
import {useEffect, useState} from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';

const User = (users) => {

  const [limit, setLimit] = useState(20);
  const [result, setResult] = useState([]);
  const [temp, setTemp] = useState('');
  const [searchUser, setSearchUser] = useState("");
  const [page, setPage] = useState('all');

  const search = () => {
    const tps = [];
    users.users.forEach((user) => {
      if(user.name.indexOf(temp) !== -1 && temp !== "") {
        tps.push(user.name)
      }
    });
    setResult(tps);
  }
  const search_User = (userName) => {
    setSearchUser(userName);
    setPage(userName);
    setTemp("");
  }

  useEffect(() => {
    search();
  },[temp]);


  return (
    <div className="pt-5 pb-5">
        <InputGroup className=" mt-2 pt-5">
          <FormControl
            placeholder="ユーザー名を入力"
            aria-label="username"
            aria-describedby="basic-addon2"
            value={temp}
            onChange={(e) => {setTemp(e.target.value)}}
          />
          <Button variant="outline-secondary" id="button-addon2"
          onClick={() => {setTemp("")}} className="btn btn-danger"
          >
            ×
          </Button>
        </InputGroup>
        <ul className="list-group" >
        {
          result.map((res, index) => {
            return <li key={index} className="w-75 list-group-item list-group-item-light"
                      onClick={(e) => {search_User(e.target.textContent)}}>{res}</li>
          })
        }
        </ul>
        <h2 className="mt-3">ユーザーリスト</h2>
    {
          page === "all" ? 
            <div>
            {
              users.users.slice(0, limit)
              .map((user, index) => {
              // TODO ユーザー名がクリックされたら、ユーザーページを表示する
              return <div key={index}>
                <hr/>
                <h2>{user.name}</h2>
                <p className="small text-secondary">@{user.id} </p>
                <p>{user.description}</p>
                <p className="small text-end text-secondary" >登録日: {new Date(user._created_at).getFullYear()}年
                          {new Date(user._created_at).getMonth() + 1}月
                          {new Date(user._created_at).getDate()}日
                </p>
              </div>
              })
            }
            <div onClick={() => {setLimit(limit + 20)}} className="text-center pb-5">
              <Image src={process.env.PUBLIC_URL + '/rotate-right.svg'}/>
            </div>
          </div>
          :
          <div>
            {
              users.users.map((user, index) => {
                if(user.name === searchUser){
                  return <div key={index}>
                  <hr/>
                  <h2>{user.name}</h2>
                  <p className="small text-secondary">@{user.id} </p>
                  <p>{user.description}</p>
                  <p className="small text-end text-secondary" >登録日: {new Date(user._created_at).getFullYear()}年
                            {new Date(user._created_at).getMonth() + 1}月
                            {new Date(user._created_at).getDate()}日
                  </p>
                  <hr/>
                </div>
                }
              })
            }
            <button onClick={() => {setPage("all")}}>戻る</button>
          </div>
    }
      </div>
  )
}

export default User
