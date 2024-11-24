class HttpClient {
  constructor(baseURL = "https://my.api.mockaroo.com/") {
    this.baseURL = baseURL;
  }

  async request(
    endpoint,
    count = 10,
    { method = "GET", headers = {}, body = null } = {}
  ) {
    const queryParam = `count=${count}`;
    const url = `${this.baseURL}${endpoint}.json?${queryParam}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "2dde4970",
        ...headers,
      },

      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  get(endpoint, count = 10, headers = {}) {
    return this.request(endpoint, count, { method: "GET", headers });
  }
}

module.exports = new HttpClient();
