// Type definitions for apiai 3.0.4
// Project: https://github.com/api-ai/api-ai-node-js/
// Definitions by: Dmitry Kuragin <https://github.com/sstepashka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="typescript" />
/// <reference types="node" />
// / <reference path="node_modules/@types/node/index.d.ts" />


/* =================== USAGE ===================
    import * as express from "express";
    var app = express();
 =============================================== */

import {EventEmitter} from 'events';


/**
 * Base request options. Not uses directly, for inherits only.
 */
interface RequestOptions {
    endpoint?: string;
}

/**
 * Base class or interface for all inherited requests.
 * Not uses directly, for inherits only.
 */
interface Request extends EventEmitter {
    write(buffer: Buffer | string): void;
    end(): void;
}

/**
 * Base query request options.
 * See details at https://docs.api.ai/docs/query
 */
interface QueryRequestOptions extends RequestOptions {
    timezone?: string;
    resetContexts?: boolean;
    sessionId: string;
    contexts?: [any];
    entities?: [any];
    version?: string;
    requestSource?: string;
    originalRequest?: any;
}

/**
 * Base query request.
 */
interface QueryRequest extends Request {

}

/**
 * Text Request options.
 */
interface TextRequestOptions extends QueryRequestOptions {

}

/**
 * Text Request.
 */
interface TextRequest extends QueryRequest {
    query: string | [string];
}

/**
 * Event Request options.
 */
interface EventRequestOptions extends QueryRequestOptions {

}

/**
 * Event model for setn event request.
 */
interface Event {
    name: string;
    data?: { [key: string] : any; };
}

/**
 * Text Request.
 */
interface EventRequest extends QueryRequest {
    event: Event
}

/**
 * Contexts Request options.
 */
interface ContextsRequestOptions extends RequestOptions {
    sessionId: string;
}

/**
 * Contexts Request.
 */
interface ContextsRequest extends Request {
    contexts: [any];
}

/**
 * UserEntities Request options.
 */
interface UserEntitiesRequestOptions extends RequestOptions {

}

/**
 * UserEntities Request.
 */
interface UserEntitiesRequest extends Request {
    user_entities: [any];
}

/**
 * Application options. This options uses for
 * default parameters for requests.
 */
interface ApplicationOptions {
    language?: string;
    hostname?: string;
    version?: string;
    endpoint?: string;
    requestSource?: string;
    secure?: boolean;
}

/**
 * Application is factory for requests to api.ai service..
 */
interface Application {
    textRequest(query: string | [string], options: TextRequestOptions): TextRequest
    eventRequest(event: Event, options: EventRequestOptions): EventRequest
    contextsRequest(contexts: [any], options: ContextsRequestOptions): ContextsRequest
    userEntitiesRequest(user_entities: [any], options)
}

export = createApplication;

declare namespace createApplication {}
declare function createApplication(clientAccessToken: string, options?: ApplicationOptions): Application;

declare module "apiai" {
    export = createApplication;
}
