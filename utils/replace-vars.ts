export const replaceVars = (string: string, vars: Record<string, string>) => {
  for (const prop in vars) {
    if (!string) continue
    string = string.replace(new RegExp('{{' + prop + '}}', 'g'), vars[prop])
  }
  return string
}
