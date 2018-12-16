export const SIDEBAR_OPENED = 'SIDEBAR_OPENED'
export const SIDEBAR_CLOSED = 'SIDEBAR_CLOSED'
export const AVATAR_MENU_OPENED = 'AVATAR_MENU_OPENED'
export const AVATAR_MENU_CLOSED = 'AVATAR_MENU_CLOSED'

export const openSidebar = () => ({
  type: SIDEBAR_OPENED
})

export const closeSidebar = () => ({
  type: SIDEBAR_CLOSED
})

export const openAvatarMenu = () => ({
  type: AVATAR_MENU_OPENED
})

export const closeAvatarMenu = () => ({
  type: AVATAR_MENU_CLOSED
})
