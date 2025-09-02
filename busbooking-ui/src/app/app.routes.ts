import { Routes } from '@angular/router';
import { TripsComponent } from './features/trips.component';
import { BookingsComponent } from './features/bookings.component';
import { ContactComponent } from './features/contact.component';
import { TripDetailsComponent } from './features/trip-details.component';
import { AdminTripsComponent } from './features/admin-trips.component';
import { AdminLoginComponent } from './features/admin-login.component';
import { LoginComponent } from './features/login.component';
import { RegisterComponent } from './features/register.component';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripsComponent },
  { path: 'trips/:id', component: TripDetailsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/trips', component: AdminTripsComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
