import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './storage/services/local-storage.service';
import { SessionStorageService } from './storage/services/session-storage.service';
import { LOCAL_STORAGE, SESSION_STORAGE } from './storage/models/storage-service.model';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [RouterModule, HttpClientModule],
  providers: [
    LocalStorageService,
    SessionStorageService,
    {
      provide: LOCAL_STORAGE,
      useValue: localStorage
    },
    {
      provide: SESSION_STORAGE,
      useValue: sessionStorage
    }
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
