import '@babel/polyfill';
import { bookTour } from './checkout';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updatePassword, updateUser } from './updateUser';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-settings');
const btnSavePassword = document.querySelector('.btn--save-password');
const bookBtn = document.getElementById('book-tour');

if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    if (locations) displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

if (userDataForm) {
    userDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        await updateUser(form);

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    });
}

if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnSavePassword.textContent = 'Updating...';
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updatePassword(passwordCurrent, password, passwordConfirm);

        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
        btnSavePassword.textContent = 'Save password';
    });
}

if (bookBtn) {
    bookBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.target.textContent = 'Processing...';
        const tourId = bookBtn.dataset.tourId;
        await bookTour(tourId);
        e.target.textContent = 'Book tour now!';
    });
}