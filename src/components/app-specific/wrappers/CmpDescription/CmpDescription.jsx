import { memo, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { Container, Text } from "hub"
import Icon from "components/UI/composed/Icon/Icon"
import { getHookNameFromPathName } from "utils/utilityFunctions"
import { urls } from "app.configs.json"
import codeSvg from "assets/icons/code.svg"
import { classes } from "./CmpDescription.utils"

/**
 * Renders the hook's name as title and its description as paragraphs, as well
 * as the expandable icon that links to its Github's repository.
 *
 * @param {object} props
 *
 * `descItems` (object): An object with keys:
 * * `title` (string): the hook's name to render as title.
 * * `paragraphs` (Array): array of strings, one for each paragraph to render
 *     as component's description.
 *
 * `iconExpandDirection?` (string): "left" or "right". The direction the
 *   '*ExpandableIconWithToast*' to view hook's code will expand towards.
 *   Defaults to "left".
 *
 * `iconUrl?` (string): base path pointing to the folder that contains all
 *   hooks' files and their examples in Github's repository.
 *   Defaults to the one in *app.configs.json*.
 *
 * `classNames` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
function CmpDescription({
  descItems,
  iconExpandDirection = "left",
  iconUrl = urls.github.hooks,
  classNames = {},
  ...otherProps
}) {
  const location = useLocation()

  // url's base path and hook name should not change unless we mount this
  // component from another hook example. Thus, no need to ever reconstruct
  // this function. Disable warnings
  /* eslint-disable react-hooks/exhaustive-deps */
  const openIconUrlInNewTab = useCallback(() => {
    iconUrl &&
      window.open(
        iconUrl + getHookNameFromPathName(location.pathname),
        "_blank"
      )
  }, [])

  const expandableIconProps = {
    type: "secondary",
    icon: <img src={codeSvg} alt="<>" />,
    content: "Go to code",
    expandDirection: iconExpandDirection,
    classNames: classes.expIcon(classNames?.expIcon)
  }

  const toastProps = {
    timeout: 3000,
    contentProps: { onClick: openIconUrlInNewTab }
  }

  return (
    <>
      {/* '</>' expandable icon to view github repository */}
      <Icon.Expandable.WithToast
        expandableIconProps={expandableIconProps}
        toastProps={toastProps}
      >
        Tap here to view hook's code in a new tab.
      </Icon.Expandable.WithToast>
      {/* container for hook name title and description paragraphs */}
      <Container
        htmlElem="section"
        flexDirection="column"
        className={classes.container(classNames?.container)}
        aria-label="component title and brief description"
        {...otherProps}
      >
        {/* hook name title */}
        <Text htmlElem="h4" italic className={classes.title(classNames?.title)}>
          {descItems.title}
        </Text>
        {/* hook description paragraphs */}
        {descItems.paragraphs.map((paragraph, i) => (
          <Text
            key={i}
            htmlElem="h6"
            type="secondary"
            italic
            className={classes.description(classNames?.description)}
          >
            {paragraph}
          </Text>
        ))}
      </Container>
    </>
  )
}

export default memo(CmpDescription)
