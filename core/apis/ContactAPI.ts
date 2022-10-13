import { API_URL } from '@stdio/configs/config';
import axios from 'axios';

const CONTACT_URL = `${API_URL}/contact`;

export interface ContactForm {
    email: string;
    name: string;
    phone: string;
    message: string;
}

export const ContactAPI = {
    sendMail: (data: ContactForm) => axios.post(`${CONTACT_URL}`, data),
};
