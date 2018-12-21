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

Open `~/.ark/config/plugins.js` and add the following at the end (it has to be bellow p2p and api).

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
    enabled: false,
    consumerKey: '',
    consumerSecret: '',
    accessToken: '',
    accessTokenSecret: ''
  }
}
```

### Configuration

```js
{
  enabled: true,  // true/false if you want to enable/disable the plugin
  {
    endpoint: 'webhook endpoint url',
    payload: {
      msg: 'name of the message field eg. discord has "content", slack has "text"'
    },
    events: ['list of events you want to subscribe to']
  }
}
```

- [ ] transaction.reverted

## Credits

- [roks0n](https://github.com/roks0n)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © roks0n
