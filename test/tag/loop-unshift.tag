
<unshift-item>
  <p name="para">{ opts.index }. { opts.item.name }</p>

</unshift-item>


<loop-unshift>

  <unshift-item each={ item, i in items } item={ item } index={ i } />


  <button onclick={ alter }>Alter</button>

  var self = this

  self.items = [{ name: 'first' }, { name: 'second' }]

  this.alter = function() {
    self.items.unshift({ name: 'kamazon one' })
    self.items.unshift({ name: 'second one' })

    // self.items = [{ name: 'dorg' }, { name: 'morb' }]

    self.items.splice(1, 1)
    self.update()
  }

</loop-unshift>
