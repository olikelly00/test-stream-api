import { OpenAIStream, messageText } from "../utils/index.js";

const handler = async (req) => {
  try {
    const { messages, personality, user } = await req.body;

    if (!messages) {
      return new Response("No messages in the request", { status: 400 });
    }

    const payload = {
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `You are a coach. The user is ${user}. Given the following transcript of a conversation between the user and a ${personality.type}, offer your feedback on how effective the user is being. You are to only provide feedback how effective the user's last answer is in a technical conversation. Do not be overly verbose and focus on the user's last response. Speak directly to the user, always referring to them as 'you'. Hold the user to a very high standard, appropriate to a technical recruiter with many years of experience. ${personality.coachPrompt}`,
        },
        {
          role: "user",
          content: messages
            .map(
              (message) =>
                `${
                  message.from === "you" ? "user" : personality.name
                }: ${messageText(message)}`,
            )
            .join("\n"),
        },
        // ...messages.map(message => (
        //   {
        //     role: message.from === 'you' ? 'user' : 'assistant',
        //     content: message.text
        //   }
        // ))
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 450,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    return stream;
  } catch (e) {
    console.error(e);
    return e.toString();
  }
};

export default handler;
