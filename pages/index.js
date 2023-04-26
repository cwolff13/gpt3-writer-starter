import Head from 'next/head';
import Image from 'next/image';
import TwitterProfile from '../assets/TwitterProfile.jpeg';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  
  const onUserChangedText = (event) => {
  //console.log(event.target.value); Uncomment this to check the input is being received
  setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Verbosity | Quality Tweets Quick</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Verbosity</h1>
          </div>
          <div className="header-subtitle">
            <h2>Tweet Generation for Creators</h2>
          </div>
          
           <div className="prompt-container">
            <textarea
              className="prompt-box"
              placeholder="start typing here" //TODO!!!! Rework the copy here
              value={userInput}
              onChange={onUserChangedText}
            />
          </div>
            <div className="prompt-buttons">
              <a
                className={isGenerating ? "generate-button loading" : "generate-button"}
                onClick={callGenerateEndpoint}
              >
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
          
          
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/carson__wolff"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={TwitterProfile} alt="Twitter Logo" />
            <p>Connect</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
