import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationHelper {
  constructor() {}
  /**
   * Shows validation errors received by server side*
   * @param form
   * @param errorResponse
   */
  showValidationErrors(form, errorResponse) {
    if (errorResponse.status === 422) {
      const errors = errorResponse.error.errors;
      Object.keys(errors).forEach((prop) => {
        const formControl = form.get(prop);
        formControl.setErrors({
          serverError: errors[prop],
        });
      });
    }
  }
}
