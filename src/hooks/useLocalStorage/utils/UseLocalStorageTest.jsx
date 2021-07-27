// import React, { useState } from "react"
// import useLocalStorage from "../useLocalStorage"
// import { Container, CmpDescription } from "hub"
// import { classes, descItems } from "../demo/UseLocalStorage.utils"

// export default function UseLocalStorage() {
//   const [val, setVal] = useState(1)
//   const [val2, setVal2] = useState([1])

//   const ls = useLocalStorage({
//     key: "asd",
//     // value: { caca: { lele: 123 } },
//     // value: null
//     value: val,
//     // updateOnValueChange: true
//     // vv these values are updated when `val` changes
//     // updateOnValueChange: [["a", (prev, next, ls) => ls.c <= 3], "c", "d.e"]
//     updateOnValueChange: ["c", ["d.e", (_, newVal) => newVal > 3], "a"]
//     // updateOnValueChange: (ls, nextVal) => {
//     //   console.log(ls, nextVal)
//     //   return null
//     // }
//     // noConsole: true
//     // reRenderOn: ["set", "del"]
//   })

//   // const ls = useLocalStorage({
//   //   key: "asd",
//   //   value: val2,
//   //   updateOnValueChange: ["a"]
//   // })

//   // const ls = useLocalStorage({
//   //   key: "asd",
//   //   value: val,
//   //   // updateOnValueChange: [["d.f", (_, newVal) => newVal < 10]]
//   //   updateOnValueChange: ["a"]
//   // })

//   let lala = {
//     asd: { lala: "pepe" },
//     sad: (pr, ls) => {
//       console.log(ls)
//       return pr ? pr + 100 : 1
//     },
//     kaka: { n: 1, a: { b: [12] } }
//   }
//   const log = (res) => console.log(res)

//   const get = () => log(ls.get())
//   const get2 = (...args) => log(ls.get(...args))

//   const del = () => log(ls.del())
//   const del2 = (...args) => log(ls.del(...args))

//   return (
//     <Container htmlElem="main" className={classes.container}>
//       <CmpDescription descItems={descItems} classNames={classes.cmpDesc} />
//       <section className={classes.cmpTest} aria-label="component testing area">
//         <button onClick={() => setVal(val + 1)}>val++</button>
//         <button onClick={setVal}>valEvt</button>
//         {/* should update only array local storage values */}
//         <button onClick={() => setVal2((p) => [...p, ++p[0]])}>val++</button>
//         {/* should reset all times */}
//         <button onClick={ls.reset}>reset</button>
//         {/* should reset and default value to object */}
//         <button onClick={() => ls.reset((p) => ({ a: 1, b: { c: [] } }))}>
//           reset2
//         </button>
//         <button
//           onClick={(e) =>
//             ls.set(
//               ["form.data", () => ({ lala: 123 })],
//               {}, // should fail
//               "asd", // should fail
//               { x: { y: 3 } },
//               ["a", (prev) => !console.log(prev)], // true
//               { b: { k: "asd", p: "pepe", j: { t: [123, 456] } } },
//               [("dad", e)], // should fail silently
//               ["form.lala", "lol", 123] // should fail
//             )
//           }
//         >
//           set
//         </button>
//         {/* updates form.lala with its value + 1 */}
//         <button onClick={() => ls.set(["form.lala", (p) => p + 1])}>
//           set2
//         </button>
//         <button onClick={ls.set}>set3</button>
//         {/* true overwrites */}
//         <button onClick={() => ls.set(["form.data", { a: 1 }], true)}>
//           set4
//         </button>
//         {/* no overwrite */}
//         <button onClick={() => ls.set(["form.data", { a: 2 }])}>set5</button>
//         {/* object mode */}
//         <button onClick={() => ls.set({ a: 2 })}>set6</button>
//         {/* object mode, multiple args */}
//         <button onClick={() => ls.set(lala, { h: 1 }, { x: { y: 2 } })}>
//           set7
//         </button>
//         <button onClick={(e) => ls.set(["asd", e])}>set8</button>
//         {/* array */}
//         <button onClick={() => ls.set((p) => [...p, 1])}>set9</button>
//         <button onClick={() => ls.set((p) => [...p, 1], true)}>set10</button>
//         {/* getter with log */}
//         <button onClick={get}>get 0</button>
//         {/* should get "a" and undefined */}
//         <button onClick={() => get2("a", null)}>get 1</button>
//         {/* should get all values on set key and undefined on e */}
//         <button onClick={(e) => get2("a", "a.b", "a.b.d", "a.b.c", e, "form")}>
//           get 2
//         </button>
//         {/* universal getter */}
//         <button onClick={ls.get}>get 3</button>
//         {/* should get a and b, null and 123 are not valid keys (strings) */}
//         <button onClick={() => get2("a", null, "b", 123)}>get 4</button>
//         {/* should get 2 undefined. [] and e are not valid keys for get */}
//         <button onClick={(e) => get2(["asd"], e)}>get 5</button>
//         <button onClick={(e) => del2(e, "form.data.lala")}>del 1</button>
//         {/* should del all, arrays are accepted*/}
//         <button onClick={(e) => del2("b", "b.d", ["a"])}>del 2</button>
//         {/* should not del on log(ls), and should del on !log(ls) */}
//         <button onClick={() => del2((ls) => !log(ls))}>del 3</button>
//         {/* should always del a, and b only if c is truthy */}
//         <button onClick={() => del2(["b", (ls) => !!ls?.c], "a")}>del 4</button>
//         {/* universal del */}
//         <button onClick={ls.del}>del 5</button>
//         {/* del with log */}
//         <button onClick={del}>del 6</button>
//         {/* should console error on e, delete form.data, and a if true */}
//         <button onClick={(e) => del2(e, "form.data", ["a", (p) => true])}>
//           del 7
//         </button>
//         {/* should delete all on true, abort on false */}
//         <button onClick={() => del2(() => true)}>del 8</button>
//       </section>
//     </Container>
//   )
// }
