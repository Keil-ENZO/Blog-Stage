import axios from "axios";

const client = axios.create({
  baseURL: "http://109.176.197.108:3001/api",
});

export default {
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

  getArticles() {
    return client.get("/article");
  },

  getArticle(id) {
    return client.get(`/article/${id}`);
  },

  addArticle(article, csrfToken) {
    const token = "VALID_TOKEN";

    return client.post("/article", article, {
      headers: {
        Authorization: token,
        "X-Csrf-Token": csrfToken,
      },
    });
  },

  getCsrfToken() {
    return client.get("/csrf-token");
  },

  uploadImage(formData) {
    return client.post("/article/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  subscribeNewsletter(email) {
    return client.post("/newsletter", { email });
  },
};
