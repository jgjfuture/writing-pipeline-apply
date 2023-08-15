export function parseMessage(message) {
    const textItems = preProcessMessage(message);
    const blocks = textItems.map(textItem => {
        if(textItem.startsWith('- [ ] ')) {
            return makeToDoItemBlock(textItem.substring(6));
        } else if (textItem.startsWith('- ')) {
            return makeBulletListItemBlock(textItem.substring(2));
        } else {
            return makeParagraphBlock(textItem);
        }
    });
    return blocks;
}

function preProcessMessage(message) {
    const textItems = message.split('\n');
    // delete trailing space from each line
    const trimmedTextItems = textItems.map(textItem => textItem.trim());
    return trimmedTextItems;
}

function makeBulletListItemBlock(text) {
    return {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: text,
                    },
                },
            ],
        }
    }
}

function makeToDoItemBlock(text) {
    return {
        object: 'block',
        type: 'to_do',
        to_do: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: text,
                    },
                },
            ],
        }
    }
}

function makeParagraphBlock(text) {
    return {
        object: 'block',
        type: 'paragraph',
        paragraph: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: text,
                    },
                },
            ],
        },
    }
}