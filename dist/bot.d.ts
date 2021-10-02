import { IOptions } from "./interface";
export default class Bot {
    private readonly emitter;
    private readonly logger;
    private readonly triggers;
    private readonly stateStore;
    private readonly app;
    private twit?;
    start(options: IOptions): void;
    private tweet;
}
