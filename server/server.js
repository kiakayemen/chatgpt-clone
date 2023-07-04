import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from your chatGPT",
  });
});

app.post("/chat", async (req, res) => {
  const { content } = req.body;
  try {
    console.log(req.body);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content,
        },
      ],
    });
    const data = response.data.choices[0].message.content;
    const role = response.data.choices[0].message.role;
    res.status(200).send({
      role,
      data,
    })
    console.log({role, data})
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
