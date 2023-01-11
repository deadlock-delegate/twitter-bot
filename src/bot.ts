import { Container, Contracts, Enums as AppEnums, Services, Utils as AppUtils } from "@arkecosystem/core-kernel";
import Twit from "twit";

import { LOG_PREFIX } from "./constants";
import { IOptions } from "./interface";

let LAST_ACTIVE_DELEGATES_CACHED: string[] = [];

@Container.injectable()
export default class Bot {
    @Container.inject(Container.Identifiers.EventDispatcherService)
    private readonly emitter!: Contracts.Kernel.EventDispatcher;

    @Container.inject(Container.Identifiers.LogService)
    private readonly logger!: Contracts.Kernel.Logger;

    @Container.inject(Container.Identifiers.TriggerService)
    private readonly triggers!: Services.Triggers.Triggers;

    @Container.inject(Container.Identifiers.StateStore)
    private readonly stateStore!: Contracts.State.StateStore;

    @Container.inject(Container.Identifiers.Application)
    private readonly app!: Contracts.Kernel.Application;
    private twit?: Twit;

    public start(options: IOptions): void {
        this.twit = new Twit({
            consumer_key: options.consumerKey,
            consumer_secret: options.consumerSecret,
            access_token: options.accessToken,
            access_token_secret: options.accessTokenSecret,
            timeout_ms: 5 * 1000,
        });

        this.emitter.listen(AppEnums.BlockEvent.Applied, {
            handle: async (payload: any) => {
                const previouslyActiveDelegates = LAST_ACTIVE_DELEGATES_CACHED;
                const latestDelegates = (await this.triggers.call(
                    "getActiveDelegates",
                    {},
                )) as Contracts.State.Wallet[];
                if (!latestDelegates) return;

                const newActiveDelegates = latestDelegates.map((wallet) => wallet.getAttribute("delegate.username"));
                if (previouslyActiveDelegates.length == 0) {
                    LAST_ACTIVE_DELEGATES_CACHED = newActiveDelegates;
                    return;
                }

                const droppedOutDelegates = previouslyActiveDelegates.filter((x) => !newActiveDelegates.includes(x));
                const newDelegates = newActiveDelegates.filter((x) => !previouslyActiveDelegates.includes(x));

                if (droppedOutDelegates.length === 0 && newDelegates.length === 0) {
                    return;
                }

                const block = this.stateStore.getLastBlock();
                const { round } = AppUtils.roundCalculator.calculateRound(block.data.height);

                let TW_DEV_PREFIX = "";
                if (this.app.network() !== "mainnet") {
                    TW_DEV_PREFIX = "[TEST] ";
                }

                for (const delegate of droppedOutDelegates) {
                    this.logger.debug(
                        `${LOG_PREFIX} Tweeting about removed forging delegate ${delegate} in round ${round}`,
                    );
                    this.tweet(`${TW_DEV_PREFIX}🚨 ${delegate} removed from active block producer position in round ${round}`);
                }

                for (const delegate of newDelegates) {
                    console.log(`${LOG_PREFIX} Tweeting about a new forging delegate ${delegate} in round ${round}`);
                    this.tweet(`${TW_DEV_PREFIX}👏 ${delegate} elected to be an active block producer in round ${round}`);
                }

                // cache new active delegates for the next round so we know which ones change
                LAST_ACTIVE_DELEGATES_CACHED = newActiveDelegates;
                return;
            },
        });
    }

    private async tweet(status: string) {
        if (!this.twit) {
            this.logger.error(`${LOG_PREFIX} Twit is not initialized`);
            return;
        }

        try {
            await this.twit.post("statuses/update", { status: status });
        } catch (err) {
            this.logger.error(`${LOG_PREFIX} Error posting tweet: ${err}`);
        }
    }
}
