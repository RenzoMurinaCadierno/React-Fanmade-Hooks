import { useCallback, useState } from "react"
import { Container, CmpDescription, LocalStorageCRUD, Toast } from "hub"
import useLocalStorage from "../useLocalStorage"
import { classes, descItemsObject, intl, hash } from "./UseLocalStorage.utils"

const hashEx = hash.get(5) // load a hash to create the default user

export default function UseLocalStorage() {
  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription
        descItems={descItemsObject}
        classNames={classes.cmpDesc}
      />
      <CmpTest />
    </Container>
  )
}

function CmpTest() {
  /*****************************************************************************
   *     USAGE EXAMPLE (part 1) - Open local storage tab to track changes!
   * ***************************************************************************
   * This component demonstrates the imperative way the hook offers us to work
   * with local storage, with its set, del, get and reset functionalities.
   *
   * Part 2 showcases the reactive way. Find it in '*LocalStorageCRUDSettings*'.
   *
   * In this component and at mount, the hook creates a local storage with key
   * "rfh:users-db" if it does not already exist. It also loads a default user
   * object inside "db" key of local storage item, if either that key or local
   * storage item are empty.
   *
   * The default user object in hook's `configs.value` is formatted exactly how
   * it will be stringified and saved to local storage.
   *
   * Mind the other keys besides "db". Read their strings.
   */
  const ls = useLocalStorage({
    key: "rfh:users-db",
    value: {
      db: {
        [hashEx]: {
          id: hashEx,
          user: "admin",
          pass: "pass1234",
          configs: { lang: "en", color: "primary" }
        }
      },
      info: [
        'This key serves as example to show how useLocalStorage hook leaves it untouched. It will only affect "db" key when adding/deleting users and changing their settings.',
        "Console might warn you of sensible data being compromised, and/or a password field being used outside a <form />. Ignore both. This is just a front-end example that neither saves anything outside local storage nor submits forms."
      ],
      important:
        "Do NEVER EVER save sensible data in local storage as we do here. This is just an example of the hook's functionality."
    },
    // if a value is attempted to be set on a non-existant local storage
    // item (if it was deleted), reconstruct it with { db: {} } as its
    // initial value before setting the item
    selfRebuildValue: { db: {} }
  })

  // state for '*Toast*'. We will summon one to notify user state changes
  const [toastSt, setToastSt] = useState({ show: false, msg: "" })

  // user's UI state. Will be imperatively synced to local storage changes
  const [userSt, setUserSt] = useState({
    id: "", // current user's hash
    user: "", // current user's name
    configs: {}, // current user's "lang" and "color"
    isAuth: false // "isAuth" === true means the user is currently logged in
  })

  /**
   * Sets '*Toast*'s `show` to false, triggering its unmount state.
   */
  const handleCloseToast = useCallback(
    () => setToastSt((prevSt) => ({ ...prevSt, show: false })),
    [setToastSt]
  )

  /**
   * Returns "db" object in local storage "rfh:users-db" item. If either key or
   * item are not found, it re-recreates local storage and returns the newly
   * created "db" object.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const getDbKeyInLocalStorageItem = useCallback(() => {
    const db = ls.get("db")
    return db ?? ls.reset().db
  }, [])

  /**
   * Checks if the typed username matches the name of one of all user objects in
   * "db" key of local storage item. Upon finding one, it checks the typed
   * password versus the one in that user object.
   *
   * If both match, it sets user state to what's retrieved from that item in
   * local storage, effectively logging the user in.
   *
   * If at least one validation instance fails, it notifies the user and does
   * not modify state, thus aborting logging process.
   *
   * @param credentials An object with shape:
   * * `user` (string): "username" input's value.
   * * `pass` (string): "password" input's value.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleSignIn = useCallback((credentials) => {
    // grab "db" key inside local storage "rfh:users-db" item
    const db = getDbKeyInLocalStorageItem()
    // find a user object there whose name and pass match "credentials"
    const userSnapshot = Object.values(db).find(
      (userObj) =>
        userObj.user === credentials.user && userObj.pass === credentials.pass
    )
    // if it exists, set state with that user object in local storage.
    // isAuth === true flags a successful login
    if (userSnapshot) {
      const { id, user, configs } = userSnapshot
      setUserSt(() => ({ id, user, configs, isAuth: true }))
    }
    // on either a successful or failed login, notify the user with a '*Toast*'
    setToastSt(() => ({
      show: true,
      msg: userSnapshot
        ? intl[userSt.configs.lang ?? "en"].toast.loginSuccess(credentials.user)
        : "Invalid user/password"
    }))
  }, [])

  /**
   * Given the typed name in "username" and "password" inputs, it creates a
   * valid user object, stores it in local storage "rfh-users-db" item, inside
   * its "db" key, and triggers "handleSignIn", which sets user state with that
   * user object.
   *
   * However, if a user object in "db" has the same name as the one typed in
   * "username" input, it aborts the user creation process and notifies it with \
   * a '*Toast*'.
   *
   * @param credentials An object with shape:
   * * `user` (string): "username" input's value.
   * * `pass` (string): "password" input's value.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleSignUp = useCallback((credentials) => {
    const { user, pass } = credentials
    // grab "db" key inside local storage "rfh:users-db" item
    const db = getDbKeyInLocalStorageItem()
    // is there a user object whose name equals the one in "username" input?
    const isUserInDb = Object.values(db).some((dbObj) => dbObj.user === user)
    // if so, abort signup process and notify with a '*Toast*'
    if (isUserInDb) {
      return setToastSt(() => ({ show: true, msg: "Username already exists" }))
    }
    // "username" is unique. Create a hash for its id and add it to "db" key
    // inside local storage
    const id = hash.get(5)
    ls.set({
      db: (userObjects) => ({
        ...userObjects,
        [id]: { id, user, pass, configs: { lang: "en", color: "primary" } }
      })
    })
    // trigger handleSignIn(), which sets user state with credentials
    handleSignIn(credentials)
  }, [])

  /**
   * If a user is loaded in state (meaning it is signed in), it deletes its
   * respective user object from local storage, removes the hash key from the
   * global array of hashes, and clears user state (signs out from UI).
   */
  const handleDeleteUser = useCallback(() => {
    if (userSt.id) {
      ls.del(`db.${userSt.id}`)
      hash.remove(userSt.id)
      handleSignOut()
    }
  }, [userSt.id])

  /**
   * Clears user state (thus, logging out from UI), and notifies it with
   * a '*Toast*'.
   */
  const handleSignOut = useCallback(() => {
    setUserSt(() => ({ id: "", user: "", configs: {}, isAuth: false }))
    setToastSt(() => ({ show: true, msg: "Signed out" }))
  }, [])

  return (
    <>
      <Toast.WithPortal
        show={toastSt.show}
        timeout={3000}
        onClose={handleCloseToast}
      >
        {toastSt.msg}
      </Toast.WithPortal>
      <section className={classes.cmpTest}>
        {/* CRUD example tree. UI, Auth and Settings are handled here */}
        <LocalStorageCRUD.Root
          userSt={userSt}
          setUserSt={setUserSt}
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onDeleteUser={handleDeleteUser}
        />
      </section>
    </>
  )
}
