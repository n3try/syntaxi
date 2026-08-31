const status = document.querySelector('#action-status')
const openButton = document.querySelector('#open-app-button')
const windowsDownloadButton = document.querySelector('#windows-download-button')
const macDownloadButton = document.querySelector('#mac-download-button')

let launchTimer

openButton.addEventListener('click', () => {
  window.clearTimeout(launchTimer)
  status.textContent = 'Asking your computer to open Syntaxi…'
  status.classList.add('active')
  launchTimer = window.setTimeout(() => {
    status.textContent = 'If nothing opened, install the latest version first, then try again.'
  }, 1800)
})

window.addEventListener('blur', () => {
  if (!launchTimer) return
  window.clearTimeout(launchTimer)
  launchTimer = undefined
  status.textContent = 'Launch request sent.'
})

windowsDownloadButton.addEventListener('click', () => {
  status.textContent = 'Your Windows Web Setup download is starting…'
  status.classList.add('active')
})

macDownloadButton.addEventListener('click', () => {
  status.textContent = 'Your Apple silicon macOS download is starting…'
  status.classList.add('active')
})
