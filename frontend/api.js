import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default {
  getArticles() {
    return client.get("/article");
  },

  login(username, password) {
    return client.post("/auth", {
      username,
      password,
    });
  },

  logout() {
    return client.post("/auth/logout");
  },

  getCompanies() {
    return client.get("/company");
  },

  getCompany(id) {
    return client.get(`/company/${id}`);
  },

  getTags() {
    return client.get("/tag");
  },

  addTag(tag) {
    return client.post("/tag", tag);
  },

  addArticle(article) {
    return client.post("/article", article);
  },

  getCsrfToken() {
    return client.get("/csrf-token");
  },
};
