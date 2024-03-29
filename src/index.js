import functions from "@google-cloud/functions-framework";
import { apply } from "./apply.js";
import { parseMessage } from "./parser.js";

functions.cloudEvent('entryPoint', async cloudEvent => {
  const base64Message = cloudEvent.data.message.data;
  if (!base64Message) {
    console.log('No message received!');
    return;
  }
  const messageJson = Buffer.from(base64Message, 'base64').toString();
  const message = JSON.parse(messageJson);
  const { notionPageId, generatedText, generatedTitle, generatedComment } = message;
  const children = parseMessage(generatedText);
  await apply(notionPageId, generatedTitle, children, generatedComment)
});
