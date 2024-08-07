import qrcode from "qrcode";
import cheerio from "cheerio";
import moment from "moment-timezone";
import fetch from "node-fetch";
class Saweria {
  constructor(user_id) {
    this.user_id = user_id, this.baseUrl = "https://saweria.co", this.apiUrl = "https://backend.saweria.co";
  }
  async login(email, password) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }),
        {
          data
        } = await response.json();
      return data && data.id ? {
        creator: "Wudysoft",
        status: !0,
        data: {
          user_id: data.id
        }
      } : {
        creator: "Wudysoft",
        status: !1,
        msg: "Failed to login"
      };
    } catch (error) {
      return console.log(error), {
        creator: "Wudysoft",
        status: !1,
        msg: error.message
      };
    }
  }
  async createPayment(amount, msg = "Order") {
    try {
      if (!this.user_id) return {
        creator: "Wudysoft",
        status: !1,
        msg: "USER ID NOT FOUND"
      };
      const response = await fetch(`${this.apiUrl}/donations/${this.user_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            agree: !0,
            amount: Number(amount),
            customer_info: {
              first_name: "Payment Gateway",
              email: "gateway@nomisec07.tech",
              phone: ""
            },
            message: msg,
            notUnderAge: !0,
            payment_type: "qris",
            vote: ""
          })
        }),
        {
          data
        } = await response.json();
      if (!data || !data.id) return {
        creator: "Wudysoft",
        status: !1,
        msg: "Failed to create payment"
      };
      const qr_string = data.qr_string,
        qr_image = await qrcode.toDataURL(qr_string, {
          scale: 8
        });
      return {
        creator: "Wudysoft",
        status: !0,
        data: {
          ...data,
          expired_at: moment(data.created_at).add(10, "minutes").format("DD/MM/YYYY HH:mm:ss"),
          receipt: `${this.baseUrl}/qris/${data.id}`,
          url: `${this.baseUrl}/qris/${data.id}`,
          qr_image: qr_image
        }
      };
    } catch (error) {
      return console.log(error), {
        creator: "Wudysoft",
        status: !1,
        msg: error.message
      };
    }
  }
  async checkPayment(id) {
    try {
      if (!this.user_id) return {
        creator: "Wudysoft",
        status: !1,
        msg: "USER ID NOT FOUND"
      };
      const response = await fetch(`${this.baseUrl}/receipt/${id}`, {
          method: "GET",
          headers: {
            Accept: "*/*"
          }
        }),
        text = await response.text(),
        msg = cheerio.load(text)("h2.chakra-heading.css-14dtuui").text();
      if (!msg) return {
        creator: "Wudysoft",
        status: !1,
        msg: '❌ Transaction not found or not completed\n\nNote: Please check the transaction status by typing "check" again if you are sure you have completed the payment transaction.'
      };
      return {
        creator: "Wudysoft",
        status: "berhasil" === msg.toLowerCase(),
        msg: msg.toUpperCase()
      };
    } catch (error) {
      return console.log(error), {
        creator: "Wudysoft",
        status: !1,
        msg: error.message
      };
    }
  }
}
export {
  Saweria
};