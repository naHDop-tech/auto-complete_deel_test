# Questions
1. What is the difference between Component and PureComponent? give an
   example where it might break my app.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?
3. Describe 3 ways to pass information from a component to its PARENT.
4. Give 2 ways to prevent components from re-rendering.
5. What is a fragment and why do we need it? Give an example where it might
   break my app.
6. Give 3 examples of the HOC pattern.
7. what's the difference in handling exceptions in promises, callbacks and
   async...await.
8. How many arguments does setState take and why is it async.
9. List the steps needed to migrate a Class to Function Component.
10. List a few ways styles can be used with components.
11. How to render an HTML string coming from the server.

# Answers

1. Pure components is like pure function from functional programming.
This component always should return exac same with same props (params).
Also this component should not be making side effect. The most simple example bellow
```tsx
interface MyPureComponentProps {
    title: string
}
function MyPureComponent(props: MyPureComponentProps): JSX.Element {
    const { title } = props
    return (
        <h1>{title}</h1>
    )
}
```
2. When context changed `shouldComponentUpdate` catch this every time
so it might be broke application if you put some change context logic inside `shouldComponentUpdate`
function and it cant make the infinity re-renders.
```tsx
interface MyComponentProps {
    count: number
    changeHandler: (number: string) => void
}
interface MyComponentState {
    counter: null
}
class Counter1 extends Component<MyComponentProps, MyComponentState> {
   state = { counter: 0 }

   add = () => {
      this.setState((state) => {
         counter: state + 1
      })
   }

   shouldComponentUpdate(nextProps) {
      // Rendering the component only if 
      // passed props value is changed

      if (nextProps.counter !== this.props.count) {
          this.props.changeHandler(nextProps.counter)
         return true;
      } else {
         return false;
      }
   }

   render() {
      return <button onClick={this.add}>Add</button>
   }
}
```
3. You can pass it with props direct or parent
```tsx
// Direct
function Parent() {
    const [stateStr, setStateStr] = useState("Hello Deel")
    // ...
   return <Child title={stateStr} />
}
function Child(props) {
    const { title } = props
    return <h1>{title}</h1>
}

// with Parent
function Parent() {
   const [stateStr, setStateStr] = useState("Hello Deel")
   // ...
   return <Child>{stateStr}</Child>
}
function Child(props) {
   const { children } = props
   return <h1>{children}</h1>
}
```
You can use global state manager like the `redux` for example.
```tsx
function Parent() {
    const dispatch = useDispatch()
    useState(() => {
       dispatch(setStateStr("Hello Deel"))
    }, [])
    // ...
   return <Child />
}

function Child(props) {
    const stateStr = useSelector((state: string) => state)
    return <h1>{stateStr}</h1>
}
```
You can use HOC pattern with local or global state
```tsx
export const withStateStr = (Component: (props: { title: string }) => JSX.Element) => () => {
   const stateStr = useSelector((state: string) => state)

   return <Component title={props} />
};

const ChildWithState = withStateStr(Child)
function App() {
   return <ChildWithState />
}

function Child(props) {
   const { title } = props
   return <h1>{title}</h1>
}
```
4. More common way to wrap component with `memo` (memoized)
```tsx
//before
function Parent() {
   const [stateStr, setStateStr] = useState("Hello Deel")
   // ...
   return (
       <div onScroll={(e) => setStateStr(e.target.value)}>
        {/*  re render each scroll*/}
        <Child />
       </div>
   )
}
function Child() {
   return <h1>Hello</h1>
}

//after
const MemoizChild = memo(Child)
function Parent() {
   const [stateStr, setStateStr] = useState("Hello Deel")
   // ...
   return (
       <div onScroll={(e) => setStateStr(e.target.value)}>
          <MemoizChild />
       </div>
   )
}

function Child() {
   return <h1>Hello</h1>
}
```
you can use closure (HOK or just using extra layer (component))
```tsx
//after
function Parent({ children }) {
   const [stateStr, setStateStr] = useState("Hello Deel")
   // ...
   return (
       <div onScroll={(e) => setStateStr(e.target.value)}>
          {children}
       </div>
   )
}

function Child() {
   return <h1>Hello</h1>
}

function ExtraComponent() {
   return (
       <Parent>
          <Child />
       </Parent>
   )
}
```
5. fragment is special component in react.
It using if you don't need wrapped some component to html tag
you can use it with `import { Fragment } from 'react'` or just empty tags `<></>`
```tsx
function Component(props) {
    const { list } = props
   
   return (
       <>
          {list.map((el, idx) => {
             return (
                 <div key={idx}>{el.title}</div>
             )
          })}
       </>
   )
}
```
It can broke application (not at all :) if you using it with map because you should pass `key` props to root element
```tsx
function Component(props) {
    const { list } = props

   return bar.map((el) => {
      return (
          // here should be an html element with key prop: <div key={idx}>
          // also key prop should be uniq!
          <>
             <p>{el.title}</p>
             <p>{el.name}</p>
          </>
      )
   })
}
```
6. ------------- :c ---------------
7. In callback it's going to callback hell
```js
firstAsync((data, error) => {
    if (!error) {
        secontAsync((data, error) => {
            // ...
        })
    }
})
```
in chain operators you can have several cases and you probably want to know which case had failed
```js
someAsyncCall()
    .then((data) => {
        if (typeof data.json === 'function') {
            return data.json()
        }
    })
    .then((parsedData) => {
        console.log(parsedData.title)
    })
    .catch((err) => {
        // only one catch in this chain
        connsole.error(err.message)
    })
```
in async await you can take all under control but it might be extra code in react component
because you can always call it inside async function mark
```tsx
function Component() {
    const [todo, setTodo] = useState({})
    const [serverErrror, setServerError] = useState('')
   
   useEffect(() => {
       // extra lambda function
      (async() => {
          try {
             const data = await callApi('/todo')
             setTodo(data)
          } catch (err) {
             setServerError(err.message)
          }
      })()
   }, [])
   
   if (serverErrror.length) {
      return <h1>{serverErrror}</h1>
   }
   
   return (
       <>
          <p>{todo.title}</p>
          <p>{todo.dueDate}</p>
          <p>{todo.isDone}</p>
       </>
   )
}
```
8. `setState` takes 1 param but it can be or NEW state value or callback fn.
```tsx
// new state
function Component() {
    const [title, setTitle] = useState('')
    
   const changeHandler = (e) => {
      setTitle(e.target.value)
   }
   return <input onChange={changeHandler}/>
}
// callback
function Component() {
   const [isChosen, setIsChosen] = useState(false)

   const clickHandler = () => {
      setIsChosen((prev) => !prev)
   }
   return <button onClick={clickHandler}>Change it</button>
}
```
this is async operation because React should rebuild virtual DOM and make re-render component - it  takes some time
9. List to migrate Class -> function
- create fn component
- replace local/global state/types to fn component
- replace main logic to fn component
- replace render logic to fn component bt use `useEffect`/`useCallback`/`useMemo` hooks
- or split it to several fn components
10. styles using
- Using classic way pure css from file
- using preprocessors `Saas/Less`
- using post processors libs like `Tailwind`
- using css in js like styled-component
- also you can use direct styles (not recomended)
11. by using JS
```js
document.write('<html><body><h2>HTML</h2></body></html>');
```