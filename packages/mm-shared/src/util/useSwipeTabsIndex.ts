import { isNumber } from 'util'

const React = require('react')
const { useState } = React

export default function useSwipeTabsIndex() {
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (e: any, value: any) => {
    if (isNumber(e)) {
      setTabIndex(e)
    } else {
      setTabIndex(value)
    }
  }
  return [tabIndex, handleTabChange]
}
