import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

console.log(process.env.OPENAI_API_KEY);
console.log("Above you can find server key")

dotenv.config()

const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hey, this is Liam...',
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log(`Input prompt here is ${prompt}`)

          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });

          console.log(`Received data is here is ${response.data.choices[0]}`)

          res.status(200).send({
            prompt: response.data.choices[0].text
          });

         
    } catch (error) {
        console.log(error);
        res.status(500).send(error || 'Something went wrong');
    }
});

app.listen(5002, () => console.log('Server is running on port http://localhost:5002'));
