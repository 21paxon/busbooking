import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="contact-container">
      <!-- Header -->
      <div class="contact-header">
        <div class="header-content">
          <h1 class="page-title">Contact Us</h1>
          <p class="page-subtitle">Get in touch with our team for any questions or support</p>
        </div>
      </div>

      <!-- Content -->
      <div class="contact-content">
        <div class="container">
          <div class="contact-grid">
            <!-- Contact Form -->
            <div class="contact-form-section">
              <div class="form-card">
                <h2 class="form-title">Send us a message</h2>
                <p class="form-subtitle">We'll get back to you within 24 hours</p>
                
                <form class="contact-form" (ngSubmit)="submitForm()">
                  <div class="form-row">
                    <div class="form-field">
                      <label for="firstName">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        [(ngModel)]="formData.firstName" 
                        name="firstName"
                        required
                        class="form-input"
                        placeholder="Enter your first name"
                      >
                    </div>
                    <div class="form-field">
                      <label for="lastName">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        [(ngModel)]="formData.lastName" 
                        name="lastName"
                        required
                        class="form-input"
                        placeholder="Enter your last name"
                      >
                    </div>
                  </div>

                  <div class="form-field">
                    <label for="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      [(ngModel)]="formData.email" 
                      name="email"
                      required
                      class="form-input"
                      placeholder="Enter your email address"
                    >
                  </div>

                  <div class="form-field">
                    <label for="subject">Subject *</label>
                    <select 
                      id="subject" 
                      [(ngModel)]="formData.subject" 
                      name="subject"
                      required
                      class="form-input"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label for="message">Message *</label>
                    <textarea 
                      id="message" 
                      [(ngModel)]="formData.message" 
                      name="message"
                      required
                      rows="5"
                      class="form-input"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button type="submit" class="submit-button" [disabled]="submitting">
                    <svg *ngIf="!submitting" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                    <div *ngIf="submitting" class="submit-spinner"></div>
                    {{ submitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="contact-info-section">
              <div class="info-card">
                <h2 class="info-title">Get in Touch</h2>
                <p class="info-subtitle">We're here to help and answer any questions you might have</p>
                
                <div class="contact-methods">
                  <div class="contact-method">
                    <div class="method-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="method-content">
                      <h3 class="method-title">Visit Us</h3>
                      <p class="method-detail">123 Travel Street<br>City, State 12345<br>United States</p>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="method-content">
                      <h3 class="method-title">Call Us</h3>
                      <p class="method-detail">+1 (555) 123-4567<br>Mon-Fri: 8AM-8PM<br>Sat-Sun: 9AM-6PM</p>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="method-content">
                      <h3 class="method-title">Email Us</h3>
                                             <p class="method-detail">info&#64;busbooking.com<br>support&#64;busbooking.com<br>24/7 Support Available</p>
                    </div>
                  </div>
                </div>

                <div class="social-links">
                  <h3 class="social-title">Follow Us</h3>
                  <div class="social-icons">
                    <a href="#" class="social-link" aria-label="Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" class="social-link" aria-label="Twitter">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" class="social-link" aria-label="Instagram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                      </svg>
                    </a>
                    <a href="#" class="social-link" aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };

  submitting = false;

  submitForm() {
    if (this.formData.firstName && this.formData.lastName && this.formData.email && this.formData.subject && this.formData.message) {
      this.submitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.resetForm();
        this.submitting = false;
      }, 2000);
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
