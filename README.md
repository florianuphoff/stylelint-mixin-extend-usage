# Purpose
[![NPM version](https://img.shields.io/npm/v/stylelint-mixin-extend-usage.svg)](https://www.npmjs.com/package/stylelint-mixin-extend-usage)
[![Downloads per month](https://img.shields.io/npm/dm/stylelint-mixin-extend-usage.svg)](http://npmcharts.com/compare/stylelint-mixin-extend-usage)

This stylelint plugin is part of a (s)css analysis. It's used by the plugin [stylelint-code-quality-config](https://www.npmjs.com/package/stylelint-code-quality-config).
Of course you can use it for your stylelint config, too. See instructions below.

## Usage

```bash
npm install stylelint-mixin-extend-usage  --save-dev
```

After that add this plugin to your stylelint plugins and include the rule:

```javascript
"plugins": [
  "stylelint-mixin-extend-usage"
],
"rules": {
  "plugin/mixin-extend-usage": false
}
```

## Results

This plugin reports the following findings:

* Usage of extends with placeholder
```scss
.example {
  @extend %placeholder;
}
```

* Usage of extends with no placeholder
```scss
.example {
  @extend placeholder2;
}
```
* Declaration of a mixin
```scss
@mixin simple($w: 1px) {
  width: $w;
}
```
* Usage of mixin
```scss
.example {
  @include simple($w: 5rem);
}
```
