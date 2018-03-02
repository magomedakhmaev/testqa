import axios from 'axios';
import {ToastSuccess} from 'react-toastr-basic';
import {ToastDanger} from 'react-toastr-basic';

class Api {
    url = 'http://localhost:8000/api';

    get(url) {
        return axios.get(this.url + url).then((results) => results.data).catch((err) => ToastDanger(err.response.data.message));
    };

    post(url, data) {
        return axios.post(this.url + url, data).then((results) => {
            const data = results.data;
            if (data.message) {
                data.success ? ToastSuccess(data.message) : ToastDanger(data.message);
            }
            return data;
        }).catch((err) => ToastDanger(err.response.data.message));
    }
}

export default new Api();