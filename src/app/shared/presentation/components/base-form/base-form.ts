import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseForm {
  protected abstract form: FormGroup;

  protected resetForm(): void {
    this.form.reset();
  }

  protected isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);

    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
