import axios from "axios";

//baseURL: "https://cms-portfolio-backend-node.herokuapp.com/api",
//baseURL: "http://localhost:8080/api"
export default axios.create({
    baseURL: "https://cms-portfolio-backend-node.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});