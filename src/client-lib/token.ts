import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie'
import { CONST } from "./constants";

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

export const setToken = (token: string) => {
  Cookies.set(CONST.COOKIE, token)
}

export const getToken = () => {
  return Cookies.get(CONST.COOKIE) ?? ''
}