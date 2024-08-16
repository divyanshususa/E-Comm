import axios from "axios";
// import config from "../configurations/config";
class DashBoardService {
  async getApiCall(url, token) {
    const header = {
      // "Accept": "application/json",
      Authorization: `${token}`,
    };
    console.log(header);
    return await axios.get(url, { headers: header });
  }

  async postApiCall(url, data, token) {
    const header = {
      // "Accept": "application/json",
      Authorization: `${token}`,
    };

    return await axios.get(url, data, { headers: header });
  }
}
const dashboardService = new DashBoardService();
export default dashboardService;
