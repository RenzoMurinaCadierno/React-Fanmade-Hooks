import { memo, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { CodeMenu, Container, Text } from "hub"
import Icon from "components/UI/composed/Icon/Icon"
import { getHookNameFromPathName } from "utils/utilityFunctions"
import codeSvg from "assets/icons/code.svg"
import { classes, defaultProps, propTypes } from "./CmpDescription.utils"

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
 * `iconUrl?` (string): base path pointing to the folder that contains all
 *   hooks' files and their examples in Github's repository.
 *   Defaults to the one in *app.configs.json*.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
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
  classNames,
  codeMenuProps,
  containerProps,
  titleProps,
  paragraphProps
}) {
  const location = useLocation()

  return (
    <>
      {/* '</>' expandable menu to copy code and view it in github */}
      <CodeMenu
        url={iconUrl + getHookNameFromPathName(location.pathname)}
        plainCode={plainCode}
        {...codeMenuProps}
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

// import { memo, useCallback } from "react"
// import { useLocation } from "react-router-dom"
// import { Container, Text } from "hub"
// import Icon from "components/UI/composed/Icon/Icon"
// import { getHookNameFromPathName } from "utils/utilityFunctions"
// import codeSvg from "assets/icons/code.svg"
// import { classes, defaultProps, propTypes } from "./CmpDescription.utils"

// /**
//  * Renders the hook's name as title and its description as paragraphs, as well
//  * as the expandable icon that links to its Github's repository.
//  *
//  * @param {object} props
//  *
//  * `descItems` (object): An object with keys:
//  * * `title` (string): the hook's name to render as title.
//  * * `paragraphs` (Array): array of strings, one for each paragraph to render
//  *     as component's description.
//  *
//  * `iconUrl?` (string): base path pointing to the folder that contains all
//  *   hooks' files and their examples in Github's repository.
//  *   Defaults to the one in *app.configs.json*.
//  *
//  * `classNames?` (object): className strings for each JSX rendered here.
//  *   Check *utils.js* for its constitution.
//  *
//  * `expandableIconProps?` (object): Props to spread in '*ExpandableIcon*',
//  *   inside '*Icon.Expandable.WithToast*'.
//  *
//  * `toastProps?` (object): Props to spread in '*Toast*' inside
//  *   '*Icon.Expandable.WithToast*'.
//  *
//  * `containerProps?` (object): Props to spread in '*Container*'.
//  *
//  * `titleProps?` (object): Props to spread in 'title' '*Text*'.
//  *
//  * `paragraphProps?` (object): Props to spread in each 'paragraph' '*Text*'.
//  */
// function CmpDescription({
//   descItems,
//   iconUrl,
//   classNames,
//   expandableIconProps,
//   toastProps,
//   containerProps,
//   titleProps,
//   paragraphProps
// }) {
//   const location = useLocation()

//   // url's base path and hook name should not change unless we mount this
//   // component from another hook example. Thus, no need to ever reconstruct
//   // this function. Disable warnings
//   /* eslint-disable react-hooks/exhaustive-deps */
//   const openIconUrlInNewTab = useCallback(() => {
//     iconUrl &&
//       window.open(
//         iconUrl + getHookNameFromPathName(location.pathname),
//         "_blank"
//       )
//   }, [])

//   const _expandableIconProps = {
//     type: "secondary",
//     icon: <img src={codeSvg} alt="<>" />,
//     content: "Go to code",
//     ...expandableIconProps
//   }

//   const _toastProps = {
//     timeout: 3000,
//     contentProps: { onClick: openIconUrlInNewTab },
//     ...toastProps
//   }

//   return (
//     <>
//       {/* '</>' expandable icon to view github repository */}
//       <Icon.Expandable.WithToast
//         expandableIconProps={_expandableIconProps}
//         toastProps={_toastProps}
//         classNames={classes.codeIcon(classNames?.codeIcon)}
//       >
//         Tap here to view hook's code in a new tab.
//       </Icon.Expandable.WithToast>
//       {/* container for hook name title and description paragraphs */}
//       <Container
//         htmlElem="section"
//         flexDirection="column"
//         className={classes.container(classNames?.container)}
//         aria-label="component title and brief description"
//         {...containerProps}
//       >
//         {/* hook name title */}
//         <Text
//           htmlElem="h4"
//           italic
//           className={classes.title(classNames?.title)}
//           {...titleProps}
//         >
//           {descItems.title}
//         </Text>
//         {/* hook description paragraphs */}
//         {descItems.paragraphs.map((paragraph, i) => (
//           <Text
//             key={i}
//             htmlElem="h6"
//             type="secondary"
//             italic
//             className={classes.description(classNames?.description)}
//             {...paragraphProps}
//           >
//             {paragraph}
//           </Text>
//         ))}
//       </Container>
//     </>
//   )
// }

// CmpDescription.defaultProps = defaultProps
// CmpDescription.propTypes = propTypes

// export default memo(CmpDescription)
