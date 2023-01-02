import axios from 'axios';

const url = 'https://backendtimeline.herokuapp.com/tasks';

export const fetchTasks = () => axios.get(url);
export const createTask = (newTask) => axios.post(url, newTask);
export const likeTask = (id) => axios.patch(`${url}/${id}/likeTask`);
export const updateTask = (id, updatedTask) => axios.patch(`${url}/${id}`, updatedTask);
export const deleteTask = (id) => axios.delete(`${url}/${id}`);
