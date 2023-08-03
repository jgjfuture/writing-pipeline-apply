import { notion } from "./notion.js"

export async function apply(id, children) {
    await notion.blocks.children.append({
        block_id: id,
        children: children
    });
}