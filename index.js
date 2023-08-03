import functions from "@google-cloud/functions-framework";
import { detect } from "./detect.js";
import { resolve } from "./resolve.js";
import { publishMessage, makePublishData } from "./publish.js";
import { topicName } from "./pubsub.js";

functions.http('helloHttp', async (req, res) => {
  const detectedItems = await detect();
  for (const item of detectedItems) {
    const metaId = item.id;
    const paper = item.properties.paper;
    const imageURL = paper.files[0].file.url;
    console.log("Detected:", metaId);
    await publishMessage(topicName, makePublishData(metaId, imageURL));
    await resolve(metaId);
  }
  res.send("OK");
});