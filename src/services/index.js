import { environment } from "../env";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getTodos() {
  return axios
    .get(environment.base_api_url + "todos")
    .then((response) => response.data)
    .catch((error) => error.message);
}
export function addTodo(body) {
  return axios
    .post(environment.base_api_url + "todos", body)
    .then((response) => response.data)
    .catch((error) => error.message);
}
export function updateTodo(body, id) {
  return axios
    .put(environment.base_api_url + "todos/" + id, body)
    .then((response) => response.data)
    .catch((error) => error.message);
}

export function deleteTodo(id) {
  return axios
    .delete(environment.base_api_url + "todos/"+ id)
    .then((response) => response.data)
    .catch((error) => error.message);
}
