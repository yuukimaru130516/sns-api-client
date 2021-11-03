import React from 'react'
import {useState} from 'react';

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
         return <div key={index}>
           <hr/>
           <p>id : {user.id} </p>
           <p>ユーザー名：{user.name}</p>
           <p>{user.description}</p>
           <p>登録日: {new Date(user._created_at).getFullYear()}年
                    {new Date(user._created_at).getMonth() + 1}月
                    {new Date(user._created_at).getDate()}日
           </p>
         </div>
        })
      }
      <button onClick={() => {setLimit(limit + 20)}}>更に読みこむ</button>
    </div>
  )
}

export default User
