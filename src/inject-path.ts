import {Context, inject, ResolutionSession, Injection} from '@loopback/context';

/**
 * Create a decorator for injecting the resolution path
 */
export function resolutionPath() {
  return inject(
    '',
    {},
    (c: Context, injection: Injection, session: ResolutionSession) => {
      return session.getResolutionPath();
    },
  );
}

export function main() {
  const context = new Context();

  class ZClass {
    // Set up the project injection
    @resolutionPath() resolutionPath: string;
  }

  class YClass {
    constructor(@inject('z') public z: ZClass) {}
  }

  class XClass {
    constructor(@inject('y') public y: YClass) {}
  }

  context.bind('x').toClass(XClass);
  context.bind('y').toClass(YClass);
  context.bind('z').toClass(ZClass);
  const val: ZClass = context.getSync('z');
  console.log(val.resolutionPath);
  // x --> @XClass.constructor[0] --> y --> @YClass.constructor[0]
  // --> z --> @ZClass.prototype.myProp';
}

if (require.main === module) {
  main();
}
