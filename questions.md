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
3. You can pass using props direct or parent
```tsx
function Parent() {
    const [stateStr, setStateStr] = useState("Hello Deel")
    // ...
   return <Child title={stateStr} />
}

function Child(props) {
    const { title } = props
    return <h1>{title}</h1>
}
```
You can using global state manager.
```tsx
function Parent() {
    const dispatch = useDispatch()
    useState(() => {
       dispatch(setStateStr("Hello Deel"))
    }, [])
    // ...
   return <Child title={stateStr} />
}

function Child(props) {
    const stateStr = useSelector((state: string) => state)
    return <h1>{stateStr}</h1>
}
```
You can using HOC pattern
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