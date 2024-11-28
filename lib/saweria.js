import qrcode from "qrcode";
import * as cheerio from "cheerio";
import moment from "moment-timezone";
import fetch from "node-fetch";
moment.tz.setDefault("Asia/Jakarta");
class Saweria {
  constructor(user_id) {
    this.user_id = user_id;
    this.baseUrl = "https://saweria.co";
    this.apiUrl = "https://backend.saweria.co";
    this.token = "";
    this.saweria = "";
  }
  async login(email, password) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const { data } = await response.json();
      if (!data || !data.id) {
        return {
          status: false,
          msg: "Failed to login",
        };
      }
      return {
        status: true,
        data: {
          user_id: data.id,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        msg: error.message,
      };
    }
  }
  async createQr(amount, msg = "Order") {
    try {
      if (amount < 1e3) {
        return {
          status: false,
          msg: "Minimum Deposit 1.000",
        };
      }
      if (!this.user_id) {
        return {
          status: false,
          msg: "USER ID NOT FOUND",
        };
      }
      const response = await fetch(`${this.apiUrl}/donations/${this.user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agree: true,
          amount: Number(amount),
          customer_info: {
            first_name: "Payment Gateway",
            email: "gateway@nomisec07.tech",
            phone: "",
          },
          message: msg,
          notUnderAge: true,
          payment_type: "qris",
          vote: "",
        }),
      });
      const { data } = await response.json();
      if (!data || !data.id) {
        return {
          status: false,
          msg: "Failed to create payment",
        };
      }
      const qr_string = data.qr_string;
      const qr_image = await qrcode.toDataURL(qr_string, {
        scale: 8,
      });
      return {
        status: true,
        data: {
          ...data,
          expired_at: moment(data.created_at)
            .add(10, "minutes")
            .format("DD/MM/YYYY HH:mm:ss"),
          receipt: `${this.baseUrl}/qris/${data.id}`,
          url: `${this.baseUrl}/qris/${data.id}`,
          qr_image: qr_image,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        msg: error.message,
      };
    }
  }
  async cekPay(id) {
    try {
      if (!this.user_id) {
        return {
          status: false,
          msg: "USER ID NOT FOUND",
        };
      }
      const response = await fetch(`${this.baseUrl}/receipt/${id}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      const text = await response.text();
      const $ = cheerio.load(text);
      const msg = $("h2.chakra-heading.css-14dtuui").text();
      if (!msg) {
        return {
          status: false,
          msg: "PENDING",
        };
      }
      const status = msg.toLowerCase() === "berhasil";
      return {
        status: true,
        msg: "SUCCESS",
        url: `${this.baseUrl}/receipt/${id}`,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        msg: error.message,
      };
    }
  }
  async register(email) {
    try {
      const res = await fetch(this.apiUrl + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: this.baseUrl,
        },
        body: JSON.stringify({
          email: email,
          currency: "IDR",
        }),
      });
      const data = await res.json();
      return {
        success: true,
        data: `Check Email On ${data.data.email}`,
        email: data.data.email,
      };
    } catch (e) {
      return {
        success: false,
        data: "Email Is Taken",
        email: email,
      };
    }
  }
  async getUser() {
    if (!this.token)
      throw new Error("Please login first or setup token manually");
    try {
      const res = await fetch(this.apiUrl + "/users", {
        headers: {
          Authorization: this.token,
          origin: this.baseUrl,
        },
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      throw e;
    }
  }
  async getSaweria(url) {
    if (!/saweria\.co\/\w+/gi.test(url)) throw new Error("Invalid URL");
    try {
      const html = await fetch(url)
        .then((v) => v.text())
        .then((v) => cheerio.load(v)("script#__NEXT_DATA__").text().trim())
        .then((v) => JSON.parse(v))
        .then((v) => v.props.pageProps.data);
      return html;
    } catch (e) {
      throw e;
    }
  }
  async setToken(token) {
    this.token = token;
  }
  async setSaweria(username) {
    this.saweria = `${this.baseUrl}/${username}`;
  }
  async createPayment(amount = 1e3, message = "hi", token = this.token) {
    if (!this.token) throw new Error("Login Required");
    if (amount < 1e3)
      throw new Error(
        "Invalid Amount Of Money, Enter More Or Equal To 1000 RP",
      );
    try {
      const user = await this.getUser();
      const res = await fetch(this.apiUrl + `/donations/${user.id}`, {
        method: "POST",
        headers: {
          origin: this.baseUrl,
          Authorization: this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agree: true,
          amount: amount,
          currency: "IDR",
          customer_info: {
            first_name: user.username,
            email: user.email,
            phone: "",
          },
          message: message,
          notUnderage: true,
          payment_type: "qris",
          vote: "",
        }),
      });
      const data = await res.json();
      return {
        link: `${this.baseUrl}/qris/${data.data.id}`,
        ...data,
      };
    } catch (e) {
      throw e;
    }
  }
  async sendPayment(url, amount = 1e3, message = "hi") {
    try {
      const pay = await this.getSaweria(url);
      return await this.createPayment(amount, message, pay.id);
    } catch (e) {
      throw e;
    }
  }
  async status(id) {
    try {
      const data = await fetch(`${this.apiUrl}/donations/qris/${id}`).then(
        (v) => v.json(),
      );
      return {
        id: id,
        done: data.data.qr_string === "" ? true : false,
        ...data,
      };
    } catch (e) {
      throw e;
    }
  }
  async getBalance() {
    if (!this.token) throw new Error("Login to your saweria account first");
    try {
      const res = await fetch(this.apiUrl + "/donations/balance", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
          Authorization: this.token,
          origin: this.baseUrl,
        },
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      throw e;
    }
  }
  async getTransaction(page = 1) {
    if (!this.token) throw new Error("Login to your saweria account first");
    try {
      const res = await fetch(
        this.apiUrl + `/transactions?page=${page}&page_size=15`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            Authorization: this.token,
            origin: this.baseUrl,
          },
        },
      );
      const transactions = await res.json();
      return transactions.data;
    } catch (e) {
      throw e;
    }
  }
}
export { Saweria };
