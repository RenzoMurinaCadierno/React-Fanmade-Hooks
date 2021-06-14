const plainCode = `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

import { useCallback, useState } from "react"

/**
 * Takes a callback and returns a handler that will invoke it, but that handler
 * will stop working after it triggers. It deactivates on further invocations.
 *
 * @param {function} callback The function to be triggered by the invoker.
 *
 * @returns {Array} An array with:
 *
 * \`elem 0\` (function): The invoker which will trigger \`callback\`.
 *
 * \`elem 1\` (boolean): True means the invoker was not deactivated (\`callback\`
 *   can be invoked by it).
 *
 * \`elem 2\` (function): Resets the invoker, allowing it to trigger \`callback\`
 *   again.
 * 
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useCallbackOnce(callback) {
  const [isCallbackUsed, setIsCallbackUsed] = useState(false)

  const trigger = useCallback(
    (...args) => {
      if (!isCallbackUsed) {
        setIsCallbackUsed(true)
        return callback(...args)
      }
    },
    [isCallbackUsed, setIsCallbackUsed, callback]
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  const reset = useCallback(() => setIsCallbackUsed(false), [])

  return [trigger, isCallbackUsed, reset]
}`

export default plainCode
