// Custom Handlebar Helpers to register

const handlebars=require('handlebars')

// Support simple text formatting based on simplified tags, like [b]
function format(text) { 
    text = handlebars.escapeExpression(text)
    return new handlebars.SafeString(
      text.replace(/\[b\](.*)\[\/b\]/g, '<b>$1</b>')
          .replace(/\[upper\](.*)\[\/upper\]/g, '<small><sup>$1</small>')
          .replace(/\[br\]/g, '<br/>')
     )
  }

exports.format = format;