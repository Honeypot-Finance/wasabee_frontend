import { useEffect, useRef } from "react"

export const useOnce = (callback: Function, dependencies: any []) => {
  const isInit = useRef(false)
  useEffect(() => {
    if (!isInit.current && dependencies.every(Boolean)) {
      isInit.current = true
      callback()
    }
  }, dependencies)
}