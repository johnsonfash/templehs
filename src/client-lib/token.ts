import jwtDecode from "jwt-decode";

export const goodToken = (token: string): boolean => {
  try {
    let expired = true;

    if (token) {
      const decoded = jwtDecode<{ exp: number }>(token)
      expired = Date.now() >= (decoded.exp * 1000);
    }
    if (expired) {
      return false
    } else {
      return true;
    }
  } catch (error) {
    return false
  }
}