# Ark Core Twitter BoT

Plugin used by @arkdelegates Twitter account

#### ❤️ Support maintenance and development of plugins
If you find this or other plugins useful please consider voting for `deadlock` delegate to support development of new plugins and tools for Ark's Ecosystem and maintenance of existing ones. Full list of contributions can be found on [https://arkdelegates.live/delegate/deadlock/](https://arkdelegates.io/delegate/deadlock/contributions/). 🖖

## Installation

### Adding plugin to config

Before restarting your process, you need to add the plugin into the very end  `core.plugins` or `relay.plugins` section of `app.json` file:

```json
{
    "package": "@deadlock-delegate/twitter-bot",
    "options": {
        "enabled": true,
        "webhooks": [{
          "endpoint": "https://discordapp.com/api/webhooks/612412465124612462/A1Ag12F&ijafa-3mtASA121mja",
          "payload": {
            "msg": "content"
          },
          "events": ["wallet.vote", "wallet.unvote", "forger.missing", "forger.failed"]
        }, {
          "endpoint": "https://hooks.slack.com/services/T1212ASDA/BAEWAS12/ASxASJL901ajkS",
          "payload": {
            "msg": "text"
          },
          "events": ["wallet.vote", "wallet.unvote", "forger.missing", "forger.failed"]
        },
        {
          "endpoint": "https://api.pushover.net/",
          "payload": {
            "msg": "message",
            "user": "<pushover user key>",
            "token": "<pushover token>"
          },
          "events": ["forger.missing", "forger.failed"]
        }]
      }
    }
}
```

### For production (eg. devnet/mainnet):

1. Install plugin: `ark plugin:install @deadlock-delegate/twitter-bot`
2. Add plugin to `app.json`
3. Start your node as you usually start it 

### For development (eg. testnet):

Assuming you don't run testnet locally via docker:

1. Clone this plugin into `plugins/` directory of the [core](https://github.com/ArkEcosystem/core/) project
2. Add plugin to `app.json`, for testnet the file can be found in: `core/packages/core/bin/config/testnet/app.json`
3. Go into the plugin's directory: `cd twitter-bot`
4. Build plugin: `yarn build`
5. Run `yarn full:testnet` inside `core/packages/core` directory to start testnet with notifier plugin

### Configuration explanation

```json
{
  "package": "@deadlock-delegate/twitter-bot",
  "options": {
    "enabled": true,
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": "",
  }
}
```

## Credits

- [roks0n](https://github.com/roks0n)
- [c0nsol3](https://github.com/c0nsol3)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © deadlock
