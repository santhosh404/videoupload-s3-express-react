import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css'

import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)

  async function handleChange(e) {

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    console.log(formData)

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, { 
        headers: { 
          "Content-Type": "multipart/form-data" 
        } 
      });

      console.log(response);
    }

    catch(err) {
      console.log(err);
    }

  }

  return (
    <>
      <input type='file' accept='mp4' onChange={handleChange} />
    </>
  )
}

export default App
