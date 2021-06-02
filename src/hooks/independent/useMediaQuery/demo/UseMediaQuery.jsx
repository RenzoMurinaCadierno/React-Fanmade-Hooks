import useMediaQuery from "../useMediaQuery"
import { Container, CmpDescription, Text, Icon } from "hub"
import {
  classes,
  descItemsObject,
  socialMediaNamesAndJSXs
} from "./UseMediaQuery.utils"

export default function UseMediaQuery() {
  const [mq, queryRules] = useMediaQuery(
    { width1234: "(min-width: 1234px)" }, // example custom query
    true, // combine custom queries with default ones
    100 // delay 100ms before updating state with new queries
  )
  // calculate string once to pass to components below
  const deviceOrientation = mq.pt ? "portrait" : "landscape"

  return (
    <Container
      htmlElem="main"
      // media queries states here will assign classNames depeding on device
      // dimensions and orientation, thus replicating "@media" css rules
      className={classes.container(deviceOrientation)}
    >
      {/* wrapper for example social media icons. Dynamic classNames */}
      <section className={classes.header(deviceOrientation)}>
        {socialMediaNamesAndJSXs.map(([name, imgJSX], i) => (
          <Icon.Expandable
            key={name}
            icon={imgJSX}
            content={name}
            tabIndex={0}
            // type "secondary" on width >1234px, primary on >600px
            type={mq.width1234 ? "secondary" : mq.sm ? "primary" : "primary-1"}
            // disable icon on portrait view
            disabled={mq.pt}
            // translate icons a little for them not to overlay with toggler on
            // smaller devices
            style={{ transform: mq.pt ? "translateY(30%)" : "translateX(40%)" }}
          />
        ))}
      </section>
      <div className={classes.descAndMQs(deviceOrientation)}>
        <CmpDescription
          descItems={descItemsObject}
          classNames={classes.cmpDesc(deviceOrientation)}
        />
        {/* wrapper for rules and "matches"' wrapper. Static className */}
        <section
          className={classes.currentMQs}
          aria-label="active media queries"
        >
          {/* wrapper for rules and "matches". Dynamic classNames */}
          <div className={classes.mqSeparation(deviceOrientation)}>
            {/* media query rules' strings */}
            {Object.entries(queryRules).map(([name, rule], i) => (
              <Text
                key={i}
                italic
                bold={mq[name]} // highlight if "mq" matches
                disabled={!mq[name]} // gray-out if not
                type="primary"
              >
                {rule}
              </Text>
            ))}
            {/* media query "matches" for those rules */}
            {Object.values(mq).map((matches, i) => (
              <Text key={i}>{matches ? "✔️" : "❌"}</Text>
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}
