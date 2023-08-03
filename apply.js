import { notion } from "./notion.js"

export async function apply(id, children) {
    await notion.blocks.children.append({
        block_id: id,
        children: [makeHeddingBlock("WRITING PIPELINES RESULT"), ...children]
    });
}

function makeHeddingBlock(text) {
    return {
        object: 'block',
        type: 'heading_2',
        heading_2: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: text,
                    },
                },
            ]
        }
    }
}