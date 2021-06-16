import { getMetaTagsProps } from "utils/utilityFunctions"

export const descItemsObject = {
  title: "useClassNameToggle",
  paragraphs: [
    "Toggles a className on/off given a specified timeout.",
    'Try tapping the heart. A "heart-beating" animation className will be added to it, and removed after 2.5 seconds.'
  ]
}

export const metaTagsProps = getMetaTagsProps({
  title: "RFH " + descItemsObject.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description:
    descItemsObject.title + " hook. " + descItemsObject.paragraphs[0],
  keywords: "class, toggle, classname, classname toggle, useClassNameToggle"
})
