import axios from "axios";
import constants from './constants.json'

export default axios.create({
    baseURL: constants.BaseServer,
})