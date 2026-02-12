import { Injectable } from "@angular/core";
import { StorageService } from "../models/storage-service.model";

@Injectable()
export class AbstractStorageService implements StorageService {
    constructor(private readonly _storage: Storage) { }

    clear(): void {
        this._storage.clear();
    }

    getItem(key: string): unknown {
        const item = this._storage.getItem(key);
        return item == null ? item : JSON.parse(item);
    }

    removeItem(key: string): void {
        this._storage.removeItem(key);
    }

    setItem(key: string, value: unknown): void {
        const valueToBePersisted = value === null || value === undefined ? value : JSON.stringify(value);
        if (valueToBePersisted !== null && valueToBePersisted !== undefined) {
            this._storage.setItem(key, valueToBePersisted);
        }
    }
}