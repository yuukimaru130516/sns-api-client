import React from 'react'
import {useState} from 'react';
import { Image } from 'react-bootstrap';

const User = (users) => {
  const [limit, setLimit] = useState(20);
  return (
    <div>
      <h2 className="">ユーザー検索</h2>
      <input/>
      <h2 className="mt-3">ユーザー一覧</h2>
      {
        users.users.slice(0, limit)
         .map((user, index) => {
        // TODO ユーザー名がクリックされたら、ユーザーページを表示する
         return <div key={index}>
           <hr/>
           <h2>{user.name}</h2>
           <p className="small">@{user.id} </p>
           <p>{user.description}</p>
           <p className="small text-end" >登録日: {new Date(user._created_at).getFullYear()}年
                    {new Date(user._created_at).getMonth() + 1}月
                    {new Date(user._created_at).getDate()}日
           </p>
         </div>
        })
      }
      <div onClick={() => {setLimit(limit + 20)}} className="text-center">
        <Image src={process.env.PUBLIC_URL + '/rotate-right.svg'}/>
      </div>
    </div>
  )
}

export default User
