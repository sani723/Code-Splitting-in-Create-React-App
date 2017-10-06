# Code Splitting in React App

Code Splitting is not a necessary step for building React apps. But it can really help in larger React apps.

While working on React app, there are chances for app to grow quite large. A section of the app (or route) might import a large number of components that are not necessary when it first loads. This hurts the initial load time of our app.

Create React App will generate one large .js file while we are building our app. This contains all the JavaScript our app needs. But if a user is simply loading the login page to sign-in, it doesn’t make sense that we load the rest of the app with it.

This isn’t a concern early on when our app is quite small but it becomes an issue down the road. To address this, Create React App has a very simple built-in way to split up our code.

This feature is called Code Splitting.

> To keep the initial JavaScript payload of app down to the minimum, and load the rest of the code on demand.

Create React App allows us to `dynamically import` parts of our app using the import() proposal. You can read more about it here. And they really encourage you to use import() to delay loading the code for non-critical component subtrees until you need to render them.
