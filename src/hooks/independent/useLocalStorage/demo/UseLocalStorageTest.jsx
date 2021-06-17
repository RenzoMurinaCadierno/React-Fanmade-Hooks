import React, { useState } from "react"
import useLocalStorage from "../useLocalStorage"
import { Container, CmpDescription } from "../../../../hub"
import { classes, descItems } from "./UseLocalStorage.utils"

export default function UseLocalStorage() {
  const [val, setVal] = useState(1)
  const [val2, setVal2] = useState([1])

  const ls = useLocalStorage({
    key: "asd",
    // value: { caca: { lele: 123 } },
    // value: null
    value: val,
    // value: val,
    // updateOnValueChange: true
    // updateOnValueChange: [["a", (prev, next, ls) => !prev], "c", "d.e"]
    updateOnValueChange: ["c", ["d.e", (_, newVal) => newVal > 10], "a"]
    // updateOnValueChange: (ls, nextVal) => {
    //   console.log(ls, nextVal)
    //   return null
    // }
    // noConsole: true
    // reRenderOn: ["set", "del"]
  })
  const ls2 = useLocalStorage({
    key: "asd",
    value: val2,
    updateOnValueChange: ["a"]
  })

  // const ls3 = useLocalStorage({
  //   key: "asd",
  //   value: val,
  //   updateOnValueChange: [["d.f", (_, newVal) => newVal < 10]]
  //   // updateOnValueChange: ["a"]
  // })

  let lala = {
    asd: { lala: "pepe" },
    sad: (pr, ls) => {
      console.log(ls)
      return pr ? pr + 100 : 1
    },
    kaka: { n: 1, a: { b: [12] } }
  }
  const log = (res) => console.log(res)

  const get = () => log(ls.get())
  const get2 = (...args) => log(ls.get(...args))

  const del = () => log(ls.del())
  const del2 = (...args) => log(ls.del(...args))

  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription descItems={descItems} classNames={classes.cmpDesc} />
      <section className={classes.cmpTest} aria-label="component testing area">
        <button onClick={() => setVal(val + 1)}>val++</button>
        <button onClick={setVal}>valEvt</button>
        <button onClick={() => setVal2((p) => [...p, ++p[0]])}>val++</button>
        <button onClick={ls.reset}>reset</button>
        <button onClick={() => ls.reset((p) => ({ a: 1, b: { c: [] } }))}>
          reset2
        </button>
        <button
          onClick={(e) =>
            ls.set(
              ["form.data", () => 1],
              // {},
              // "asd",
              { x: { y: 3 } },
              { b: { k: "asd", p: "pepe", j: { t: [123, 456] } } }
              // ["dad", e],
              // ["form.lala", "lol", 123]
            )
          }
        >
          set
        </button>
        <button onClick={() => ls.set(["form.lala", (p) => p + 1])}>
          set2
        </button>
        <button onClick={ls.set}>set3</button>
        <button onClick={() => ls.set(["form.data", { a: 1 }], true)}>
          set4
        </button>
        <button onClick={() => ls.set(["form.data", { a: 2 }])}>set5</button>
        <button onClick={() => ls.set({ a: 2 })}>set6</button>
        <button onClick={() => ls.set(lala, { h: 1 }, { x: { y: 2 } })}>
          set7
        </button>
        <button onClick={(e) => ls.set(["asd", e])}>set8</button>
        <button onClick={() => ls.set((p) => [...p, 1])}>set9</button>
        <button onClick={() => ls.set((p) => [...p, 1], true)}>set10</button>
        <button onClick={get}>get 0</button>
        <button onClick={() => get2("a", null)}>get 1</button>
        <button onClick={(e) => get2("a", "a.b", "a.b.d", "a.b.c", e, "form")}>
          get 2
        </button>
        <button onClick={ls.get}>get 3</button>
        <button onClick={() => get2("a", null, "b", 123)}>get 4</button>
        <button onClick={(e) => get2(["asd"], e)}>get 5</button>
        <button onClick={(e) => del2(e, "form.data.lala")}>del 1</button>
        <button onClick={(e) => del2("b", "b.d", ["a"])}>del 2</button>
        <button onClick={() => del2((ls) => log(ls))}>del 3</button>
        <button onClick={() => del2(["b", (ls) => !!ls?.c], "a")}>del 4</button>
        <button onClick={ls.del}>del 5</button>
        <button onClick={del}>del 6</button>
        <button onClick={(e) => del2(e, "form.data", ["a", (p) => true])}>
          del 7
        </button>
        <button onClick={() => del2(() => true)}>del 8</button>
      </section>
    </Container>
  )
}
