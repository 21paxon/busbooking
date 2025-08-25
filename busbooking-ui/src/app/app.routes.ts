import { Routes } from '@angular/router';
import { TripsComponent } from './features/trips.component';
import { BookingsComponent } from './features/bookings.component';
import { ContactComponent } from './features/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'contact', component: ContactComponent },
];
