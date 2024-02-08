import { EventEmitter as EventEmitterInternal } from 'events';

const EventEmitter = new EventEmitterInternal();

export { EventEmitter };
