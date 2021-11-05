import React from 'react'
import {useState} from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';

const User = (users) => {
  const [limit, setLimit] = useState(20);
  return (
    <div className="pt-5 pb-5">
      <InputGroup className="mb-4 mt-2 pt-5">
        <FormControl
          placeholder="ユーザー名を入力"
          aria-label="username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          検索
        </Button>
      </InputGroup>
      <h2 className="mt-3">ユーザーリスト</h2>
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
  )
}

export default User
