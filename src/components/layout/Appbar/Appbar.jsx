import { createContext } from "react"
import AppbarRoot from "./AppbarRoot/AppbarRoot"
import AppbarToggler from "./AppbarToggler/AppbarToggler"
import AppbarSearchbar from "./AppbarSearchbar/AppbarSearchbar"
import AppbarSection from "./AppbarSection/AppbarSection"
import AppbarLink from "./AppbarLink/AppbarLink"
import AppbarHomeIcon from "./AppbarHomeIcon/AppbarHomeIcon"

// When an appbar link is clicked, we need to close the appbar modal.
// The function to toggle the modal on/off resides in '*AppbarRoot*' and due
// to how it is constructed, we cannot pass the toggler as a prop to children.
// Thus, we create a context here, which will store the toggler as `value` in
// its "Provider". Chidren can then make use of it by consuming this context.
const appbarContext = createContext(() => {})

function ComposedAppbar(props) {
  return <AppbarRoot {...props} />
}

ComposedAppbar.Toggler = AppbarToggler
ComposedAppbar.Searchbar = AppbarSearchbar
ComposedAppbar.Section = AppbarSection
ComposedAppbar.Link = AppbarLink
ComposedAppbar.HomeIcon = AppbarHomeIcon
ComposedAppbar.context = appbarContext

export default ComposedAppbar
