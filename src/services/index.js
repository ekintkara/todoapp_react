import { environment } from "../env";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";


export function getTodos() {
  return axios
    .get(environment.base_api_url + "todos")
    .then((response) => response.data)
    .catch((error) => error.message);
}
