import { InjectionToken } from "@angular/core";

export interface StorageService {
    setItem: (key: string, value: unknown) => void;

    getItem: (key: string) => unknown;

    removeItem: (key: string) => void;

    clear: () => void;
}

export const LOCAL_STORAGE = new InjectionToken<string>('LOCAL_STORAGE');

export const SESSION_STORAGE = new InjectionToken<string>('SESSION_STORAGE');