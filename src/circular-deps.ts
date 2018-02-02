import {Context, inject} from '@loopback/context';

interface XInterface {}
interface YInterface {}
interface ZInterface {}

class XClass {
  constructor(@inject('y') public y: YInterface) {}
}

class YClass {
  constructor(@inject('z') public z: ZInterface) {}
}

class ZClass {
  constructor(@inject('x') public x: XInterface) {}
}

export function main() {
  const context = new Context();

  context.bind('x').toClass(XClass);
  context.bind('y').toClass(YClass);
  context.bind('z').toClass(ZClass);

  try {
    // The following call with fail
    context.getSync('x');
  } catch (e) {
    console.error(e.toString());
  }
}

if (require.main === module) {
  main();
}
