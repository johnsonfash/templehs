export const objectToURL = (object: any): string => {
  let url = ''
  for (const key in object) {
    url += `${key}=${object[key]}&`
  }
  return url.substring(0, url.length - 1)
}