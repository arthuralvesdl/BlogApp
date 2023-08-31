import axios from "axios";

export default axios.create({
    //BASE URL CHANGE WHEN EXECUTE NGROK
    baseURL: "https://f7c6-2804-d45-b030-6d00-486-e1b3-ff3-a0d5.ngrok.io"
})