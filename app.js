const status = document.querySelector('#action-status')
const openButton = document.querySelector('#open-app-button')
const windowsDownloadButton = document.querySelector('#windows-download-button')
const macDownloadButtons = document.querySelectorAll('[data-macos-download]')
const macDownloadDialog = document.querySelector('#mac-download-dialog')
const macDownloadConfirm = document.querySelector('#mac-download-confirm')
const macDownloadArchitecture = document.querySelector('#mac-download-architecture')

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

macDownloadButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    const architecture = button.dataset.macArchitecture
    macDownloadConfirm.href = button.href
    macDownloadConfirm.dataset.macArchitecture = architecture
    macDownloadArchitecture.textContent = `${architecture} Mac`
    macDownloadDialog.showModal()
  })
})

macDownloadConfirm.addEventListener('click', () => {
  const architecture = macDownloadConfirm.dataset.macArchitecture
  status.textContent = `Your ${architecture} macOS download is starting…`
  status.classList.add('active')
  macDownloadDialog.close()
})
