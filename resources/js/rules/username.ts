export const usernameRules = [
  (v: string) => !!v || 'Required',
  (v: string) => (v || '').length <= 30 || 'Maximum 30 characters authorized'
]