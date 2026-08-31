(() => {
  const parameters = new URLSearchParams(window.location.search)
  const sitekey = parameters.get('sitekey') ?? ''
  const nonce = parameters.get('nonce') ?? ''
  const purpose = parameters.get('purpose') ?? ''
  const status = document.getElementById('challenge-status')
  const container = document.getElementById('turnstile-container')
  const allowedPurposes = new Set(['sign-up', 'sign-in', 'password-reset'])

  const fail = (message) => {
    status.textContent = message
    status.classList.add('error')
  }

  if (!/^0x[A-Za-z0-9_-]{10,100}$/.test(sitekey) || !/^[A-Za-z0-9_-]{20,100}$/.test(nonce) || !allowedPurposes.has(purpose)) {
    container.hidden = true
    fail('Missing or invalid verification settings. Close this window and try again from the Syntaxi app.')
    return
  }

  const waitForTurnstile = (attempt = 0) => {
    if (window.turnstile) {
      window.turnstile.render(container, {
        sitekey,
        theme: 'dark',
        appearance: 'always',
        callback: (token) => {
          status.textContent = 'Verified. Returning to Syntaxi…'
          const callback = new URL('syntaxforge://captcha/callback')
          callback.searchParams.set('nonce', nonce)
          callback.searchParams.set('purpose', purpose)
          callback.searchParams.set('token', token)
          window.location.assign(callback.toString())
        },
        'error-callback': () => fail('Verification could not finish. Check your connection and try again.'),
        'expired-callback': () => { status.textContent = 'Verification expired. Complete the check again.' },
      })
      status.textContent = 'Complete the check to continue.'
      return
    }
    if (attempt >= 50) { fail('Verification could not load. Check your connection and try again.'); return }
    window.setTimeout(() => waitForTurnstile(attempt + 1), 100)
  }

  waitForTurnstile()
})()
