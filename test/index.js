const testRule = require("stylelint-test-rule-tape");
const plugin = require("..");

testRule(plugin.rule, {
  ruleName: plugin.ruleName,
  config: [true],
  accept: [
    {
      code: ".a{display: inherit;}",
      description: "No usage found",
    }
  ],
  reject: [
    {
      code: ".a{@include hello;}",
      description: "Found usage of @include",
      message: plugin.messages.usage('include'),
      line: 1,
    },{
      code: "@mixin hello {margin:0}",
      description: "Found usage of @mixin",
      message: plugin.messages.usage('mixin'),
      line: 1,
    },{
      code: ".a{@extend %placeholder;}",
      description: "Found usage of @extend",
      message: plugin.messages.usage('extend'),
      line: 1,
    },{
      code: ".a{@extend placeholder;}",
      description: "Found usage of @extend without %",
      message: plugin.messages.usage('extend'),
      line: 1,
    },{
      code: "%placeholder {color: #F00}",
      description: "Found usage of @extend without %",
      message: plugin.messages.usage('placeholder'),
      line: 1,
    }
 ]
});