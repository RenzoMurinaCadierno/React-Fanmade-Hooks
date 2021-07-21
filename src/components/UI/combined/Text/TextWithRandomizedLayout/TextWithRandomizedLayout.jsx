import { useRef, useState } from "react"
import { Text, Layout } from "hub"
import { RandomLayoutProps } from "./TextWithRandomizedLayout.utils"

const texts = ["asd", "lala", "nono", "a a a"]

export default function TextWithRandomizedLayout({ texts, ...otherProps }) {
  const randomizer = useRef(new RandomLayoutProps())
  const [randomProps, setRandomProps] = useState(
    randomizer.current.getRandomProps()
  )

  console.log(randomProps)

  return (
    <Layout>
      <Text {...otherProps}> asd </Text>
    </Layout>
  )
}
