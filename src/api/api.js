import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'b615313c-86e6-47ab-912d-eed9f2d1a6ec'
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    },

    follow(id) {
        return instance.post(`follow/${id}`);
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`);
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
