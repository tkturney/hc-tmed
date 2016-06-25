#angular repeat-inside

repeat-inside allows you to repeat the children of an element, using the same loop expressions you'd use in a normal ng-repeat.

To get started, add the `bigblind` module as a dependency to your app.

    myapp = angular.module("myapp", ["bigblind"]);

you can iterate over lists. Imagine for example your scope contains a list called `words` with object elements, each having a `name` and a `description`

```
<dl repeat-inside="word in words">
    <dt>{{word.name}}</dt>
    <dt>{{word.description}}</dt>
</dl>
```

You can also iterate over objects. Let's say your `words` collection  is now an object, with the word names as properties.


```
<dl repeat-inside="(word, definition) in words">
    <dt>{{word}}</dt>
    <dd>{{definition}}</dd>
</dl>
```
