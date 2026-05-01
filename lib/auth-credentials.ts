export const authCredentials = {
  customerId: "PTB-10248",
  password: "Maria@2026",
  otp: "932891",
} as const;

export const authSessionKeys = {
  otpReady: "prestige-trust-otp-ready",
  signedIn: "prestige-trust-signed-in",
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
