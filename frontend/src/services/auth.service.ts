import { api } from "@/lib/axios";

type AuthResponse = {
  token?: unknown;
  accessToken?: unknown;
  jwt?: unknown;
  data?: unknown;
  user?: unknown;
};

export type AuthSession = {
  username: string;
  token: string;
};

function extractString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function extractToken(payload: unknown): string | null {
  if (extractString(payload)) {
    return extractString(payload);
  }

  if (payload !== null && typeof payload === "object") {
    const record = payload as AuthResponse;
    const directToken =
      extractString(record.token) ??
      extractString(record.accessToken) ??
      extractString(record.jwt);

    if (directToken) {
      return directToken;
    }

    if ("data" in record) {
      const nestedToken = extractToken(record.data);

      if (nestedToken) {
        return nestedToken;
      }
    }

    if ("user" in record) {
      return extractToken(record.user);
    }
  }

  return null;
}

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/auth/login", { username, password });
    const token = extractToken(response.data);

    if (!token) {
      throw new Error(
        "Login succeeded, but the server did not return a token.",
      );
    }

    return { username, token } satisfies AuthSession;
  },

  register: async (username: string, password: string) => {
    const response = await api.post("/auth/register", { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
