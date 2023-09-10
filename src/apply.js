import { notion } from "./notion.js"

export async function apply(id, title, children, comment) {
    await notion.blocks.children.append({
        block_id: id,
        children: [makeHeddingBlock("WRITING PIPELINES RESULT"), ...children]
    });
    await notion.pages.update({
        page_id: id,
        properties: {
            "名前": {
                title: [
                    {
                        type: "text",
                        text: {
                            content: title
                        }
                    }
                ]
            }
        }
    });
    await notion.comments.create({
        parent: {
            page_id: id
        },
        text: [
            {
                type: "text",
                text: {
                    content: comment
                }
            }
        ]
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