# ARKdelegates.io plugin

Plugin used by arkdelegatesio Twitter account

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
