import { test, expect } from '@playwright/test'

test.use({ channel: 'chrome' })

test('renders Turnstile after the deferred API script loads', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js?*', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: `window.turnstile = {
      render(container, options) {
        container.dataset.rendered = 'true'
        window.renderedTurnstileOptions = options
      }
    }`,
  }))

  await page.goto('/captcha.html?sitekey=0x4AAAAAAEipEQ3SWYpeTtbp&nonce=diagnosticnonce1234567890AB&purpose=sign-up')

  await expect(page.locator('#challenge-status')).toHaveText('Complete the check to continue.')
  await expect(page.locator('#turnstile-container')).toHaveAttribute('data-rendered', 'true')
  await expect.poll(() => page.evaluate(() => ({
    sitekey: window.renderedTurnstileOptions?.sitekey,
    theme: window.renderedTurnstileOptions?.theme,
    appearance: window.renderedTurnstileOptions?.appearance,
  }))).toEqual({
    sitekey: '0x4AAAAAAEipEQ3SWYpeTtbp',
    theme: 'dark',
    appearance: 'always',
  })
})
