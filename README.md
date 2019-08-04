# ARKdelegates.io plugin

Plugin used by arkdelegatesio Twitter account

#### ❤️ Support maintenance and development of plugins
If you find this or other plugins useful please consider

- voting for `deadlock` delegate
- donating to `AWtgFYbvtLDYccJvC5MChk4dpiUy2Krt2U`

to support development new plugins and tools for Ark's Ecosystem and maintenance of existing ones. Full list of contributions can be found on [https://arkdelegatesio/delegate/deadlock/](https://arkdelegates.io/delegate/deadlock/contributions/). 🖖

## Installation

### Clone

```bash
cd ~/ark-core/plugins
git clone https://github.com/deadlock-delegate/arkdelegates-plugin
lerna bootstrap
```

### Registration

Open `~/.ark/config/plugins.js` and add the following at the end.

```js
'@deadlock/arkdelegates-plugin': {}
```

like so:

```js
module.exports = {
  '@arkecosystem/core-event-emitter': {},
  '@arkecosystem/core-config': {},
  ...
  '@deadlock/notifier': {
    enabled: true,
    consumerKey: '',
    consumerSecret: '',
    accessToken: '',
    accessTokenSecret: ''
  }
}
```

## Credits

- [roks0n](https://github.com/roks0n)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © roks0n
