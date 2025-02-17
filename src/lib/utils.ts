export function extractFirstAndLastName(fullname: string | undefined) {
  if (!fullname) return ''

  const names = fullname.trim().split(' ')
  const hasLastName = names.length > 1

  return hasLastName ? `${names[0]} ${names.at(-1)}` : fullname
}
