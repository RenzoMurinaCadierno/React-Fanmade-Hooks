import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { defaultProps, propTypes } from "./MetaTags.utils"

/**
 * Renders a list of meta-tag elements in a DOM node as its children.
 *
 * @param {object} props
 *
 * `tagsArray` (Array): An array of 'meta-tag' objects, each one with keys:
 * * `tag` (string): Tag component name ('meta', 'link', 'title', and such).
 * * `...tagKeyName` (string): Other properties to apply in the HTML tag.
 *
 * ```javascript
 * // Example:
 *   tagsArray = [
 *     { tag: 'title', children: 'Hello world!' },
 *     { tag: 'link', rel: 'icon', href: './assets/icons/icon.ico' },
 *     { tag: 'meta', name: 'description', content: 'Thanks, Alice' },
 * ]
 * ```
 *
 * `mountInHead?` (boolean): True renders the list of tags in "document.head".
 *
 * `portalNode` (function | React.Element | React.ref): The node to render the
 *   'meta-tag' components at.
 *
 * By default, it targets "document.head".
 *
 * This prop can be a:
 * * **React reference** to a virtual DOM node.
 * * **React.Element** targetting a real DOM node (the ones you query
 *     traditionally by "getElementById", "querySelector"), and such.
 * * **function**, only if it returns one of the previous two.
 */
export default function MetaTags({ tagsArray, mountInHead, portalNode }) {
  // we cannot create a portal if DOM is not ready. So, flag it
  const [domReady, setDomReady] = useState(false)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => portalNode && setDomReady(true), [])

  // create the array of React elements for each tag
  const Tags = (
    <>
      {tagsArray?.map(({ tag, ...tagProps }, i) => {
        const Component = tag
        return <Component key={i} {...tagProps} />
      })}
    </>
  )

  if (mountInHead) return createPortal(Tags, document.head)

  if (!portalNode) return Tags

  return (
    domReady &&
    createPortal(Tags, portalNode?.current ?? portalNode ?? document.head)
  )
}

MetaTags.defaultProps = defaultProps
MetaTags.propTypes = propTypes
