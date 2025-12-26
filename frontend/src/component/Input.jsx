export function Input({value}){
  // console.log(type, name, readOnly, required, autoComplete, placeholder, autoFocus)
  // console.log(value)
  return <>
  <input 
    type={value.type}
    name={value.name}
    readOnly={value.readOnly} 
    required={value.required}
    autoComplete={value.autoComplete}
    placeholder={value.placeholder}
    autoFocus={value.autoFocus}
  />
  </>
}