import { isNumber } from 'util'

const React = require('react')
const { useState } = React

export default function useSwipeTabsIndex(index: number = 0) {
  const [tabIndex, setTabIndex] = useState(index)
  const handleTabChange = (e: any, value: any) => {
    if (isNumber(e)) {
      setTabIndex(e)
    } else {
      setTabIndex(value)
    }
  }
  return [tabIndex, handleTabChange]
}
