export const AUTH_SESSION_VERSION = 1;

const AUTH_STORAGE_KEY_SUFFIX = "v2";

export const authSessionKeys = {
  otpReady: `prestige-trust-auth-otp-ready-${AUTH_STORAGE_KEY_SUFFIX}`,
  signedIn: `prestige-trust-auth-signed-in-${AUTH_STORAGE_KEY_SUFFIX}`,
  sessionVersion: `prestige-trust-auth-session-version-${AUTH_STORAGE_KEY_SUFFIX}`,
} as const;

export const authCookieNames = {
  sessionVersion: `prestige-trust-auth-session-version-${AUTH_STORAGE_KEY_SUFFIX}`,
} as const;

export const legacyAuthCookieNames = [
  "prestige-trust-auth-session-version",
  "prestige-trust-session-version",
  "user",
  "auth",
  "session",
] as const;

const AUTH_STORAGE_PREFIX = "prestige-trust-auth-";
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const LEGACY_LOCAL_STORAGE_KEYS = [
  "user",
  "auth",
  "session",
  "prestige-trust-signed-in",
  "prestige-trust-session-version",
  "prestige-trust-auth-signed-in",
  "prestige-trust-auth-session-version",
];
const LEGACY_SESSION_STORAGE_KEYS = [
  "user",
  "auth",
  "session",
  "prestige-trust-otp-ready",
  "prestige-trust-auth-otp-ready",
];

let hasClearedLegacyAuthStorage = false;

function isBrowser() {
  return typeof window !== "undefined";
}

function getCurrentSessionVersionValue() {
  return String(AUTH_SESSION_VERSION);
}

function buildCookieAttributes(maxAge: number) {
  const attributes = [
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
  ];

  if (isBrowser() && window.location.protocol === "https:") {
    attributes.push("Secure");
  }

  return attributes.join("; ");
}

function setCookie(name: string, value: string, maxAge: number) {
  if (!isBrowser()) {
    return;
  }

  window.document.cookie = `${name}=${value}; ${buildCookieAttributes(maxAge)}`;
}

function clearPrefixedStorage(storage: Storage) {
  const keysToRemove: string[] = [];

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);

    if (key?.startsWith(AUTH_STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => {
    storage.removeItem(key);
  });
}

function removeStorageKeys(storage: Storage, keys: readonly string[]) {
  keys.forEach((key) => {
    storage.removeItem(key);
  });
}

export function initializeAuthSessionStorage() {
  if (!isBrowser() || hasClearedLegacyAuthStorage) {
    return;
  }

  removeStorageKeys(window.localStorage, LEGACY_LOCAL_STORAGE_KEYS);
  removeStorageKeys(window.sessionStorage, LEGACY_SESSION_STORAGE_KEYS);
  window.sessionStorage.clear();

  legacyAuthCookieNames.forEach((cookieName) => {
    setCookie(cookieName, "", 0);
  });

  hasClearedLegacyAuthStorage = true;
}

export function beginOtpChallenge() {
  if (!isBrowser()) {
    return;
  }

  initializeAuthSessionStorage();
  window.sessionStorage.setItem(authSessionKeys.otpReady, "true");
}

export function isOtpChallengeReady() {
  if (!isBrowser()) {
    return false;
  }

  initializeAuthSessionStorage();
  return window.sessionStorage.getItem(authSessionKeys.otpReady) === "true";
}

export function getStoredSessionVersion() {
  if (!isBrowser()) {
    return null;
  }

  initializeAuthSessionStorage();
  return window.localStorage.getItem(authSessionKeys.sessionVersion);
}

export function getCookieSessionVersion() {
  if (!isBrowser()) {
    return null;
  }

  initializeAuthSessionStorage();
  const cookieName = `${authCookieNames.sessionVersion}=`;
  const cookie = window.document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(cookieName));

  return cookie ? cookie.slice(cookieName.length) : null;
}

export function hasValidAuthSession(expectedVersion = getCurrentSessionVersionValue()) {
  if (!isBrowser()) {
    return false;
  }

  initializeAuthSessionStorage();
  const signedIn = window.localStorage.getItem(authSessionKeys.signedIn) === "true";
  const storedVersion = getStoredSessionVersion();
  const cookieVersion = getCookieSessionVersion();

  return (
    signedIn &&
    storedVersion === expectedVersion &&
    cookieVersion === expectedVersion
  );
}

export function completeOtpSignIn() {
  if (!isBrowser()) {
    return;
  }

  initializeAuthSessionStorage();
  const sessionVersion = getCurrentSessionVersionValue();

  window.localStorage.setItem(authSessionKeys.signedIn, "true");
  window.localStorage.setItem(authSessionKeys.sessionVersion, sessionVersion);
  window.sessionStorage.removeItem(authSessionKeys.otpReady);
  setCookie(
    authCookieNames.sessionVersion,
    sessionVersion,
    AUTH_COOKIE_MAX_AGE_SECONDS
  );
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  initializeAuthSessionStorage();
  clearPrefixedStorage(window.localStorage);
  clearPrefixedStorage(window.sessionStorage);
  setCookie(authCookieNames.sessionVersion, "", 0);
}

export async function fetchCurrentSessionVersion(signal?: AbortSignal) {
  const response = await fetch("/api/auth/session-version", {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error("Unable to verify the active session version.");
  }

  const payload = (await response.json()) as {
    sessionVersion: number | string;
  };

  return String(payload.sessionVersion);
}
