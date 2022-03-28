# Core Twitter BoT

Plugin used by @arkdelegates and @solardelegates Twitter account

#### ❤️ Support maintenance and development of plugins
If you find this or other plugins useful please consider voting for `deadlock` delegate on Solar or Ark networks.


## Installation

### Adding plugin to config

Before restarting your process, you need to add the plugin into the very end  `core.plugins` or `relay.plugins` section of `app.json` file:

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

### For production (eg. mainnet/testnet/devnet):

1. Install plugin: `<command> plugin:install @deadlock-delegate/notifier`, eg: `ark plugin:install @deadlock-delegate/notifier` or `solar plugin:install @deadlock-delegate/notifier`2. Add plugin to `app.json`
3. Start your node as you usually start it 

### For development:

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
