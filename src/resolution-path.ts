import {Context, inject, ResolutionSession, Injection} from '@loopback/context';

export function main() {
  const context = new Context();
  let resolutionPath = '';

  class Project {
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

  class Team {
    constructor(@inject('project') public project: Project) {}
  }

  class Developer {
    constructor(@inject('team') public team: Team) {}
  }

  context.bind('developer').toClass(Developer);
  context.bind('team').toClass(Team);
  context.bind('project').toClass(Project);
  context.getSync('developer');
  console.log('Resolution path: %s', resolutionPath);
  // developer --> @Developer.constructor[0] --> team --> @Team.constructor[0]
  // --> project --> @Project.prototype.myProp
}

if (require.main === module) {
  main();
}
