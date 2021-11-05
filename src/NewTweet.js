import React from 'react'
import { useState } from 'react';

const NewTweet = ({ onPostTweet }) => {
  const [text, setText] = useState('');

  const submitTweet = (e) => {
    e.preventDefault();
    onPostTweet(text)
  }
  return (
    <div className="pt-5">
      <h2 className="pt-5">新規ツイート</h2>
      <form onSubmit={submitTweet}>
        <div className="pt-3 pb-3">
          <textarea placeholder="いまどうしてる？" className="form-control" rows="5"
                    value={text} onChange={e => setText(e.target.value)} />
        </div>
        <div className="text-end pt-1 pb-5">
          <button className="btn btn-dark" type="submit">ツイート！</button>
        </div>
      </form>
    </div>
  )
}

export default NewTweet
