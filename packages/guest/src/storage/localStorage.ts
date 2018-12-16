export default {
  clear: () => localStorage.clear(),
  get: (key: string, defaultValue?: any): any =>
    localStorage[key] || defaultValue,
  getObject: (key: string) => JSON.parse(localStorage[key] || '{}'),
  set: (key: string, value: any) => {
    localStorage[key] = value
    return localStorage[key]
  },
  setObject: (key: string, value: any) => {
    localStorage[key] = JSON.stringify(value)
    return localStorage[key]
  }
}
