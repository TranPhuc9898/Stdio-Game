import cookie from 'js-cookie';
import nextCookie from 'next-cookies';

export const Storage = {
    Cookie: {
        get: <T extends unknown>(key: string): T | null => {
            const item = cookie.get(key);
            try {
                return !!item ? JSON.parse(item) : null;
            } catch {
                return null;
            }
        },
        set: <T extends unknown>(key: string, value: T, expires = 1) => {
            cookie.set(key, JSON.stringify(value), { expires });
        },
        remove: (key: string) => {
            cookie.remove(key);
        },
    },
    ServerCookie: {
        get: <T extends unknown>(
            key: string,
            ctx: { req?: { headers: { cookie?: string } } },
        ): T | null => {
            const item = nextCookie(ctx)[key] as T;
            try {
                return !!item ? item : null;
            } catch {
                return null;
            }
        },
    },
    Session: {
        get: <T extends unknown>(key: string): T | null => {
            const item = sessionStorage.getItem(key);
            try {
                return !!item ? JSON.parse(item) : null;
            } catch {
                return null;
            }
        },
        set: <T extends unknown>(key: string, value: T) => {
            if (value === null) return;
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        remove: (key: string) => {
            sessionStorage.removeItem(key);
        },
    },
    Local: {
        get: <T extends unknown>(key: string): T | null => {
            const item = localStorage.getItem(key);
            try {
                return !!item ? JSON.parse(item) : null;
            } catch {
                return null;
            }
        },
        set: <T extends unknown>(key: string, value: T) => {
            if (value === null) return;
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove: (key: string) => {
            localStorage.removeItem(key);
        },
    },
};
