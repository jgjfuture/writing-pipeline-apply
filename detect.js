import { notion, databaseId } from "./notion.js"

export async function detect() {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Detected',
            checkbox: {
                equals: false,
            },
        }
    });

    const items = response.results;
    return items;
}
