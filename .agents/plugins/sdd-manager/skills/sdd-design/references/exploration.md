# Exploration

Use conversational exploration to form decisions needed for project architecture and decomposition. Discussion, read-only inspection, small illustrative examples, and explicit tradeoffs are allowed. Do not write project files or run a project-changing prototype merely because a design appears ready.

## Decision state

Keep separate:

- verified facts and their source;
- explicit user decisions;
- working assumptions needing confirmation where they affect design;
- open questions and intentionally delegated details;
- plausible alternatives and rejected alternatives.

Silence after an example is not acceptance. If new evidence conflicts with an accepted decision, identify the conflict and ask whether the decision changes before using the new premise as authority.

## Conversation

1. Establish the problem, users, desired observable outcomes, constraints, non-goals, and vocabulary.
2. Inspect relevant existing documents, code, behavior, or external constraints read-only when they affect the choice. Label inference separately from evidence.
3. Explore the design surfaces that matter: responsibilities and interfaces, dependency direction, data ownership, state and lifecycle, failure behavior, integration, verification, and compatibility.
4. Compare a small number of serious alternatives by consequences for coupling, testability, implementation cost, recovery, and reversibility. Recommend a direction when the evidence supports it.
5. Challenge mixed responsibilities, unclear contracts, cycles, untestable assumptions, and unexplained complexity. Ask focused questions for decisions that materially alter design; retain safe unknowns explicitly.
6. Summarize accepted decisions, working assumptions, open questions, and the next useful design step as the conversation progresses.

An exploratory prototype inside the governed project is project implementation. Treat it as such only when separately requested and governed; a truly disposable experiment must stay outside the project and establish no relied-on contract.

## Handoff

When PROJECT creation, revision or review is requested, load the [project brief](project-brief.md) contract to turn the seed and actual clarified decisions into the selected artifact. Its human checkpoint holds dependent architecture; conversational exploration alone does not authorize drafting.

Architecture work is ready when the purpose and scope are understood, principal boundaries can be argued, and no unresolved question would force a material architecture choice to be invented. If the user requests architecture earlier, identify the missing decisions and distinguish blockers from deliberate design options. Read [architecture](architecture.md) only when architecture becomes the requested work. Read [decomposition](decomposition.md) only when detailed components become the requested work.

## Evidence-backed project positioning

Establish the actual purpose, intended audience, learning objectives when applicable, and demonstrated maturity separately from intended capabilities. A learning experiment can be described as such when supported by the brief; do not characterize every consumer project that way. Related projects provide context, not inferred affiliation, dependencies, superiority or provenance.
