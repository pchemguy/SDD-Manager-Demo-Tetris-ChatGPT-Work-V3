# Delivery plan

`docs/dev/PLAN.md` defines a coherent strategy to deliver the complete intended system. It describes phases and meaningful milestones, dependency order, integration approach, major risks and decision gates, and evidence required at phase and milestone exits. Keep it substantive enough that TASKS can derive bounded executable work without inventing delivery strategy. It is not a record of completed work.

## Establish the strategy

1. Map the accepted ARCHITECTURE and DECOMPOSITION to the behavioral contracts and end-to-end acceptance in SPEC. Identify critical dependencies and the points where components must integrate.
2. Default to the simplest practical meaningful end-to-end MVP or prototype as the earliest usable milestone. State included and deferred capability/contract scope, observable usefulness, relevant acceptance, and minimum necessary dependencies. For an existing system, preserve its useful baseline and identify the earliest meaningful changed path. Justify prerequisites that delay this outcome, such as unavoidable infrastructure, characterization, compatibility/migration, or a risk probe; name their evidence and route to integrated behavior. A technical skeleton or mocked-only path does not by itself establish useful functionality.
3. Define phases around major delivery outcomes and milestones around reviewable, verifiable stopping points. For each, state scope, outputs or capabilities, prerequisites, and objective exit evidence. At suitable early and subsequent milestones, state what working capability can be demonstrated, what functional/usability feedback or risk evidence is needed, and which consequential human decision it informs: continue, amend, simplify, or stop. Do not require usability trials at every task or authorize automatic steering/stopping; routine progression already authorized by the request needs no additional approval. Include important failure and integration checks where they establish readiness, without prescribing a test case for every requirement.
4. Identify cross-cutting verification, documentation, packaging, and release work at the level required for the strategy. State risks, assumptions, unresolved decisions, and their gates without treating guesses as accepted requirements.
5. Check that every intended capability has a plausible delivery path and that the plan can be executed in bounded units later. Do not enumerate file edits, task IDs, commit transactions, or a per-test command sequence; TASKS owns that detail.

## Review boundaries

Apply the [backend object lifecycle](../../sdd-conventions/references/backend-object-lifecycle.md). Reserve one final phase review milestone with a single phase review/testing/report outcome. Every preceding delivery milestone includes its own final milestone review/testing/report outcome. Define code review, focused testing/regressions, blocker repair and committed report evidence as exits. The phase review starts after all delivery milestones complete/close; its own milestone closes afterward. PLAN owns these boundaries; TASKS assigns executable task IDs. Include final TODO aggregation when the last phase completes the full task list.

## Incremental growth

- **Bound behavior:** Evolve the usable path through the smallest meaningful capability increments that can be integrated, reviewed, and robustly checked. State affected contracts, dependencies, and acceptance; small file scope alone does not establish a small functional change.
- **Establish checks early:** Plan rigorous relevant end-to-end, regression, failure, and integration coverage alongside the initial slice and each increment. Preserve previously working behavior and resolve required failures before dependent functionality grows.
- **Respect ownership:** PLAN defines capability increments and verification dependencies; TASKS derives bounded work within them. **sdd-tdd** owns detailed testing strategy, **sdd-verify** assesses checks/evidence, and **sdd-implement** owns execution, repairs, and completion.
- **Retain full intent:** Main design and SPEC describe the complete intended system. MVP deferrals select implementation scope without silently relaxing applicable acceptance or deleting intended requirements. Required extensibility/load constraints guide staged realization; anticipated generalizations do not automatically become MVP prerequisites.

Choose an order that reduces integration uncertainty and makes failures easier to localize. Explain consequential interface, format, migration, and dependency choices; do not promise globally optimal delivery speed or guaranteed correctness from incremental development.

## Document organization

Keep the root compact but substantive: system delivery objective, strategic approach, phase and milestone map, key dependencies, integration and verification gates, and links to focused children. Put independently substantial phase or area detail under `docs/dev/plan/`, with stable semantic names and an explicit scope link from the root. Split by coherent delivery concern, not a file per task. A child refines its parent's strategy without duplicating or contradicting its guarantees.

For a scoped change, `docs/dev/FEATURE-PLAN.md` may define affected phases or milestones, dependency and rollout effects, compatibility or transition work, and exit evidence for the proposed delta. Use it when the change needs a reviewable delivery strategy; do not require it for every correction. Name the main plan decisions it affects, reference unchanged strategy instead of copying it, and use **sdd-integrate-feature** to incorporate accepted final strategy into the main PLAN when requested. Main PLAN and its children read as the intended complete delivery strategy, not a series of amendments. For an active feature workflow, FEATURE-PLAN supplies phase and milestone boundaries and exit checks to FEATURE-TASKS when a scoped delivery plan is needed. TASKS retains the complete project hierarchy until feature tasks are reconciled; existing parents keep their project-wide meaning.

The plan can mention paths only when a path is a fixed project constraint or required external artifact. Defer allocation of source and test paths to `layout.md`; let TASKS derive concrete edit scopes from both. When producing both artifacts, establish strategic boundaries first, assign physical ownership, then recheck that the proposed layout supports the planned increments and integration points.

## Preparation readiness

Before dependent planning, require current SPEC/design QC for the inputs; obtain focused missing assessment through sdd-manage within authorized scope. Finish authoring with the [PLAN/SPEC QC gate](review.md#required-planspec-qc-gate), including delivery counts, semantic scope, corrections/recheck and an adjacent report. TASKS derives only from current reviewed strategy/layout. Do not start TASKS merely because a plan draft is complete.
