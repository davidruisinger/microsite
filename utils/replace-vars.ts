export const replaceVars = (
  string: string,
  vars: Record<string, string>,
  wrapVarInSpan = false
) => {
  for (const prop in vars) {
    if (!string) continue
    const replaceVar = wrapVarInSpan ? `<span>${vars[prop]}</span>` : vars[prop]
    string = string.replace(new RegExp('{{' + prop + '}}', 'g'), replaceVar)
  }
  return string
}
