
// { key, i in items} -> { key, pos, val }
function loopKeys(expr) {
  var b0 = brackets(0),
    els = expr.trim().slice(b0.length).match(/^\s*(\S+?)\s*(?:,\s*(\S+))?\s+in\s+(.+)$/)
  return els ? { key: els[1], pos: els[2], val: b0 + els[3] } : { val: expr }
}

function mkitem(expr, key, val) {
  var item = {}
  item[expr.key] = key
  if (expr.pos) item[expr.pos] = val
  return item
}

function _each(dom, parent, expr) {
  remAttr(dom, 'each')

  var tagName = getTagName(dom),
      impl = tagImpl[tagName] || { tmpl: dom.outerHTML },
      ref = document.createTextNode(''),
      root = dom.parentNode

  root.insertBefore(ref, dom)

  expr = loopKeys(expr)

  parent.one('premount', function () {

    // remove the template node
    dom.parentNode.removeChild(dom)
    if (root.stub) root = parent.root

  // on every update...
  }).on('update', function () {
    var items = tmpl(expr.val, parent),
        useRoot = SPECIAL_TAGS_REGEX.test(tagName),
        node = ref.nextSibling


    // parent moved
    if (!node) {
      node = document.createTextNode('')
      root.appendChild(node)
    }


    items.forEach(function(item, i) {
      var data = expr.key ? mkitem(expr, item, i) : item

      // already rendered
      if (node._item === item) {
        node._tag.update(data)
        return node = node.nextSibling
      }

      // mount new one
      var itemRoot = useRoot ? root : dom.cloneNode()


      var tag = new Tag(impl, {
        hasImpl: !!tagImpl[tagName],
        root: itemRoot,
        parent: parent,
        isLoop: true,
        item: data

      }, dom.innerHTML)

      tag.mount()

      node ? root.insertBefore(itemRoot, node) : root.appendChild(itemRoot)

      // store state to DOM (not to user data)
      itemRoot._item = item
      itemRoot._tag = tag

    })

    // unmount redundant
    var redundant = []
    while (node) {
      if (node.nodeName.toLowerCase() != tagName) break
      redundant.push(node)
      node = node.nextSibling
    }

    each(redundant, function(node) {
      node._tag.unmount()
    })

  })

}
