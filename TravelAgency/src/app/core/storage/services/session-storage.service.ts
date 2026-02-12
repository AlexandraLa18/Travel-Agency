import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE } from '../models/storage-service.model';
import { AbstractStorageService } from './abstract-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends AbstractStorageService {
  constructor(@Inject(SESSION_STORAGE) private readonly storage: Storage) {
    super(storage);
  }
}
