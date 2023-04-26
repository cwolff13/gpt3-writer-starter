import { Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);


//call the OpenAI API

//Establish the Context for GPT for the Use Case to generate the best possible output for the user's prompt via a prefix
const basePromptPrefix = 
`
Create a tweet about the following topic:
`;


const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 300,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  `
  In the style of Dan Koe, Paul Graham, or Justin Welsh, rewrite this tweet. Make it feel like a story.

  Topic: ${req.body.userInput}

  Base Tweet: ${basePromptOutput.text}

  New Tweet:
  `;
  
  // Prompt Chaining to Optimise
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.85,
    max_tokens: 400,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;