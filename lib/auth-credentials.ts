export const authCredentials = {
  customerId: "PTB-10248",
  password: "Walkercheung2026",
  otp: "731904",
} as const;

export function isValidLoginCredentials(customerId: string, password: string) {
  return (
    customerId.trim() === authCredentials.customerId &&
    password === authCredentials.password
  );
}

export function isValidOtpCode(code: string) {
  return code.trim() === authCredentials.otp;
}
