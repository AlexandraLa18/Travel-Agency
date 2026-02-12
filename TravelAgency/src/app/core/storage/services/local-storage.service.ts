import { Injectable, Inject } from '@angular/core';
import { AbstractStorageService } from './abstract-storage.service';
import { LOCAL_STORAGE } from '../models/storage-service.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends AbstractStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly storage: Storage) {
    super(storage);
  }
}
