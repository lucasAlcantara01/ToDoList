const connection = require('./connection');

// funções
const getAll = async() => {
    const tasks = await connection.execute('select * from tasks');
    return tasks[0];
};

const createTask = async (task) => {
    const {title} = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]); 
    return {insertId: createdTask.insertID};
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
}

const updateTask = async (id, task) => {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const { title, status} = task;

    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
}

// Exporta 

module.exports = { 
    getAll,
    createTask,
    deleteTask,
    updateTask,
};