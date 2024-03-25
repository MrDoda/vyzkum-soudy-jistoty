const Selection = () => (<section className='section'>
  <div className='container'>
    <div className='columns is-vcentered'>

      <!-- Test for Individuals -->
      <div className='column has-text-centered has-border'>
        <h2 className='title'>Test pro jednotlivce</h2>
        <p className='subtitle'>Subtitle explaining the individual test</p>
        <a className='button is-primary' href='/individual-test'>Přejít</a>
      </div>

      <!-- Test for Couples -->
      <div className='column has-text-centered'>
        <h2 className='title'>Test pro dvojice</h2>
        <p className='subtitle'>Subtitle explaining the couples test</p>
        <input className='input is-medium' type='text' placeholder='Váš unikátní kód' />
        <a className='button is-primary' href='/couples-test'>Vytvořit</a>
      </div>

    </div>
  </div>
</section>)

module.exports = Selection