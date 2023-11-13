const selectOptions = [
  {
    label: 'Vue',
    value: 1
  },
  {
    label: 'React',
    value: 2
  },
  {
    label: 'Angular',
    value: 3
  },
]
const formConfigF = (l = 120, s = 'default', lp = 'right') => {
  return {
    labelWidth: l,
    size: s,
    labelPosition: lp
  }
}
export {
  selectOptions,formConfigF
}
