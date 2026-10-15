# Spacebar rotation amendment

## Objective and boundary

The human commanded a focused steering amendment adding Space as a rotation control. Space rotates clockwise, matching X, only while the playfield is focused. A fresh press acts once; OS repeats are ignored and page scrolling is prevented. Existing Z/X and lifecycle/typing/button behavior remain supported.

Campaign: 001_8131306. Full baseline: `8131306db5569d2a68e06a766ba6960f7306dc97`. Working branch: `revision/001_8131306-spacebar-rotation`. Established checkpoint/return target: `main`, because P1 has already been integrated and published; no incomplete phase branch is resumed. Record location and branch share the steering identity.

The amendment directly owns SPEC B5/B6, affected preparation QC, input translation, visible controls, README, focused tests and T-008's additional evidence. No feature package, new phase/task, historical report edit or release is selected. T-008 owns the input mapping; retained phase checkboxes/issues are reassessed against the verified amended result, not replayed as new initial completions.

## Work and evidence

A-001: align existing contracts, add test-first coverage, implement the alternate key, verify retained behavior, publish and explicitly integrate the amendment, reconcile hosted evidence and stop. Checks/results and actual integration provenance are added before closure.

## Review and verification

The command extends B5/B6 through the existing semantic cw action. No geometry, collision, scoring, scheduling, resource or lifecycle rule changes. Focus and repeat guards remain in the input adapter, so Space uses the same state legality and error boundaries as X. On-page help and README include the alternate key. The shared browser scenario runs against both development and generated production assets.

Test-first evidence: the focused adapter test failed before the change because Space was not prevented; the Chromium browser scenario failed because the canvas did not rotate. A single input-map entry satisfies the behavior; the existing event path prevents scrolling before suppressing repeats. Final checks passed 43/43 Node tests, strict typecheck/build, 45/45 development and 9/9 production browser scenarios (15 + 3 per engine), zero skips. Actual engines remain Chromium 153.0.8010.0, Firefox 157.0 and WebKit 27.2 with the previously documented local launch settings. After test formatting and the visible-help assertion update, npm test passed 43/43, typecheck passed, and the focused Space scenario passed 3/3 development plus 3/3 production checks across all engines.

Acceptance covers the literal clockwise I-piece pixel, one action per fresh press, no repeat rotation or focused page scroll, paused-state rejection, independent input-field spaces and native Space activation of Resume. Existing X/Z, movement, timing, lifecycle, failure, viewport and distribution checks passed. Direct code/document review found no unrelated change or new core state; B5–B7 conformance rechecks are retained in the adjacent SPEC/PLAN/TASKS QC reports. Existing phase task hierarchy and completed claims remain supported by the amended passing result. T-008's unique GitHub issue #8, phase label and M1.1 native milestone association were read back; the completed issue/milestone state is retained, with supplemental evidence added after publication. No new phase or executable task is projected.

TODO: None. Existing environment limitations remain: packaged Chromium, Firefox's local test content-sandbox setting, WebKit host libraries, modeled rather than native desktop blur/visibility, untested Windows execution and the recorded WebKit injected-pointer limitation. Space native-button behavior passes across all three engines.

## Publication and return boundary

The amendment commit owns implementation, tests, current documents, reassessed task evidence and this report together. Publish/read back the revision branch before explicit two-parent integration into the established main checkpoint, verify the merged state and publish/read back main. Actual opening/source/target tips and merged checks are recorded in the merge summary, with Git graph/remote containment establishing closure. Retain the revision branch and stop without resuming sdd-implement, releasing or selecting further work.

The [inspected control screenshot](spacebar-controls.png) shows the clockwise I after Space, readable SPACE/Rotate clockwise help and retained controls. Actual viewport/document widths are both 800 pixels; vertical scrolling is permitted. Maintained local links, scoped QC hashes, unchanged design/strategy/layout and git diff --check passed. Earlier phase/milestone/campaign records are outside this amendment and unchanged.
