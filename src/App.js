import './App.css';

import React, { useState } from 'react';

import axios from 'axios';

import { About } from './about';

const App = () => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState("Hello, what is your question master");
  const chatbotApi = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      Authorization:
        "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
    },
  });

  const updateData = (e) => {
    setData(e.target.value);
  };

  const ITCallHome = async () => {
    const result = await chatbotApi.post("/completions", {
      model: "text-davinci-003",
      prompt: data,
      max_tokens: 500,
      temperature: 0,
    });

    console.log(result.data);
    setResult(result.data.choices[0].text); // This is the response from the API
  };

  return (
    <div className="App">
      <About />
      <header className="App-header">
        <button onClick={ITCallHome}>Call Home</button>
        <input type="text" onChange={updateData} />
        <p>{result}</p>
      </header>
    </div>
  );
};

export default App;
