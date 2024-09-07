export const validatePassword = (p: string) => {
  let counter = 0;
  let validationRegex = [
    { regex: /.{10,}/ }, // min 10 letters,
    { regex: /[0-9]/ }, // numbers from 0 - 9
    { regex: /[a-z]/ }, // letters from a - z (lowercase)
    { regex: /[A-Z]/ }, // letters from A-Z (uppercase),
    { regex: /[^A-Za-z0-9]/ }, // special characters
  ];

  validationRegex.forEach((item, i) => {
    let isValid = item.regex.test(p);
    if (isValid) {
      counter++;
    }
  });
  return counter;
};

export const rgx_insecure = /[$\(\)<>"'#%{}~!"^|]/;
 export const rgx_date = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
//export const rgx_date = /^\d{۴}\-(۰[۱-۹]|۱[۰۱۲])\-(۰[۱-۹]|[۱۲][۰-۹]|۳[۰۱])$/;
export const rgx_frNo =  /^[۰-۹]+$/;