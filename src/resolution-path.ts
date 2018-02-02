import {Context, inject, ResolutionSession, Injection} from '@loopback/context';

export function main() {
  const context = new Context();
  let resolutionPath = '';

  class ZClass {
    @inject(
      'p',
      {},
      // Set up a custom resolve() to access information from the session
      (c: Context, injection: Injection, session: ResolutionSession) => {
        resolutionPath = session.getResolutionPath();
      },
    )
    myProp: string;
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
  context.getSync('x');
  console.log('Resolution path: %s', resolutionPath);
  // x --> @XClass.constructor[0] --> y --> @YClass.constructor[0]
  // --> z --> @ZClass.prototype.myProp';
}

if (require.main === module) {
  main();
}
