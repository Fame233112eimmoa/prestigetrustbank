export const authCredentials = {
  customerId: "PTB-10248",
  password: "Friendlydiamond2021",
  otp: "142785",
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
