import http from "../http-common";

class BlogDataService {
    getAll() {
        return http.get("/blogs");
    }

    get(id) {
        return http.get(`/blogs/${id}`);
    }

    create(data) {
        return http.post("/blogs", data);
    }

    update(id, data) {
        return http.put(`/blogs/${id}`, data);
    }

    delete(id) {
        return http.delete(`/blogs/${id}`);
    }

    deleteAll() {
        return http.delete(`/blogs`);
    }

    findByParent(id) {
        return http.get(`/blogs/parent/${id}`)
    }

    findByTitle(title) {
        return http.get(`/blogs?title=${title}`);
    }
}

export default new BlogDataService();