# Syntaxi Downloads

This public repository hosts the Syntaxi website and Windows and macOS release files. The source project is maintained separately in a private repository.

## Website

Visit **[n3try.github.io/syntaxi](https://n3try.github.io/syntaxi/)** to view the courses, download the installer, or open an installed copy of Syntaxi.

The website targets WCAG 2.2 Level AA and includes dedicated [privacy](https://n3try.github.io/syntaxi/privacy.html), [terms](https://n3try.github.io/syntaxi/terms.html), and [accessibility](https://n3try.github.io/syntaxi/accessibility.html) pages. Accessibility problems can be reported through the public issue tracker without including private information.

## Site checks

Install the test tools and run the HTML, automated WCAG, keyboard, text-spacing, touch-target, and 320-pixel reflow checks:

```powershell
npm install
npm test
```

The same checks run in GitHub Actions for changes to the main branch and pull requests.

## Download

The recommended download is the small web installer:

**[Download Syntaxi Web Setup](https://github.com/n3try/syntaxi/releases/latest/download/Syntaxi.Web.Setup.exe)**

It downloads the full, checksum-verified application package during setup.

Other choices are available on the [latest release page](https://github.com/n3try/syntaxi/releases/latest):

- **Syntaxi Setup.exe** contains the complete app for offline installation.
- **Syntaxi Portable.exe** runs without installing.
- **Syntaxi.Mac.arm64.dmg** runs on Apple silicon Macs.
- **Syntaxi.Mac.x64.dmg** runs on Intel Macs.

The legacy `syntax-forge-downloads` repository and `syntaxforge://` app-link scheme remain online so older installs, account callbacks, and automatic updates keep working.
- **SHA256SUMS.txt** contains verification hashes.

The `.nsis.7z` file is used automatically by Web Setup. It is not a manual download.

## Windows warning

The current builds are not Authenticode-signed. Windows SmartScreen may display an unknown publisher warning until a trusted Windows code-signing certificate is added.

## macOS warning

The current Mac builds are not signed or notarized. macOS Gatekeeper may block the first launch. Use **Open Anyway** in System Settings under Privacy &amp; Security only after confirming the download came from this repository. Apple signing and notarization are required before this should be treated as a polished production download.
