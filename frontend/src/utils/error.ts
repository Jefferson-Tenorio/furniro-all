export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const axiosError = error as Record<string, unknown>;
    if (axiosError.response && typeof axiosError.response === "object") {
      const response = axiosError.response as Record<string, unknown>;
      if (response.data && typeof response.data === "object") {
        const data = response.data as Record<string, unknown>;
        if (typeof data.message === "string") {
          return data.message;
        }
      }
    }
    return error.message;
  }
  return "An unexpected error occurred";
}