import { Buffer } from 'buffer';
import { isEmpty } from 'lodash';
import moment from 'moment-timezone';
import { NextPageContext } from 'next';
import Router from 'next/router';
const commaNumber = require('comma-number');

const DEFAULT_TIMESTAMP = 1;
const DEFAULT_TIME_PATTERN = 'HH:mm:ss';
const DEFAULT_DATE_PATTERN = 'DD/MM/YYYY';
const DEFAULT_PRICE = 0;

export const serverRedirect = (ctx: NextPageContext, location: string) => {
    const { res } = ctx;
    if (typeof window === 'undefined' && res) {
        res.writeHead(302, {
            Location: location,
        });
        res.end();
    } else {
        Router.replace('/');
    }
};

export const extractResponseError = (err: any) => {
    const { response = null } = err;

    if (isEmpty(response)) {
        return err.message;
    }

    return err.response.data.message;
};

export const decodeToken = (token: string = '') => {
    return isEmpty(token) ? '' : JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

export const loadFbSdk = (doc: Document) => {
    const id = 'facebook-jssdk';

    if (doc.getElementById(id)) return;

    const scripts = doc.getElementsByTagName('script');
    if (scripts.length === 0) return;

    const element = doc.createElement('script');
    element.id = id;
    element.src = 'https://connect.facebook.net/en_US/sdk.js';

    (scripts as any)[0].parentNode.insertBefore(element, scripts[0]);
};

export const loadScriptAsync = (src: any) => {
    return new Promise((res) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = res;
        document.body.appendChild(script);
    });
};

export const nonAccentVietnamese = (text: string) => {
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    text = text.replace(/đ/g, 'd');

    text = text.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    text = text.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    text = text.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    text = text.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    text = text.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    text = text.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    text = text.replace(/Đ/g, 'D');

    text = text.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    text = text.replace(/\u02C6|\u0306|\u031B/g, '');

    return text;
};

export const nonAccentVietnameseLower = (text: string) => {
    text = text.toLowerCase();

    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    text = text.replace(/đ/g, 'd');

    // Some system encode vietnamese combining accent as individual utf-8 characters
    text = text.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    text = text.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

    return text;
};

export const parseFullSlug = (slug: string): { slug: string; internalId: string } | null => {
    if (isEmpty(slug)) return null;

    slug = slug.trim();

    const match = slug.match(/(.*)-(\w*)$/);
    if (match !== null) return { slug: match[1].trim(), internalId: match[2].trim() };

    return null;
};

const initialDefault = (value: any, initialValue: any) => {
    if (value !== undefined || value !== null) return value;
    return isEmpty(value) ? initialValue : value;
};

export const formatRelativeTime = (timestamp: number) => {
    return moment.unix(initialDefault(timestamp, DEFAULT_TIMESTAMP)).fromNow();
};

export const formatTime = (timestamp: number, pattern = 'HH:mm:ss') => {
    return moment
        .unix(initialDefault(timestamp, DEFAULT_TIMESTAMP))
        .format(initialDefault(pattern, DEFAULT_TIME_PATTERN));
};

export const formatDate = (timestamp: number, pattern = 'DD/MM/YYYY') => {
    return moment
        .unix(initialDefault(timestamp, DEFAULT_TIMESTAMP))
        .format(initialDefault(pattern, DEFAULT_DATE_PATTERN));
};

export const formatDateTime = (timestamp: number) => {
    return moment.unix(initialDefault(timestamp, DEFAULT_TIMESTAMP)).format('DD/MM/YYYY HH:mm:ss');
};

export const formatISO_8601 = (timestamp: number) => {
    return moment.unix(initialDefault(timestamp, DEFAULT_TIMESTAMP)).toString();
};

export const formatNumberToVND = (number: number | string = '') => {
    return (
        initialDefault(number, DEFAULT_PRICE)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫'
    );
};

