export const api = {
  token: "",
  baseUrl: "https://todo.hillel.it",
  headers: "",

  getToken() {
    const ref = localStorage.getItem("authToken");
    if (ref) this.token = ref;
    return ref;
  },

  setToken(token) {
    localStorage.setItem("authToken", token);
    this.token = token;
  },

  async request(url, method = "GET", body = null, headers = this.headers) {
    return await fetch(`${this.baseUrl}/${url}`, {
      method: method,
      headers: headers,
      body: body
    });
  },

  async auth() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const body = JSON.stringify({ value: "user@emailPassword" });
    return await this.request("auth/login", "POST", body, headers);
  },

  async getAll() {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.token}`);
    headers.set("Content-Type", "application/json");
    this.headers = headers;

    return await this.request(`todo`);
  },

  async addTodo(value) {
    const requestBody = JSON.stringify({
      value,
      priority: 1
    });
    return await this.request(`todo`, "POST", requestBody);
  },

  async removeTodo(id) {
    return await this.request(`todo/${id}`, "DELETE");
  },

  async updateTodo(id, value) {
    const requestBody = JSON.stringify({
      value: value,
      priority: 1
    });
    return await this.request(`todo/${id}`, "PUT", requestBody);
  },

  async toggleTodo(id) {
    return await this.request(`todo/${id}/toggle`, "PUT");
  }
};
