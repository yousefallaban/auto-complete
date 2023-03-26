**1. What is the difference between Component and PureComponent? give an
example where it might break my app.**
- The main difference between them is in how they handle updates.    Component does not have any built-in optimization for updates, so    whenever it receives new props or state, it will re-render and update  its child components regardless of whether the new values are the    same as the previous ones. PureComponent, on the other hand, performs  a shallow comparison of the new and old props and state before    deciding whether to update itself and its children. If the new values  are the same as the previous ones, it will not re-render.

- **Example:**

  > Suppose we have a component that displays a list of items retrieved
  > from an API. The component receives the list of items as a prop, which
  > is an array of objects containing an id and a name property. If you
  > use PureComponent for this component and update the prop to have a new
  > item with the same id and name as an existing item, it will not
  > trigger a re-render of the component. This is because the shallow
  > comparison only checks for differences in the array reference, not the
  > individual objects within the array. As a result, the new item may not
  > be displayed in the list. In this case, we would need to use Component
  > instead or modify the prop in a way that triggers a deep comparison.

**2. Context + ShouldComponentUpdate might be dangerous. Can think of why
is what?**

- Using Context along with shouldComponentUpdate can be dangerous
  because it can lead to unexpected behavior and difficult-to-debug
  issues.



- Context updates can be unpredictable: When the context value changes,
  all the components that consume that context will re-render,      
  regardless of whether their props have changed. This can cause
  unexpected re-renders of components that should not have updated.

**3. Describe 3 ways to pass information from a component to its PARENT.**

- props, callbacks, and context.

**4. Give 2 ways to prevent components from re-rendering.**

- Use the useCallback hook: The useCallback hook is used to memoize a
  function, meaning that it will only be re-created when its
  dependencies change.

- Use React.memo with functional component.

**5. What is a fragment and why do we need it? Give an example where it
might break my app.**

- It's essentially a lightweight wrapper that allows you to group
  elements together without adding any additional markup.   We need
  fragments for a few reasons:   Grouping elements, Performance and
  Clean code.



*Here's an example where using a fragment might break an app:*

      function MyComponent() {
        return (
            <>
                <h1>My Component</h1>
                <p>This is a paragraph.</p>
            </>
        );
    }

> In this example, we're using a fragment to group a h1 and p element
> together. However, if we're using an older version of React that
> doesn't support fragments (before version 16), this code would cause
> an error, as fragments were not yet introduced in React. In this case,
> we would need to wrap our elements in a parent element, like a div, to
> group them together.

**6. Give 3 examples of the HOC pattern.**
- Style HOC: This HOC is used to add styles to a component. It takes in a component and some additional props, and returns a new component with the appropriate styles applied.
- Data fetching HOC: This HOC is used to fetch data from an API and pass it down to a component as props.
- Loader HOC:  add a loading spinner to a component while data is being fetched asynchronously.

**7. what's the difference in handling exceptions in promises, callbacks
and async...await.**

- **Promises**:
  With Promises, we can use the .catch() method to handle exceptions. If an error occurs within a Promise, it will be caught by the nearest .catch() method in the Promise chain.

- **Callbacks:**  
  With Callbacks, errors are usually passed as the first argument in the callback function. we can check for an error in the callback function and handle it accordingly.

- **Async/Await:**  
  With Async/Await, we can use a try/catch block to handle exceptions

**8. How many arguments does setState take and why is it async.**

- The setState method in React takes two arguments: an object
  representing the new state to be set and an optional callback
  function to be called after the state has been updated.

- The reason why setState is asynchronous in React is to improve
  performance. When a component's state changes, React will not
  immediately update the DOM with the new state values. Instead, it
  will batch multiple state updates together and update the DOM all at
  once. This approach is called "batching" and is done to avoid
  unnecessary re-renders and improve performance.


**9. List the steps needed to migrate a Class to Function Component.**
- Rewrite the component as a function that returns JSX.
- Remove the constructor and move any initialization code to the function body.
- Replace this.props with props and this.state with useState hooks.
- Replace any lifecycle methods with equivalent hooks.
- Remove the render() method and place the returned JSX directly in the function body.

**10- List a few ways styles can be used with components.**
- Inline styles.
- CSS Modules.
- CSS-in-JS libraries: e.g styled-components.
- Global styles: Global styles can be used to apply styles to the entire application, rather -than just to a particular component. This can be done using traditional CSS files or CSS-in-JS libraries that provide global styles functionality.


**11- How to render an HTML string coming from the server.**
By using the dangerouslySetInnerHTML attribute, or by using a library like react-html-parser or html-react-parser.
