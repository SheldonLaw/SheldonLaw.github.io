# Logging 

version: v1.0.1

A super lightweight JavaScript lib as a substitute for `console.log()` in error catch.

## Principle
- `if-else` should only use for business logic, not for error catch
- **Throw error message as soon as possible to prevent more serious impact**

## Usage

### without `Logging`
```js
var a = yourFunc();
// we expect 'a' to be a not null variable, so we need to check
if (a != null) {
	// go ahead
	// ...
} else {
	// handle exception
	// ...
}

switch(a) {
	case 1:
		// your logic here
		break;
	default:
		console.log('error happend');
}

var a = 'hello Logging';
var index = a.indexOf('Logging');
if (index != -1) {
	console.log(substr(index, a.length));	// get 'Logging'
}

```

### with `Logging`
```js
var a = yourFunc();
// we expect 'a' to be a not null variable, so we need to check
Logging.check(a);	// more: Logging.check(a, b) can ensure 'a == b'
// go ahead
// ...

switch(a) {
	case 1:
		// your logic here
		break;
	default:
		Logging.unReach();
}

var a = 'hello Logging';
var index = a.indexOf('Logging');
Logging.checkUE(index, -1);
console.log(substr(index, a.length));	// get 'Logging'

```

## More

> The version `1.0.0` is an experiment. I will think twice according to programing experience and go continue.

More features will be add into `Logging.js` if and only if:
- still keep `Logging.js` simple to use.
- still meet our principles.