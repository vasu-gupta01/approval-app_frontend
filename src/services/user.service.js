import axios from "axios";
import config from "../config/config";

const API_URL = "/api/";

class UserService {
  getForm(body) {
    return axios.post(API_URL + "getform", body);
  }

  getDepartments() {
    return axios.get(API_URL + "getdepartments");
  }
}

export default new UserService();
