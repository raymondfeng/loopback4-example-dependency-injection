import {Context, inject, ResolutionSession, Injection} from '@loopback/context';

export async function main() {
  const context = new Context();

  class Developer {
    constructor(public name: string) {}
  }

  class Project {
    @inject(
      '',
      {},
      // Set up a custom resolve() to access information from the session
      async (c: Context, injection: Injection, session: ResolutionSession) => {
        const bindings = session.bindingStack;
        return bindings[bindings.length - 2].key;
      },
    )
    teamName: string;

    @inject('project.name') projectName: string;
  }

  class Team {
    constructor(
      @inject('project') public project: Project,
      @inject('lead') public lead: Developer,
    ) {}
  }

  context
    .bind('project.name')
    .toDynamicValue(() => Promise.resolve('LoopBack.Next'));
  context.bind('project').toClass(Project);

  context
    .bind('qa-team')
    .toClass(Team)
    .tag('name:qa');

  context
    .bind('lead')
    .toDynamicValue(() => Promise.resolve(new Developer('John')));

  const team = await context.get('qa-team');
  console.log(team);
  return team;
}

if (require.main === module) {
  main();
}
