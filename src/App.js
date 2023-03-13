import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { BsFillSendFill } from 'react-icons/bs'
function App() {
  //   const config=require("config")
  // const chatKey=config.get.chatKey
  const configration = new Configuration({
    apiKey: "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",
  });

  const openAi = new OpenAIApi(configration);
  const [prompt, setPrompt] = useState("");
  const [resuslt, setResuslt] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(resuslt);
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      console.log(res);
      setResuslt(res.data.choices[0].text);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <BsFillSendFill className="icon"/>
      </form>
      {loading ? "loading" : resuslt.length && <pre className="pre">{resuslt}</pre>}
    </div>
  );
}

export default App;
