
<plan>
  <p>Plan: { name }</p>
  this.name = opts.name
</plan>

<plans>
  <h2>Inner</h2>
  <plan each={ name in names } name={ name }/>
  this.names = ['plan1', 'plan2']
</plans>

<isloop-test>
  <h2>Outmost</h2>
  <plans/>
</isloop-test>
