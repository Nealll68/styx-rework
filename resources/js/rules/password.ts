export const passwordRules = [
  (v: string) => !!v || 'Required',
  // (v: string) => (v || '').length >= 8 || 'Minimum 8 characters required',
  // (v: string) => /^(?=.*[a-z])/.test(v) || 'Must contain at least 1 lowercase character',
  // (v: string) => /^(?=.*[A-Z])/.test(v) || 'Must contain at least 1 uppercase character',
  // (v: string) => /^(?=.*[0-9])/.test(v) || 'Must contain at least 1 numeric character',
  // (v: string) => /(?=.*?[#?!@$%^&*-])/.test(v) || 'Must contain at least 1 special character'
]