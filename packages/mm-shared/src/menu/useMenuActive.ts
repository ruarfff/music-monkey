import { useState } from 'react'

export default function useMenuActive() {
  const [menuLink, setMenuLink] = useState(undefined)
  const handleMenuOpen = (e: any) => {
    setMenuLink(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuLink(undefined)
  }

  return [menuLink, handleMenuOpen, handleMenuClose]
}
