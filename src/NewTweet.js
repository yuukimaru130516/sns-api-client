import React from 'react'

const NewTweet = () => {
  return (
    <div>
      <h2>新規ツイート</h2>
      <form>
        <textarea rows="8" cols="40" className="mt-3 mb-5"></textarea>
        <button>送信</button>
      </form>
    </div>
  )
}

export default NewTweet
