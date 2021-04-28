<div align="center">
  <a href="https://episclera.github.io/multipack/">
  <img style="max-width:100%;" height="200"
    src="https://raw.githubusercontent.com/episclera/multipack/master/logo.png">
  </a>
  <h1>@episclera/next-i18next-config</h1>
  <p>A shareable next-i18next config. Part of <a href="https://github.com/episclera/multipack">multipack</a> monorepo</p>
  <p>
    <a href="https://episclera.github.io/multipack/">Site</a>
    | <a href="https://episclera.github.io/multipack/docs/doc-introduction">Getting Started</a>
    | <a href="https://episclera.github.io/multipack/docs/doc-api-introduction">API</a>
    | <a href="https://episclera.github.io/multipack/blog/">Blog</a>
  </p>
</div>

[![GitHub](https://img.shields.io/github/license/episclera/multipack)](https://github.com/episclera/multipack/blob/master/LICENSE)
[![Multipack](https://img.shields.io/badge/Generated%20from-episclera%2Fmultipack-green)](https://github.com/episclera/multipack)

## Usage

Install: `npm i -D @episclera/next-i18next-config`

And in your `next-i18next.config.js` file just put this content.

```js
const nextI18NextConfig = require('@episclera/next-i18next-config')
module.exports = nextI18NextConfig

// OR you can mix multiple configs with "mergeConfigs" util from @episclera/multipack-utils
const nextI18NextConfig = require('@episclera/next-i18next-config')
const { mergeConfigs } = require('@episclera/multipack-utils')

module.exports = mergeConfigs(nextI18NextConfig, {
  i18n: { defaultLocale: 'ar' },
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

#### Or you can sponsor via [Open Collective](https://opencollective.com/episclera/)

[![Open Collective](https://opencollective.com/episclera/tiers/sponsor.svg?avatarHeight=60)](https://opencollective.com/episclera/)

## Author

**[@episclera/multipack](https://github.com/episclera/multipack)** © [Episclera](https://github.com/episclera), Released under the [MIT](https://github.com/episclera/multipack/blob/master/LICENSE) License.<br>
Authored and maintained by Episclera with help from contributors ([list](https://github.com/episclera/multipack/contributors)).

#### If you like this repository star⭐ and watch👀 on [GitHub](https://github.com/episclera/multipack).
