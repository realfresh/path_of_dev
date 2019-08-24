---
path: "/blog/four-ways-to-initialize-react-state"
date: "2019-08-13"
title: "Four ways to initialize a React component's state"
description: "See the different ways to initializing a React component's state and the differences between them"
image: "/images/technologies/react.png"
---

In React, `state` is a special property of a components class. Whenever the `state` is modified, the component re-renders.

There are 4 different way's to initialize a React component's state. They fundamentally all achieve the same thing but have differences between them.

## Initialize state in the constructor

```jsx
import React from "react"

class MyComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "hello"
    };
  }

  updateText = (e) => this.setState({ text: e.target.value })

  render() {
      return (
        <input
          value={this.state.text} 
          onChange={this.updateText}
        />
      )
  }

}
```

This is probably the most popular way to initialize a component's state. However, it's not always the best as it does require the most code to achieve. You should only use this method if you need to perform other initialization steps in the constructor.

## Initialize state as a class property

```jsx
import React from "react"

class MyComponent extends React.Component {

  state = { 
    text: "hello"
  }

  updateText = (e) => this.setState({ text: e.target.value })

  render() {
      return (
        <input
          value={this.state.text} 
          onChange={this.updateText}
        />
      )
  }

}
```

This method is slowly gaining popularity due to it being easier to write. Also, not needing to define a constructor means no forgetting to call `super(props)`. Keep in mind, you can still access `this.props.` when defining state this way.

## Using React hooks

```jsx
import React from "react"

function MyComponent() {

  const [text, setText] = React.useState("hello")

  return (
    <input 
      value={text} 
      onChange={(e) => setText(e.target.value)}
    />
  )

}
```

While this is not state in the traditional sense, React hooks is slowly becoming a great replacement for how we would usually work with component state. It requires significantly less boilerplate code and is much easier to reason with.

## Initializing state with React.createClass

```js
import React from "react"

const MyComponent = React.createClass({

  getInitialState: () => {
    return { text: "hello" }
  },

  updateText: (e) => this.setState({ text: e.target.value }),

  render: () => {
    return (
      <input
        value={this.state.text} 
        onChange={this.updateText}
      />
    )
  }

});
```

If you are unable to use the JSX syntax for writing React components, you will need to declare state using the `getInitialState` property with `React.createClass`;

## The correct way to use state

State is important but it's also easy to misuse. When building React applications, it's best to separate the business logic from the UI. 

We want our UI components to be "dumb". Meaning they take a certain input and produce a certain output. They shouldn't do anything fancy internally that we might lose track of.

For example, let's say you are building a simple application which allows a user to type their name into an input field. You might think it's best to write it like this.

```jsx
import React from "react"
import ReactDOM from "react-dom"

function MyApp() {

  const [name, setName] = React.useState("Your name")

  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)}
    />
  )

}

const root = document.getElementById("root")
ReactDOM.render(<MyApp/>, root)
```

This is all fine and dandy to start with. However, once you start expanding on it, say you now need 2 more input fields, everything will start to get messy.

```jsx
import React from "react"
import ReactDOM from "react-dom"

function MyApp() {

  const [name, setName] = React.useState("Your name")
  const [age, setAge] = React.useState("Your age")
  const [country, setCountry] = React.useState("Your country")

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        value={age} 
        onChange={(e) => setAge(e.target.value)}
      />
      <input 
        value={country} 
        onChange={(e) => setCountry(e.target.value)}
      />
    </div>
  )

}

const root = document.getElementById("root")
ReactDOM.render(<MyApp/>, root)
```

In this instance, we can clean up this code significantly by separating the input fields into their own component.

```jsx
import React from "react"
import ReactDOM from "react-dom"

function Input(props) {
  return (
    <input 
      value={props.value} 
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}

function MyApp() {

  const [name, setName] = React.useState("Your name")
  const [age, setAge] = React.useState("Your age")
  const [country, setCountry] = React.useState("Your country")

  return (
    <div>
      <Input value={name} onChange={setName}/>
      <Input value={age} onChange={setAge}/>
      <Input value={country} onChange={setCountry}/>
    </div>
  )

}

const root = document.getElementById("root")
ReactDOM.render(<MyApp/>, root)
```

This is far easier to maintain and reason with as we have split the component managing the state from the UI components which just render the props they are given.