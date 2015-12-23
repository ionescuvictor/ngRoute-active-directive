```javascript
var myApp = angular.module('myApp', ['ng-route-active']);
```
A directive similar functionality to ui-active from ui-router, but implemented for ngroute.

Note: the a tag must have a href attribute.

example:

```html
<a route-active="active" href="/#/Test"></a>
```

this will place the 'active' class to the a tag, like so.

```html
<a route-active="active" class="active" href="/#/Test"></a>
```

you can also

```html
<button route-active="activeBtnClass">

<a href="/#/Test" >Test</a>

</button>

```

The directive will find the first a tag in the current element.Then attach the class to the button.

so we get

```html
<button class="activeBtnClass">

<a href="/#/Test" >Test</a>

</button>

```
