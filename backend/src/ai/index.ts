import config from '../config.js';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

export async function dialog(messages: ChatCompletionRequestMessage[]) {
  const api = new OpenAIApi(configure());
  const response = await api.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an online agile coach, helping a team to improve their online retrospectives, using Retrospected. The team is a remote team and is not physically in the same room. Retrospected provides various templates such as "Start, Stop, Continue" and "4Ls". You can also vote, use a timer, and get a summary that can be exported to Jira using Markdown.',
      },
      ...messages,
    ],
  });
  return [...messages, response.data.choices[0].message];
}

export function configure(): Configuration {
  const configuration = new Configuration({
    apiKey: config.OPEN_AI_API_KEY,
  });

  return configuration;
}
