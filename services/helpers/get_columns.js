const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function padDigit(number) {
    return number < 10 ? '0' + number : number
}

function getPayload(databaseId) {
    return {
        path: `databases/${databaseId}/query`,
        method: 'POST',
    }
}

const databaseId = process.env.SCHEDULE_DB_ID;

module.exports = async function getColumns() {
    const main_payload = getPayload(databaseId)
    const { results: main_db } = await notion.request(main_payload)

    var time = new Date()
    const today = time.getFullYear() + '-' + padDigit(time.getMonth() + 1) + '-' + padDigit(time.getDate())
    const page_id = main_db.filter(x => x.properties.Date.date.start === today)[0].id
    const page_block = await notion.blocks.children.list({
        block_id: page_id,
        page_size: 100
    });
    const main_block_id = page_block.results[0].id

    const { results: columns } = await notion.blocks.children.list({
        block_id: main_block_id
    });

    const { results: schedule_column } = await notion.blocks.children.list({
        block_id: columns[0].id
    });

    const { results: second_column } = await notion.blocks.children.list({
        block_id: columns[1].id
    });

    return {
        schedule_column,
        second_column
    }
}