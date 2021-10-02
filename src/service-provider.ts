import { Container, Contracts, Providers } from "@arkecosystem/core-kernel";

import Bot from "./bot";
import { LOG_PREFIX } from "./constants";
import { IOptions } from "./interface";

export class ServiceProvider extends Providers.ServiceProvider {
    @Container.inject(Container.Identifiers.LogService)
    private readonly logger!: Contracts.Kernel.Logger;

    private service = Symbol.for("Service<TWBot>");

    public async register(): Promise<void> {
        this.logger.info(`${LOG_PREFIX} Registering plugin`);
        this.app.bind(this.service).to(Bot).inSingletonScope();
    }

    public async boot(): Promise<void> {
        const options = this.config().all() as unknown as IOptions;
        this.app.get<Bot>(this.service).start(options);
        this.logger.info(`${LOG_PREFIX} Plugin started`);
    }

    public async bootWhen(): Promise<boolean> {
        return !!this.config().get("enabled");
    }

    public async dispose(): Promise<void> {
        // TODO: make sure plugin is stopped gracefully
        // this.logger.info('Stopped')
    }
}
