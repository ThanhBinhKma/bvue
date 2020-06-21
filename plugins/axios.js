import { Promise } from "q";
import config from '../config'
 

export default function({ $axios }) {
    $axios.onRequest(setting => {
        if (localStorage.getItem('TOKEN')) {
            setting.headers.common['Authorization'] = localStorage.getItem('TOKEN');
        }
        if (JSON.parse(localStorage.getItem('auth.user'))) {
            setting.headers.common['token'] = JSON.parse(localStorage.getItem('auth.user')).token;
        }
        setting.headers.common['Access-Control-Allow-Origin'] = '*';
    });
    $axios.onResponse(response => {
        if (response.data.status === "SUCCESS") {
            return Promise.resolve(response)
        }
        return Promise.reject(response.data)
    })
}
