const getColumns = require('./helpers/get_columns');

module.exports = async function getScheduleBlock() {
    const {second_column} = await getColumns()

    const goals = []
    const habits = []
    const todos = []

    let divider = false

    second_column.forEach(item => {
        if(item.type === 'divider') divider = true
        if(!divider && item.type === 'numbered_list_item'){
            goals.push(item.numbered_list_item.rich_text[0].plain_text)
        }
        if(divider && item.type === 'numbered_list_item'){
            habits.push(item.numbered_list_item.rich_text[0].plain_text)
        }
        if(item.type === 'to_do'){
            const todo_item = {
                'text' : item.to_do.rich_text[0].plain_text,
                'checked' : item.to_do.checked
            }
            todos.push(todo_item)
        }
    });

    return {goals, habits, todos}
}