export const formatWithCommas = (number: string | number) => {
    return initialDefault(number, DEFAULT_PRICE)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getCountText = (amount: string | number, oneText: any, moreText: any) => {
    return amount + ' ' + (amount === 1 ? oneText : moreText);
};

export const dataURLtoBlob = (dataURL: string, overrideMime?: string) => {
    let arr = dataURL.split(',');
    const m = arr?.[0] ?? ''.match(/:(.*?);/);

    let mime = overrideMime === undefined ? (m !== null ? m[1] : '') : overrideMime;

    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    return new Blob([u8arr], { type: mime });
};

export const blobTodataURL = (blob: Blob) => {
    return new Promise((res) => {
        var fr = new FileReader();
        fr.onload = (e) => {
            res(e?.target?.result ?? '');
        };
        fr.readAsDataURL(blob);
    });
};

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const strTrunc = (text: string, length = 200, postfix = '...') => {
    if (isEmpty(text)) return '';

    text = text.trim();
    if (text.length <= length) return text;

    let truncated = text.substr(0, length);
    if (text.charAt(length) === ' ') return truncated + ' ' + postfix;
    return truncated.substr(0, truncated.lastIndexOf(' ')) + ' ' + postfix;
};

export const getPureUserName = (username: string = '') => {
    if (isEmpty(username)) return '';

    username = username.trim();

    let match = username.match(/^@(.*)$/);
    if (match != null) match[1].trim();
    return '';
};

const isValidHttpUrl = (link: string) => {
    if (isEmpty(link)) return false;

    let url;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};

export const startWithHttpProtocol = (link: string) => {
    if (isEmpty(link)) return false;
    return /^((http|https):\/\/)/.test(link);
};

export const reformatWebsiteLink = (link: string) => {
    if (isEmpty(link)) return '/';

    link = link.trim();
    if (startWithHttpProtocol(link) === false) link = 'https://' + link;

    if (isValidHttpUrl(link)) return link;
    else return '/';
};

export const getRandomIntRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const isNumericC = (text: any) => {
    return isNaN(Number(text)) === false;
};

const commaNumberC = (value: number) => {
    const valueText = String(value);

    if (valueText.indexOf('e') > 0) return valueText;

    try {
        return commaNumber(value, '.', ',');
    } catch (e) {
        return value;
    }
};

export const getPartialDate = (date: string) => {
    var check = moment(date, 'YYYY/MM/DD');
    var month = check.format('MM');
    var day = check.format('DD');
    var year = check.format('YYYY');

    return [day, month, year];
};

export const getMonthYearStringFromDate = (date: string) => {
    const partial = getPartialDate(date);
    return partial[2] + '-' + partial[1];
};

export const getMonthYearDateFromString = (dateString: string) => {
    const [year, month] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1);
};

export const isToday = (timestamp: number) => {
    let today = moment().format('DD/MM/YYYY');
    let date = formatDate(timestamp);
    return today === date;
};

export const getRandomString = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const getCorrectTime = (hours: number, force: 'hours' | null = null) => {
    if (force === 'hours') return hours + ' giờ';

    let m = hours / (3 * 2 * 4);
    let w = 0;
    let d = 0;
    let r = 0;
    if (m >= 1) {
        m = Math.floor(m);
        if (hours % (3 * 2 * 4) > 0) {
            r = hours % (3 * 2 * 4);
            w = Math.round(r / (3 * 2));
            if (w === 4) {
                return m + 1 + ' tháng';
            }
            return m + ' tháng' + ' ' + w + ' tuần';
        }
        return m + ' tháng';
    } else {
        if (hours / (3 * 2) >= 1) {
            w = Math.floor(hours / (3 * 2));
            if (hours % (3 * 2) > 0) {
                r = hours % (3 * 2);
                d = Math.round(r / 3);
                if (d === 2) {
                    return w + 1 + ' tuần';
                }
                return w + ' tuần' + ' ' + d + ' buổi';
            }
            return w + ' tuần';
        } else {
            d = Math.floor(hours / 3);
            return d + ' buổi';
        }
    }
};
