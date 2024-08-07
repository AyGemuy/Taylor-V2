import axios from "axios";
import parsePhoneNumber from "awesome-phonenumber";
const trueCallerModels = [{
    manufacturer: "Xiaomi",
    model: "M2010J19SG"
  }, {
    manufacturer: "Xiaomi",
    model: "POCO F1"
  }, {
    manufacturer: "Xiaomi",
    model: "Redmi 9A"
  }, {
    manufacturer: "Xiaomi",
    model: "Xiaomi Mi 4"
  }, {
    manufacturer: "Xiaomi",
    model: "Redmi Note 10 pro"
  }, {
    manufacturer: "Xiaomi",
    model: "Redmi Note 10"
  }, {
    manufacturer: "Xiaomi",
    model: "Xiaomi Redmi 1S"
  }, {
    manufacturer: "Xiaomi",
    model: "Xiaomi Mi 10T"
  }, {
    manufacturer: "Xiaomi",
    model: "Xiaomi Redmi 6 Pro"
  }, {
    manufacturer: "Xiaomi",
    model: "Xiaomi Redmi Y3"
  }, {
    manufacturer: "Xiaomi",
    model: "Xiaomi Redmi 9 Prime"
  }, {
    manufacturer: "Xiaomi",
    model: "Redmi Note 7"
  }, {
    manufacturer: "Vivo",
    model: "Vivo Y33s"
  }, {
    manufacturer: "Vivo",
    model: "Vivo V21 5G"
  }, {
    manufacturer: "Vivo",
    model: "Vivo Y20T"
  }, {
    manufacturer: "Vivo",
    model: "Vivo Y73 2021"
  }, {
    manufacturer: "Vivo",
    model: "Vivo X60"
  }, {
    manufacturer: "Vivo",
    model: "Vivo X70 Pro 5G"
  }, {
    manufacturer: "Vivo",
    model: "Vivo U3x"
  }, {
    manufacturer: "Vivo",
    model: "Vivo V20 Pro"
  }, {
    manufacturer: "Vivo",
    model: "Vivo Y21 2021"
  }, {
    manufacturer: "Vivo",
    model: "Vivo Y53s"
  }, {
    manufacturer: "Vivo",
    model: "Vivo S12 Pro"
  }, {
    manufacturer: "Vivo",
    model: "Vivo V21e 5G"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus Nord CE 5G"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus 9 Pro"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus 8T"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus 9"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus 7T"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus 6T"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus Nord 2"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus 7 Pro"
  }, {
    manufacturer: "OnePlus",
    model: "OnePlus Nord"
  }, {
    manufacturer: "Realme",
    model: "RMX2185"
  }, {
    manufacturer: "Realme",
    model: "Realme GT Neo2 5G"
  }, {
    manufacturer: "Realme",
    model: "Realme 8 5G"
  }, {
    manufacturer: "Realme",
    model: "Realme C11 2021"
  }, {
    manufacturer: "Realme",
    model: "Realme GT"
  }, {
    manufacturer: "Realme",
    model: "Realme Narzo 30"
  }, {
    manufacturer: "Realme",
    model: "Realme Q3i 5G"
  }, {
    manufacturer: "Realme",
    model: "Realme 8s 5G"
  }, {
    manufacturer: "Realme",
    model: "Realme 8i"
  }, {
    manufacturer: "Realme",
    model: "Realme Narzo 50A"
  }, {
    manufacturer: "Realme",
    model: "Realme C21Y"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A55"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A74 5G"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A53"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A31"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A12"
  }, {
    manufacturer: "Oppo",
    model: "OPPO Reno6 Pro"
  }, {
    manufacturer: "Oppo",
    model: "OPPO Reno6"
  }, {
    manufacturer: "Oppo",
    model: "OPPO F19 Pro"
  }, {
    manufacturer: "Oppo",
    model: "OPPO F19s"
  }, {
    manufacturer: "Oppo",
    model: "Oppo F19 Pro+"
  }, {
    manufacturer: "Oppo",
    model: "Oppo A33"
  }, {
    manufacturer: "Oppo",
    model: "Oppo Reno 3 Pro"
  }, {
    manufacturer: "Oppo",
    model: "Oppo Reno 4 Pro"
  }, {
    manufacturer: "Oppo",
    model: "Oppo Find X2"
  }, {
    manufacturer: "Oppo",
    model: "OPPO F15"
  }, {
    manufacturer: "Oppo",
    model: "OPPO Reno 2F"
  }, {
    manufacturer: "Oppo",
    model: "OPPO K3"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A9"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A1k"
  }, {
    manufacturer: "Oppo",
    model: "OPPO A5s"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M31s"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M32"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy F62"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M52 5G"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M12"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M51"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy F12"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy F22"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy A52"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy S20 FE 5G"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M52"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M62"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy S21 Ultra"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy A52s 5G"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy S21"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M21 2021"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy F42"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy A12"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy F41"
  }, {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M01 Core"
  }],
  device = trueCallerModels[Math.floor(Math.random() * trueCallerModels.length)];

