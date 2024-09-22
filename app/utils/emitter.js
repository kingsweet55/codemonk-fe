import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const EVENTS = {
  HAMBURGER_TOGGLE: 'Hamburger_Toggle',
  Proxy_Login_Recruiter: 'Proxy_Login_Recruiter',
  Proxy_Login_Ambassador: 'Proxy_Login_Ambassador',
};

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
  EVENTS,
};

Object.freeze(Emitter);

export default Emitter;
