import { notion } from "./notion.js"

export async function resolve(id) {
    await notion.pages.update({
        page_id: id,
        properties: {
            Detected: {
                checkbox: true,
            },
        },
    });
}