import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
    try {
        await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        showAlert('success', 'Tour booked successfully!');
        location.assign('/');
    } catch (err) {
        console.log(err);
        showAlert('error', err.response.data.message);
    }
};
