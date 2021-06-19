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

function ComposedLocalStorageCRUD(props) {
  return <LocalStorageCRUDRoot {...props} />
}

ComposedLocalStorageCRUD.Auth = LocalStorageCRUDAuth
ComposedLocalStorageCRUD.Settings = LocalStorageCRUDSettings
ComposedLocalStorageCRUD.slideNames = slideNames

export default ComposedLocalStorageCRUD
