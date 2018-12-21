'use strict'

/**
 * This file is part of Ark Core - Detective.
 *
 * (c) roks0n
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const bot = require('./bot.js')
const defaults = require('./defaults')

/**
 * The struct used by the plugin container.
 * @type {Object}
 */
exports.plugin = {
    pkg: require('../package.json'),
    defaults,
    alias: 'deadlock:arkdelegates-bot',
    async register (container, options) {
        if (!options.enabled) {
            return
        }
        const logger = container.resolvePlugin('logger')
        bot.start(options)
        logger.debug('[ARKdelegates bot] Up and running :robot_face:')
    }
}
