import { OpenAIStream, messageText } from "../utils/index.js";

const handler = async (req) => {
  try {
    const { messages, personality } = req.body;

    if (!messages) {
      return new Response("No messages in the request", { status: 400 });
    }

    if (!personality) {
      return new Response("No personality in the request", { status: 400 });
    }

    const payload = {
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `You are a ${personality.type} named ${personality.name}.
            You have the following goal: ${personality.need}. Do not disclose your goal until the user has elicited it.
            ${
              personality.jobTitle
                ? `You have the following job title: ${personality.jobTitle}.`
                : ""
            }
            ${
              personality.personality
                ? `You have the following personality: ${personality.personality}.`
                : ""
            }
            ${personality.extra ? personality.extra : ""}
            ${personality.user ? `The user is ${personality.user}` : ""}

            ${
              personality.difficulty
              ? `Make the difficulty level of this conversation ${personality.difficulty}. Do not disclose the level of difficulty to the user.`
              : ''
            }

            ${personality.systemPrompt}
            ${
              personality.successCase
                ? `Conclude the conversation once ${personality.successCase}`
                : ""
            }`,
        },
        ...messages.map((message) => ({
          role: message.from === "you" ? "user" : "assistant",
          content: messageText(message),
        })),
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300,
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
