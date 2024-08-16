import axios from "axios";
import config from "../configuration/config";

class AuthService {
  async apiPostCall(url, data) {
    return await axios.post(url, data);
  }

  async login({ email, password }) {
    try {
      const data = { email, password };
      const url = `${config.baseUrl}/api/users/login`;
      const res = await this.apiPostCall(url, data);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async userSignup(data) {
    try {
      const res = await authService.apiPostCall(
        `${config.baseUrl}/api/users/signup`,
        data
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async Adminlogin({ email, password }) {
    try {
      const data = { email, password };
      const url = `${config.baseUrl}/api/admins/login`;
      const res = await this.apiPostCall(url, data);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async Vendorlogin({ email, password }) {
    try {
      const data = { email, password };
      const url = `${config.baseUrl}/api/vendors/login`;
      const res = await this.apiPostCall(url, data);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async VendorSignup(data) {
    try {
      const url = `${config.baseUrl}/api/vendors/signup`;
      const res = await this.apiPostCall(url, data);
      return res;
    } catch (err) {
      throw err;
    }
  }
  async forgetPassword({ email }) {
    try {
      const url = `${config.baseUrl}/api/forgotpassword?email=${email}`;
      return await this.apiPostCall(url);
    } catch (err) {
      throw err;
    }
  }
}
const authService = new AuthService();
export default authService;
