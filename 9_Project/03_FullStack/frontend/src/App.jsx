import { useState } from 'react'
import axios from "axios"
import './App.css'
import { useEffect } from 'react';

function App() {
  const [tags, setTags] = useState([]);

  useEffect(()=>{
    axios.get('/api/tags')
    .then((res)=>{
      setTags(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  })

  return (
    <>
      <h1>Hello World</h1>
      <p>Tags: {tags.length}</p>

      {tags.map((item) => (
        <div key={item.id} className="tag-card">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
