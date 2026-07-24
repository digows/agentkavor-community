# Visible Agent Capabilities

> Building Kavor 01 · Status: framing the first public experiment

[Building Kavor](../README.md) / Visible Agent Capabilities

Coding agents already have superpowers. The awkward part is that many of those powers are invisible.

A provider may discover instructions from the filesystem, load a plugin, connect to an MCP server, inherit
permissions, or receive tools from its runtime. The user often sees the result, but not the capability model that
made the result possible.

Kavor is exploring a different experience:

> Select a CodingAgent Node and understand what it knows, what it can operate, why it has access, and how to take
> that access away.

## Why this belongs in Kavor

Kavor treats coding agents as interchangeable executors inside a user-owned Workspace. The Canvas makes work and
relationships visible. Connections grant access to other Nodes, while Guardrails restrict that access.

Capabilities are the next missing layer of visibility. They should not be hidden across provider configuration,
prompt fragments, and installation directories.

## Working vocabulary

These names are deliberately provisional. The first job of the track is to test whether the distinctions survive
real integrations.

- **Skill:** instructions, knowledge, references, and a repeatable workflow.
- **Connector:** executable access to an external system, such as MCP, an API, a browser, or a native application.
- **Capability Pack:** a possible installable unit that combines Skills, Connectors, compatibility requirements,
  and presentation metadata.

A Skill can explain how to review a GitLab merge request. It cannot grant GitLab access by itself. That requires a
Connector, authentication, and an authorization boundary.

Calling all of those things “Skills” would make the UI simpler at the cost of making the product dishonest.

## The visual experiment

CodingAgent Nodes already have an attached Messages surface. The first interaction experiment is a related
Capabilities surface where the user can inspect:

- which capabilities are active;
- whether each capability is built in, derived from a Connection, or explicitly attached;
- where it came from and which provider versions it supports;
- which tools and external systems it can reach;
- whether authentication is configured;
- which Connections and Guardrails constrain it;
- whether the agent actually used it during the current work.

The UI must remain useful when an agent has two capabilities or two hundred. It cannot dump a plugin directory into
a settings screen and call the problem solved.

## What already exists

This is not a blank-slate marketplace project. Kavor already has:

- progressively disclosed Kavor Skills;
- a compact Skill index available to CodingAgents;
- on-demand Skill loading;
- capability granted through direct Connections;
- live Guardrails;
- a provider-neutral MCP boundary.

The open question is how to evolve those foundations into a user-visible and distributable system without making
provider-specific configuration the Kavor domain model.

## Planned chapters

1. [Agents Have Invisible Superpowers](01-agents-have-invisible-superpowers.md)
2. Skill, Tool, Connector, or Plugin?
3. Designing the CodingAgent Capability Surface
4. Attaching and Revoking the First Capability
5. Making Permissions and Guardrails Legible
6. Building the First Community Capability Pack
7. Choosing What the Next Agent Should Learn

These are investigation chapters, not promised release scope. A chapter may reject its starting idea.

## First integration candidates

The first Capability Pack should be useful, testable, and narrow enough to expose flaws in the model.

- **GitLab:** close to the core software-development workflow and a good test of read/write authorization.
- **n8n:** combines API operations, workflow knowledge, and clear visual outcomes.

Browser control and native applications such as Photoshop are intentionally later candidates. They are compelling,
but they introduce separate runtime and interaction problems that would obscure the capability model itself.

## Questions we want the community to challenge

- Should Skills and executable Connectors appear together or as separate surfaces?
- Is a capability attached to one CodingAgent, the Workspace, or both?
- What should be inherited from a provider, and what should Kavor own?
- How should users recognize a capability that can mutate an external system?
- What evidence should Kavor retain when a capability is used?
- Which real integration would expose the weakest part of this model?

Follow the track here and in [Kavor Discussions](https://github.com/digows/agentkavor-community/discussions).
