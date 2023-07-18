import { AbstractControl, ValidationErrors } from '@angular/forms';

export function pattern(control: AbstractControl): boolean | null {
  // console.log('type', this.patternCheck);
  const emailChazz = control.value as string;

  // if checked u of t for school
  // if(){} then can compartilize schools extensions to make for quicker pattern
  // check
  const regex0 = /^[a-zA-Z0-9._%+-]+@alum.utoronto\.ca/;
  const regex1 = /^[a-zA-Z0-9._%+-]+@mail.utoronto\.ca/;
  const regex2 = /^[a-zA-Z0-9._%+-]+@utoronto\.ca/;
  const regex3 = /^[a-zA-Z0-9._%+-]+@uoftpharmacy\.com/;
  const regex4 = /^[a-zA-Z0-9._%+-]+@utsc.utoronto\.ca/;
  const regex5 = /^[a-zA-Z0-9._%+-]+@rotman.utoronto\.ca/;
  const regex6 = /^[a-zA-Z0-9._%+-]+@skalarly\.com/;
  const regex7 = /^[a-zA-Z0-9._%+-]+@outlook\.com/;

  const matches0 = regex0.test(emailChazz);
  const matches1 = regex1.test(emailChazz);
  const matches2 = regex2.test(emailChazz);
  const matches3 = regex3.test(emailChazz);
  const matches4 = regex4.test(emailChazz);
  const matches5 = regex5.test(emailChazz);
  const matches6 = regex6.test(emailChazz);
  const matches7 = regex7.test(emailChazz);

  if (
    (matches0 ||
      matches1 ||
      matches2 ||
      matches3 ||
      matches4 ||
      matches5 ||
      matches6 ||
      matches7) === true
  ) {
    // this.patternCheck = false;
    return null;
  } else {
    // this.patternCheck = true;
    return true;
  }
}
export function noWhiteSpace(
  control: AbstractControl
): ValidationErrors | null {
  if ((control.value as string).indexOf(' ') >= 0) {
    return { noWhiteSpace: true };
  }
  return null;
}
