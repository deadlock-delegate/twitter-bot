"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_kernel_1 = require("@arkecosystem/core-kernel");
const twit_1 = __importDefault(require("twit"));
const constants_1 = require("./constants");
let LAST_ACTIVE_DELEGATES_CACHED = [];
let Bot = class Bot {
    start(options) {
        this.twit = new twit_1.default({
            consumer_key: options.consumerKey,
            consumer_secret: options.consumerSecret,
            access_token: options.accessToken,
            access_token_secret: options.accessTokenSecret,
            timeout_ms: 5 * 1000,
        });
        this.emitter.listen(core_kernel_1.Enums.BlockEvent.Applied, {
            handle: async (payload) => {
                const previouslyActiveDelegates = LAST_ACTIVE_DELEGATES_CACHED;
                const latestDelegates = (await this.triggers.call("getActiveDelegates", {}));
                if (!latestDelegates)
                    return;
                const block = this.stateStore.getLastBlock();
                const { round } = core_kernel_1.Utils.roundCalculator.calculateRound(block.data.height);
                const newActiveDelegates = latestDelegates.map((wallet) => wallet.getAttribute("delegate.username"));
                const droppedOutDelegates = previouslyActiveDelegates.filter((x) => !newActiveDelegates.includes(x));
                const newDelegates = newActiveDelegates.filter((x) => !previouslyActiveDelegates.includes(x));
                if (droppedOutDelegates.length === 0 && newDelegates.length === 0) {
                    return;
                }
                let TW_DEV_PREFIX = "";
                if (this.app.network() !== "mainnet") {
                    TW_DEV_PREFIX = "[TEST] ";
                }
                for (const delegate of droppedOutDelegates) {
                    this.logger.debug(`${constants_1.LOG_PREFIX} Tweeting about removed top 51 delegate ${delegate} in round ${round}`);
                    this.tweet(`${TW_DEV_PREFIX}🚨 ${delegate} removed from forging position in round ${round} #arkecosystem #dpos #arkdelegates #ARK $ARK`);
                }
                for (const delegate of newDelegates) {
                    console.log(`${constants_1.LOG_PREFIX} Tweeting about a NEW top 51 delegate ${delegate} in round ${round}`);
                    this.tweet(`${TW_DEV_PREFIX}👏 ${delegate} elected to be a forging delegate in round ${round} #arkecosystem #dpos #arkdelegates #ARK $ARK`);
                }
                // cache new active delegates for the next round so we know which ones change
                LAST_ACTIVE_DELEGATES_CACHED = newActiveDelegates;
                return;
            },
        });
    }
    async tweet(status) {
        if (!this.twit) {
            this.logger.error(`${constants_1.LOG_PREFIX} Twit is not initialized`);
            return;
        }
        try {
            await this.twit.post("statuses/update", { status: status });
        }
        catch (err) {
            this.logger.error(`${constants_1.LOG_PREFIX} Error posting tweet: ${err}`);
        }
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.EventDispatcherService),
    __metadata("design:type", Object)
], Bot.prototype, "emitter", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.LogService),
    __metadata("design:type", Object)
], Bot.prototype, "logger", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.TriggerService),
    __metadata("design:type", core_kernel_1.Services.Triggers.Triggers)
], Bot.prototype, "triggers", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.StateStore),
    __metadata("design:type", Object)
], Bot.prototype, "stateStore", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.Application),
    __metadata("design:type", Object)
], Bot.prototype, "app", void 0);
Bot = __decorate([
    core_kernel_1.Container.injectable()
], Bot);
exports.default = Bot;
//# sourceMappingURL=bot.js.map