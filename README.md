# Code Splitting in Create React App

Code Splitting is not a necessary step for building React apps. But it can really help in larger React apps.

While working on React app, there are chances for app to grow quite large. A section of the app (or route) might import a large number of components that are not necessary when it first loads. This hurts the initial load time of our app.

Create React App will generate one large .js file while we are building our app. This contains all the JavaScript our app needs. But if a user is simply loading the login page to sign-in, it doesn’t make sense that we load the rest of the app with it.

This isn’t a concern early on when our app is quite small but it becomes an issue down the road. To address this, Create React App has a very simple built-in way to split up our code.

This feature is called Code Splitting.

> To keep the initial JavaScript payload of app down to the minimum, and load the rest of the code on demand.

Create React App allows us to `dynamically import` parts of our app using the import() proposal. You can read more about it here. And they really encourage you to use import() to delay loading the code for non-critical component subtrees until you need to render them.

![alt Splitting Code](https://user-images.githubusercontent.com/6458802/31270576-f1e63c9e-aa95-11e7-93d3-688aad593e8d.gif)

While, `the dynamic import()` can be used for any component in our React app, it works really well with React Router. Since, React Router is figuring out which component to load based on the path. It would make sense that we dynamically import those components only when we navigate to them.

The usual structure used by React Router to set up routing for app looks something like this.

```js
import Home from "./components/containers/Home";
import Posts from "./components/containers/Posts";
import NotFound from "./components/containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/posts/:id" exact component={Posts} />
    <Route component={NotFound} />
  </Switch>;
```

However, here we are importing all of the components in the route statically at the top. This means, that all these components are loaded regardless of which route is matched.

To implement Code Splitting here we are going to use an excellent higher order component that does a lot of this well, it’s called [`react-loadable`](https://github.com/thejameskyle/react-loadable).

## Installation

```js
yarn add react-loadable

or

$ npm install --save react-loadable
```
Then use it

```js
import Loadable from 'react-loadable';
import Home from "./components/containers/Home";
import Loading from './components/ui/Loading';

const AsyncHome = Loadable({
  loader: () => import('./components/container/Home'),
  loading: Loading
});

export default () =>
  <Switch>
    <Route path="/" exact component={AsyncHome} />
  </Switch>;
```

And `Loading` will look like this.

```js
import React from 'react';

const Loading = ({isLoading, error}) => {
  if(isLoading) {
    return <div>Loading...</div>;
  } else if(error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export default Loading;
```

If you want to load multiple resources, you can use Loadable.Map and pass an object as a loader and specify a render method that stitches them together.

```js
Loadable.Map({
  loader: {
    Component: () => import('./components/container/Home'),
    data: () => fetch('./data.json').then(res => res.json()),
  },
  render(loaded, props) {
    let Component = loaded.Component.default;
    let translations = loaded.translations;
    return <Component {...props} data={data}/>;
  }
});
```

## Avoid Repetition

Specifying the same loading component or delay every time you use Loadable() gets repetitive fast. Instead you can wrap Loadable with your own Higher-Order Component (HOC) to set default options.

```js
import Loadable from 'react-loadable';
import Loading from './Loading';

const AsyncLoader = opts => {
  return Loadable(Object.assign({
    loading: Loading
  }, opts));
};

export default AsyncLoader;
```

Then you can just specify a loader when you go to use it.

```js
import React, { Component } from 'react';
import AsyncLoader from './components/ui/AsyncLoader';

const AsyncTimer = AsyncLoader({
  loader: () => import('./components/container/Timer'),
});

class App extends React.Component {
  render() {
    return <AsyncTimer />;
  }
}

export default App;
```

Make sure to check out the other options and features that `react-loadable` has.
