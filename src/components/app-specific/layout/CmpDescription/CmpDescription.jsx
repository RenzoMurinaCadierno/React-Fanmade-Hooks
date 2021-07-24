import { memo } from "react"
import { useLocation } from "react-router-dom"
import { CodeMenu, Container, MetaTags, Text } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  defaultMenuIconProps,
  getHookNameFromPathName
} from "./CmpDescription.utils"

/**
 * Renders the hook's name as title and its description as paragraphs, as well
 * as the expandable menu that links to its Github's repository and offers
 * 'copy code' functionality (to paste hook's code in a file and use it).
 *
 * @param {object} props
 *
 * `descItems` (object): An object with keys:
 * * `title` (string): the hook's name to render as title.
 * * `paragraphs` (Array): array of strings, one for each paragraph to render
 *     as component's description.
 *
 * `iconUrl?` (string): Base path pointing to the folder that contains all
 *   hooks' files and their examples in Github's repository.
 *   Defaults to the one in *app.configs.json*.
 *
 * `isCodeMenuAnchorHandledByMediaQuery` (bool): Falsey renders '*CodeMenu*' as
 *   the code icon component, where truthy displays '*CodeMenu.WithMediaQuery*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `metaTagsProps?` (object): Props to spread in '*MetaTags*'.
 *
 * `codeMenuProps?` (object): Props to spread in '*CodeMenu*'.
 *
 * `containerProps?` (object): Props to spread in '*Container*'.
 *
 * `titleProps?` (object): Props to spread in 'title' '*Text*'.
 *
 * `paragraphProps?` (object): Props to spread in each 'paragraph' '*Text*'.
 */
function CmpDescription({
  descItems,
  plainCode,
  iconUrl,
  isCodeMenuAnchorHandledByMediaQuery,
  classNames,
  metaTagsProps,
  codeMenuProps,
  containerProps,
  titleProps,
  paragraphProps
}) {
  const location = useLocation()

  const CodeMenuComponent = isCodeMenuAnchorHandledByMediaQuery
    ? CodeMenu.WithMediaQuery
    : CodeMenu

  return (
    <>
      <MetaTags {...metaTagsProps} />
      {/* '</>' expandable menu to copy code and to view it in github */}
      <CodeMenuComponent
        url={iconUrl + getHookNameFromPathName(location.pathname)}
        classNames={classes.codeIcon(classNames?.codeIcon)}
        {...{ plainCode, ...defaultMenuIconProps, ...codeMenuProps }}
      />
      {/* container for hook name title and description paragraphs */}
      <Container
        htmlElem="section"
        flexDirection="column"
        className={classes.container(classNames?.container)}
        aria-label="component title and brief description"
        {...containerProps}
      >
        {/* hook name title */}
        <Text
          htmlElem="h4"
          italic
          className={classes.title(classNames?.title)}
          {...titleProps}
        >
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
            {...paragraphProps}
          >
            {paragraph}
          </Text>
        ))}
      </Container>
    </>
  )
}

CmpDescription.defaultProps = defaultProps
CmpDescription.propTypes = propTypes

export default memo(CmpDescription)
