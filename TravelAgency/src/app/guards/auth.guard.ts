import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionStorageService } from '../core/storage/services/session-storage.service';
import { JWT_TOKEN } from '../core/storage/constants/local-storage.const';

export const authenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const sessionStorage = inject(SessionStorageService);
  const isLoggedIn = !!sessionStorage.getItem(JWT_TOKEN);

  if (!isLoggedIn) {
    router.navigateByUrl('');
    return false;
  }

  return true;
};

