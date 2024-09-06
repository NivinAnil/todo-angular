import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  LucideAngularModule,
  List,
  Search,
  Edit,
  Trash2,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronFirst,
  ChevronLast,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        List,
        Search,
        Edit,
        Trash2,
        ChevronFirst,
        ChevronLast,
        ChevronsLeft,
        ChevronLeft,
        ChevronRight,
        ChevronsRight,
      })
    ),
  ],
};
