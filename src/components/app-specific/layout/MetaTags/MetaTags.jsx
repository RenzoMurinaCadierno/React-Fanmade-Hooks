import { WarpPortal } from "hub"
import { defaultProps, propTypes } from "./MetaTags.utils"

/**
 * Renders a '*title*' (optional), '*author*', '*description*' and '*keywords*'
 * meta-tags at `document.head`.
 *
 * @param {object} props
 *
 * `title?` (string): '*title*' `children`.
 *
 * `author` (string): '*meta*' "author" `content`.
 *
 * `description` (string): '*meta*' "description" `content`.
 *
 * `keywords` (string): '*meta*' "keywords" `content`.
 */
export default function MetaTags({ title, author, description, keywords }) {
  return (
    <WarpPortal portalNode={document.head}>
      {title && <title>{title}</title>}
      <meta name="author" content={author} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </WarpPortal>
  )
}

MetaTags.defaultProps = defaultProps
MetaTags.propTypes = propTypes
