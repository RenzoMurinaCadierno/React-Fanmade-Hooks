import CodeMenu from "../../combined/CodeMenu/CodeMenu"
import CodeMenuWithMediaQuery from "../../combined/CodeMenu/CodeMenuWithMediaQuery/CodeMenuWithMediaQuery"

function ComposedCodeMenu(props) {
  return <CodeMenu {...props} />
}

ComposedCodeMenu.WithMediaQuery = CodeMenuWithMediaQuery

export default ComposedCodeMenu
