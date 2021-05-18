import LocalStorageCRUDAuth from "./LocalStorageCRUDAuth/LocalStorageCRUDAuth"
import LocalStorageCRUDRoot from "./LocalStorageCRUDRoot/LocalStorageCRUDRoot"
import LocalStorageCRUDSettings from "./LocalStorageCRUDSettings/LocalStorageCRUDSettings"

/**
 * Names to pass as `props.name` to each '*CarouselSlide*' inside '*Carousel*'.
 */
const slideNames = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  SETTINGS: "SETTINGS"
}

// namespace everything related to '*LocalStorageCRUD*'
export default {
  Root: LocalStorageCRUDRoot,
  Auth: LocalStorageCRUDAuth,
  Settings: LocalStorageCRUDSettings,
  slideNames
}
