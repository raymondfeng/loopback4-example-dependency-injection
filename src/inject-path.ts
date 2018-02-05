import {Context, inject, ResolutionSession, Injection} from '@loopback/context';

/**
 * Create a decorator for injecting the resolution path
 */
export function resolutionPath() {
  return inject(
    '',
    {decorator: '@resolutionPath'},
    (c: Context, injection: Injection, session: ResolutionSession) => {
      return session.getResolutionPath();
    },
  );
}

export function main() {
  const context = new Context();

  class Project {
    // Set up the project injection
    @resolutionPath() resolutionPath: string;
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
  const developer: Developer = context.getSync('developer');
  console.log(developer.team.project.resolutionPath);
  // developer --> @Developer.constructor[0] --> team --> @Team.constructor[0]
  // --> project --> @Project.prototype.resolutionPath
}

if (require.main === module) {
  main();
}
