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
            console.log('>>> previouslyActiveDelegates', this.previouslyActiveDelegates.size)
            if (this.previouslyActiveDelegates.size === 0) {
                this.previouslyActiveDelegates = new Set(data.map(delegate => delegate.username))
                return
            }
            const currentlyActiveDelegates = new Set(data.map(delegate => delegate.username))
            console.log('>>> currentlyActiveDelegates', currentlyActiveDelegates.size)

            const droppedOutDelegates = new Set([...this.previouslyActiveDelegates].filter(x => !currentlyActiveDelegates.has(x)))
            for (const delegate of droppedOutDelegates) {
                this.tweet(`🚨 ${delegate} got voted out of the top 51 #arkecosystem #dpos #arkdelegates`)
            }
            const newDelegates = new Set([...currentlyActiveDelegates].filter(x => !this.previouslyActiveDelegates.has(x)))
            for (const delegate of newDelegates) {
                this.tweet(`👏 ${delegate} got voted into the top 51 #arkecosystem #dpos #arkdelegates`)
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
