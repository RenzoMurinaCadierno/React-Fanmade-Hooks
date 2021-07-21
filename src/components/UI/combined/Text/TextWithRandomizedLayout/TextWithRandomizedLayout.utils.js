import { Layout } from "hub"

function getArrayOfValuesFromObject(object) {
  return Object.entries(object).reduce(
    (acc, [key, valueObject]) => ({
      ...acc,
      [key]: Object.values(valueObject)
    }),
    {}
  )
}

function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export class RandomLayoutProps {
  constructor() {
    this.animationPhasesObj = getArrayOfValuesFromObject(
      Layout.Animation.constants.animationNames
    )

    this.orientationEntries = [
      ["top", [[null, "forwards"]]],
      ["bottom", [[null, "forwards"]]],
      ["left", ["backwards", "forwards"]],
      ["right", ["backwards", "forwards"]]
    ]

    console.log(this)
  }

  getOneRandomValueForEachAnimationPhase = () => {
    let animationPhasesProps = {}

    for (const key in this.animationPhasesObj) {
      animationPhasesProps[key] = getRandomValueFromArray(
        this.animationPhasesObj[key]
      )
    }

    return animationPhasesProps
  }

  getOneRandomValueForEachOrientation = () => {
    const [anchor, validRotations] = getRandomValueFromArray(
      this.orientationEntries
    )

    return { anchor, rotation: getRandomValueFromArray(validRotations) }
  }

  getRandomProps = () => ({
    animationProps: this.getOneRandomValueForEachAnimationPhase(),
    orientationProps: this.getOneRandomValueForEachOrientation()
  })
}
logic done, now implement it