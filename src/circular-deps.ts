import {Context, inject} from '@loopback/context';

interface Developer {
  // Each developer belongs to a team
  team: Team;
}

interface Team {
  // Each team works a project
  project: Project;
}

interface Project {
  // Each project has a lead developer
  lead: Developer;
}

class DeveloperImpl implements Developer {
  constructor(@inject('team') public team: Team) {}
}

class TeamImpl implements Team {
  constructor(@inject('project') public project: Project) {}
}

class ProjectImpl implements Project {
  constructor(@inject('lead') public lead: Developer) {}
}

export function main() {
  const context = new Context();

  context.bind('lead').toClass(DeveloperImpl);
  context.bind('team').toClass(TeamImpl);
  context.bind('project').toClass(ProjectImpl);

  try {
    // The following call with fail
    context.getSync('lead');
  } catch (e) {
    console.error(e.toString());
  }
}

if (require.main === module) {
  main();
}