function generateRandomString(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(36 * Math.random()));
  return result;
}
export async function TrueLogin(phoneNumber) {
  if (!phoneNumber) return "_use command *true login* as first!!_";
  const pn = parsePhoneNumber("+" + phoneNumber.toString());
  if (!pn?.g?.valid) return "Invalid phone number.";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
    },
    url: "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
    data: {
      countryCode: pn.g.regionCode,
      dialingCode: pn.g.countryCode,
      installationDetails: {
        app: {
          buildVersion: 5,
          majorVersion: 11,
          minorVersion: 7,
          store: "GOOGLE_PLAY"
        },
        device: {
          deviceId: generateRandomString(16),
          language: "en",
          manufacturer: device.manufacturer,
          model: device.model,
          osName: "Android",
          osVersion: "10",
          mobileServices: ["GMS"]
        },
        language: "en"
      },
      phoneNumber: pn.g.number.significant,
      region: "region-2",
      sequenceNo: 2
    }
  };
  try {
    const res = await axios(options);
    return res.response ? res.response : {
      key: res.data.requestId,
      number: phoneNumber
    };
  } catch (e) {
    return e.response.data.message;
  }
}
export async function TrueOtp(number, key, otp) {
  if (!number) return "_use command *true login* as first!!_";
  const pn = parsePhoneNumber("+" + number.toString()),
    options = {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "accept-encoding": "gzip",
        "user-agent": "Truecaller/11.75.5 (Android;10)",
        clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
      },
      url: "https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp",
      data: {
        countryCode: pn.g.regionCode,
        dialingCode: pn.g.countryCode,
        phoneNumber: pn.g.number.significant,
        requestId: key,
        token: otp.toString().trim()
      }
    };
  try {
    const res = await axios(options);
    return res.data.installationId ? {
      token: res.data.installationId
    } : res.data.message;
  } catch (e) {
    return "_sessions closed!!_";
  }
}
export async function TrueSearch(token, number) {
  if (!token) return {
    status: !1,
    message: "*_Please login to truecaller as first_*\n_true *login* to login truecaller_\n\n_example: *true login* 62xxxxx_"
  };
  const searchData = {
      number: number.toString(),
      installationId: token
    },
    phoneNumber = parsePhoneNumber("+" + searchData.number.toString()),
    significantNumber = phoneNumber?.g?.number?.significant;
  return axios.get("https://search5-noneu.truecaller.com/v2/search", {
    params: {
      q: significantNumber,
      countryCode: phoneNumber.g.regionCode,
      type: 4,
      locAddr: "",
      placement: "SEARCHRESULTS,HISTORY,DETAILS",
      encoding: "json"
    },
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      Authorization: `Bearer ${searchData.installationId}`
    }
  }).then(response => {
    const obj = {
        status: !0
      },
      res = response.data;
    return obj.result = res, obj;
  }, error => ({
    status: !1,
    message: error.response.statusText
  }));
}
export async function TrueSearchBulk(token, number) {
  if (!token) return {
    status: !1,
    message: "*_Please login to truecaller as first_*\n_true *login* to login truecaller_\n\n_example: *true login* 62xxxxx_"
  };
  const searchData = {
      number: number.toString(),
      installationId: token
    },
    phoneNumber = parsePhoneNumber("+" + searchData.number.toString()),
    significantNumber = phoneNumber?.g?.number?.significant;
  return axios.get("https://search5-noneu.truecaller.com/v2/bulk", {
    params: {
      q: significantNumber,
      countryCode: phoneNumber.g.regionCode,
      type: 14,
      placement: "SEARCHRESULTS,HISTORY,DETAILS",
      encoding: "json"
    },
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      Authorization: `Bearer ${searchData.installationId}`
    }
  }).then(response => {
    const obj = {
        status: !0
      },
      res = response.data;
    return obj.result = res, obj;
  }, error => ({
    status: !1,
    message: error.response.statusText
  }));
}