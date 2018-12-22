const Twit = require('twit')
const core = require('@arkecosystem/core-container')
const logger = core.resolvePlugin('logger')
const emitter = core.resolvePlugin('event-emitter')

class Bot {
    constructor () {
        this.twit = undefined
        this.previouslyActiveDelegates = new Set()
    }

    start (options) {
        this.twit = new Twit({
            consumer_key: options.consumerKey,
            consumer_secret: options.consumerSecret,
            access_token: options.accessToken,
            access_token_secret: options.accessTokenSecret,
            timeout_ms: 5 * 1000
        })

        const context = { tweet: this.tweet }
        emitter.on('round.created', data => {
            if (this.previouslyActiveDelegates.size === 0) {
                this.previouslyActiveDelegates = new Set(data.map(delegate => delegate.username))
                return
            }
            const currentlyActiveDelegates = new Set(data.map(delegate => delegate.username))

            const droppedOutDelegates = new Set([...this.previouslyActiveDelegates].filter(x => !currentlyActiveDelegates.has(x)))
            for (const delegate of droppedOutDelegates) {
                console.log(`>>> tweeting about removed top 51 delegate: ${delegate}`)
                this.tweet(`🚨 ${delegate} got removed by ARK holders to be a forging delegate #arkecosystem #dpos #arkdelegates #ARK $ARK`)
            }
            const newDelegates = new Set([...currentlyActiveDelegates].filter(x => !this.previouslyActiveDelegates.has(x)))
            for (const delegate of newDelegates) {
                console.log(`>>> tweeting about a NEW top 51 delegate: ${delegate}`)
                this.tweet(`👏 ${delegate} got elected by ARK holders to be a forging delegate #arkecosystem #dpos #arkdelegates #ARK $ARK`)
            }
        }, context)
    }

    async tweet (status) {
        try {
            await this.twit.post('statuses/update', { status: status })
        } catch (err) {
            logger.error(`There was an error posting this tweet: ${err}`)
        }
    }
}

module.exports = new Bot()
