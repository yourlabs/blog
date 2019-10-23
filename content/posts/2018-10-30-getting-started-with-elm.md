+++
date = "2018-10-30T16:47:14+00:00"
draft = false
tags = ["elm"]
title = "Getting started with Elm"
+++
This article was created by [Thomas Binetruy](https://yourlabs.io/oss/unsupported/elm500/blob/master/notes.md) as he's into R&D around Elm for YourLabs but maybe it will help you too !

## Introduction

In this short tutorial, we create a basic counter application that changes the title color based on the counter value. We first define our state model, its transitions, and finally our view - function of our current application state.

## Setup code

Here are the necessary imports:

```elm
import Browser
import Html exposing (Html, button, div, text, h1)
import Html.Events exposing (onClick)
import Html.Attributes exposing (alt, class, classList, href, src, title, style)

main =
  Browser.sandbox { init = init, update = update, view = view }
```

## The model

In elm, the idea is that your view is a function of some data. This data is defined in the model, that's its purpose! Let's see how we can define our model

```elm
type alias Model =
    { title : String
    , color1 : String
    , color2 : String
    , count : Int
    }

init : Model
init = Model "Error 500" "red" "green" 0
```

Here, we are create a **type alias**, which is very similar to a C `struct`. That is it allows us to define custom types.

In the above code, we create a constant (there are no mutable variables in Elm, so I'm calling them constants) called `init` of type `Model`. See how we define our constant ? It look quite similar to instantiating an object in OOP. After this code, `init.title` equals "Error 500", `init.color1` is "red", "green" is assigned to `init.color2`. Finally, `init.count` is 0. The value for `init` defines our *application state*.

## State transitions

Because in Elm our page is a function of our model, whenever we want to cause a change in our view, we shall mutate our model with *transition functions* which will the re-render our view based on the new values of our model: our new *application state*.

```elm
type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      Model model.title model.color1 model.color1 (model.count + 1)

    Decrement ->
      Model model.title model.color1 model.color2 (model.count - 1)
```

In the above code, we define 2 state transitions, one for incrementing `init.count` and one for decrementing it. But really, if there isn't a state transition for each of our state variables, then it means that we could remove them from our model. In this example, it makes no sense to have `title`, `color1`, and `color2` in our model since we don't define transitions for them.

So in the above code, we define a type alias `Msg` which here is a [Union type](https://guide.elm-lang.org/types/custom_types.html) of `Increment` and `Decrement` which means that a constant of type `Msg` can be **one of** `Increment` or `Decrement`. And whenever we will add a state transition to our application, we need to make sure to update our `Msg` type.

After our `Msg` type definition, we define our state transitions with function called `update`. This function takes two arguments and returns a new state:

1.  `msg` of type `Msg`, the *message* our app is emitting requesting a state transition. In our case, it's either `Increment` or `Decrement`,
2.  `model` of type `Model`, our current application state.

So our state transitions are function of the state!

In the implementation of our `update` function, we test the value of the sent message. If it's `Increment` we return a new model different from our previous model only with the fact that the `count` value is incremented by one. Similarly, we our message is `Decrement`, we return a new state wil the `count` decremented by 1.

## Rendering

Finally, we define our *view*. Remember that our view is a function of our current state! Mutating this state via messages will re-render our view.

Bellow is a code where we define our `view` component that uses a `title` component.

```elm
type alias TitleProps =
    { title : String
    , color: String
    }

title : TitleProps -> Html Msg
title t =
    h1 [  style "color" t.color, class "my-super-title" ]
      [ text t.title ]

view : Model -> Html Msg
view model =
  div []
    [ title (TitleProps model.title (if model.count > 5 then model.color1 else model.color2))
    , button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model.count) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

Notice that our `view` function takes a `model` argument of type `Model` and returns an `Html Msg`. This is different from our `title` function which take a `TitleProps` as an input and return an `Html Msg`.

In `view`, we return an html structure. Each element is defined as follows: `elementType properties children` where `properties` and `children` are arrays of properties and children respectively.

Our `button` elements have `onClick` properties that call our `Decrement` and `Increment` messages and have a single `text` child each.

We can also define a `title` component that takes a title and a color as arguments and return an `h1` with a few properties and a textual value. Then we can just call this `title` component from our `view` function.

## Building

If you put your source files in `src/` and called your Elm file `Main.elm`, then you can compile your application with the following command:

```sh
elm make src/Main.elm
```

Which will produce a self contained `index.html` with inlined javascript.

## Conclusion

I hope that you found this introductory tutorial useful. We saw how to define an application state, state transitions, and how to compose our view function. With these few tools, one can already start building complex dynamic applications. The next steps are to look into *asynchronous* elm.
