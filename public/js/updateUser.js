import axios from 'axios';
import { showAlert } from './alert';

export const updateUser = async (form) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
            data: form
        });
        if (res.data.status === 'success') {
            showAlert('success', 'User updated successfully!');
            location.assign('/');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/updatePassword',
            data: {
                passwordCurrent,
                password,
                passwordConfirm
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Password updated successfully!');
            location.assign('/');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
