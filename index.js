const stylelint = require("stylelint");
const ruleName = "plugin/mixin-extend-usage"
const messages =  stylelint.utils.ruleMessages(ruleName, {
  usage: (selector, type) => {
    `Usage of ${type} in ${selector}`
  },
})

module.exports = stylelint.createPlugin(
  ruleName, 
  (excludeNonPlaceholder, secondaryOption) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      {
        actuel: excludeNonPlaceholder,
        possible: (val) => {
          return typeof variable === "boolean"
        }
      }
    )

    if (!validOptions) return;

    postcssRoot.walkDecls((decl) => {
      console.log(decl.value)
    })

  }
)

module.exports.ruleName = ruleName
module.exports.messages = messages