// Custom Handlebar Helpers to register

const handlebars=require('handlebars')

// Support simple text formatting based on simplified tags, like [b]
function format(text) { 
    text = handlebars.escapeExpression(text)
    return new handlebars.SafeString(
      text.replace(/\[b\]([^\/]*)\[\/b\]/g, '<b>$1</b>')
          .replace(/\[a\]([^\[]*)\[\/a\]/g, '<a href="$1">$1</a>')
          .replace(/\[upper\]([^\/]*)\[\/upper\]/g, '<small><sup>$1</small>')
          .replace(/\[br\]/g, '<br/>')
    )
  }

  function hash(text) {
    return handlebars.SafeString(text.toString())
  }

  function calculateSimpleHash(text) {
    var hash = 0;
    if (text.length == 0) {
        return hash;
    }
    for (var i = 0; i < text.length; i++) {
        var char = text.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

function ifEquals(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
}

exports.format = format;
exports.hash = hash;
exports.ifEquals = ifEquals;