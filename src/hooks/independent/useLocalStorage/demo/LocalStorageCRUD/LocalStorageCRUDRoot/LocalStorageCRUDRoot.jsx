import { Carousel, LocalStorageCRUD } from "hub"
import { classes, propTypes } from "./LocalStorageCRUDRoot.utils"

export default function LocalStorageCRUDRoot({
  userSt,
  setUserSt,
  onSignUp,
  onSignIn,
  onSignOut,
  onDeleteUser
}) {
  return (
    // Carousel's wrapper component
    <Carousel
      autoScrollInterval={4000}
      resumeAutoScrollTimeout={2500}
      classNames={classes.carousel}
    >
      {/* Carousel's slide for user signin */}
      <Carousel.Slide name={LocalStorageCRUD.slideNames.SIGN_IN}>
        <LocalStorageCRUD.Auth isSignIn userSt={userSt} onAuth={onSignIn} />
      </Carousel.Slide>
      {/* Carousel's slide for user creation */}
      <Carousel.Slide name={LocalStorageCRUD.slideNames.SIGN_UP}>
        <LocalStorageCRUD.Auth userSt={userSt} onAuth={onSignUp} />
      </Carousel.Slide>
      {/* Carousel's slide for user settings */}
      <Carousel.Slide name={LocalStorageCRUD.slideNames.SETTINGS}>
        <LocalStorageCRUD.Settings
          userSt={userSt}
          setUserSt={setUserSt}
          onDeleteUser={onDeleteUser}
          onSignout={onSignOut}
        />
      </Carousel.Slide>
    </Carousel>
  )
}

LocalStorageCRUDRoot.propTypes = propTypes
