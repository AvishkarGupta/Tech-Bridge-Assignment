import { useContext } from "react"
import { useAppContext } from "../store/Store"

export function Home(){
  const data = useAppContext()
  console.log(data)
  return <>
  home
  </>
}
