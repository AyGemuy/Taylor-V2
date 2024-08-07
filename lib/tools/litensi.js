import fetch from "node-fetch";
class ApiService {
  constructor(apiId, apiKey) {
    this.apiId = apiId || "245", this.apiKey = apiKey || "2ba9b5bd-76fc-4da1-9ab5-e8f3508e92a4",
      this.baseEndpoint = "https://litensi.id/api";
  }
  async fetchData(endpoint, params) {
    try {
      const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            api_id: this.apiId,
            api_key: this.apiKey,
            ...params
          })
        },
        url = `${this.baseEndpoint}/${endpoint}`,
        response = await fetch(url, requestOptions);
      return await response.json();
    } catch (error) {
      throw console.error("Error fetching data:", error), error;
    }
  }
  async getProfileData() {
    return await this.fetchData("profile", {});
  }
  async getServicesData(category, filter) {
    return await this.fetchData("services", {
      category: category,
      filter: filter
    });
  }
  async placeOrder(serviceId, target, quantity, customComments, customLink) {
    return await this.fetchData("order", {
      service: serviceId,
      target: target,
      quantity: quantity,
      custom_comments: customComments || "",
      custom_link: customLink || ""
    });
  }
  async getOrderStatus(orderId) {
    return await this.fetchData("status", {
      id: orderId
    });
  }
  async getSMSCountries() {
    return await this.fetchData("sms/countries", {});
  }
  async getSMSServices() {
    return await this.fetchData("sms/services", {});
  }
  async getSMSOperators() {
    return await this.fetchData("sms/operators", {});
  }
  async getSMSPrices(countryId, serviceId, priceFilter) {
    return await this.fetchData("sms/prices", {
      country: countryId,
      service: serviceId,
      price_filter: priceFilter
    });
  }
  async placeSMSOrder(countryId, serviceId, operator, maxPrice) {
    return await this.fetchData("sms/order", {
      country: countryId,
      service: serviceId,
      operator: operator,
      max_price: maxPrice || ""
    });
  }
  async getSMSStatus(orderId) {
    return await this.fetchData("sms/getstatus", {
      order_id: orderId
    });
  }
  async setSMSStatus(orderId, status) {
    return await this.fetchData("sms/setstatus", {
      order_id: orderId,
      status: status
    });
  }
}
export {
  ApiService
};