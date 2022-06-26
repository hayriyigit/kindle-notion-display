const getColumns = require('./helpers/get_columns');

module.exports = async function getScheduleBlock() {
    const {schedule_column} = await getColumns()

    return {
        'hours' : schedule_column.slice(2).reduce((prev, acc) => [...prev, acc.paragraph.rich_text[0]?.plain_text], []),
        'todos': schedule_column.slice(2).reduce((prev, acc) => [...prev, acc.paragraph.rich_text[1]?.plain_text], [])
    }
}
