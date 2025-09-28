import OpenAI from 'openai';
import { useState } from 'react';

const Test = () => {
  const openai = new OpenAI();

  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    const response = await openai.responses.create({
      model: 'gpt-5',
      input:
        prompt,
      tools: [{ type: 'image_generation' }],
    });

    const imageData = response.output
      .filter((output) => output.type === 'image_generation_call')
      .map((output) => output.result);

      
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button>Test</button>
    </form>
  );
};

export default Test;
