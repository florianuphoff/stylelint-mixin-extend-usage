const stylelint = require("stylelint");
const ruleName = "plugin/mixin-extend-usage"
const messages =  stylelint.utils.ruleMessages(ruleName, {
  usage: type => `Found usage of ${type}`
})

module.exports = stylelint.createPlugin(
  ruleName, 
  (excludeNonPlaceholder, secondaryOption) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      {
        actual: excludeNonPlaceholder,
        possible: (val) => {
          return typeof val === "boolean"
        }
      }
    )

    if (!validOptions) return;

    // walk trough rules to get all placeholder
    postcssRoot.walkRules(/^%.*/, (rule) => {
      /*
        type:               placeholder
        rule.selector:      Selector name
        rule.source.file:   Path to file
      */
      stylelint.utils.report({
        ruleName: ruleName,
        result: postcssResult,
        message: messages.usage('placeholder'),
        node: rule,
        word: rule.selector,
        line: rule.source.start.line
      })
    })

    // walk trough rules to get all mixins    
    postcssRoot.walkAtRules("mixin", (rule) => {
      /*
        rule.name:          type
        rule.params:        Mixin name
        rule.source.file:   Path to file
        rule.source.start:  Starting at line
      */
      stylelint.utils.report({
        ruleName: ruleName,
        result: postcssResult,
        message: messages.usage(rule.name),
        node: rule,
        word: rule.params,
        line: rule.source.start.line
      })
    })
  
    // walk trough rules to get includes
    postcssRoot.walkAtRules("include", (rule) => {
      /*
        rule.name:              type      
        rule.params:            Mixin name with variables
        rule.parent.selector:   Selector name
        rule.source.file:       Path to file
        rule.source.start:      Starting at line
      */
      stylelint.utils.report({
        ruleName: ruleName,
        result: postcssResult,
        message: messages.usage(rule.name),
        node: rule,
        word: rule.params,
        line: rule.source.start.line
      })
    })

    // walk trough rules to get @extend
    postcssRoot.walkAtRules("extend", (rule) => {
      /*
        rule.name:              type      
        rule.params:            Extend name
        rule.parent.selector:   Selector name
        rule.source.file:       Path to file
        rule.source.start:      Starting at line
      */
      stylelint.utils.report({
        ruleName: ruleName,
        result: postcssResult,
        message: messages.usage(rule.name),
        node: rule,
        word: rule.params,
        line: rule.source.start.line
      })
    })
  }
)

module.exports.ruleName = ruleName
module.exports.messages = messages