import type { GameChallenge } from "@/lib/games/types";

export const claudeCertifiedArchitectChallenge: GameChallenge = {
  "id": "claude-certified-architect-v1",
  "slug": "claude-certified-architect",
  "title": "Claude Certified Architect Challenge",
  "description": "A native AIByDM architecture challenge for agent loops, Claude Code workflows, MCP tool design, prompt reliability, and context management.",
  "questionCount": 60,
  "estimatedDuration": "20 min",
  "xpReward": 1000,
  "clearThreshold": 4,
  "categories": [
    {
      "id": "agentic-architecture",
      "label": "Agentic Architecture & Orchestration",
      "shortLabel": "Agents",
      "weight": 27
    },
    {
      "id": "tools-mcp",
      "label": "Tool Design & MCP Integration",
      "shortLabel": "Tools & MCP",
      "weight": 18
    },
    {
      "id": "claude-workflows",
      "label": "Claude Code Configuration & Workflows",
      "shortLabel": "Claude Code",
      "weight": 20
    },
    {
      "id": "prompt-structured-output",
      "label": "Prompt Engineering & Structured Output",
      "shortLabel": "Prompting",
      "weight": 20
    },
    {
      "id": "context-reliability",
      "label": "Context Management & Reliability",
      "shortLabel": "Reliability",
      "weight": 15
    }
  ],
  "floors": [
    {
      "id": "floor-01",
      "number": 1,
      "name": "Loop Chamber",
      "categoryId": "agentic-architecture",
      "questionIds": [
        "floor-01-q01",
        "floor-01-q02",
        "floor-01-q03",
        "floor-01-q04",
        "floor-01-q05",
        "floor-01-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-02",
      "number": 2,
      "name": "Coordination Hall",
      "categoryId": "agentic-architecture",
      "questionIds": [
        "floor-02-q01",
        "floor-02-q02",
        "floor-02-q03",
        "floor-02-q04",
        "floor-02-q05",
        "floor-02-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-03",
      "number": 3,
      "name": "Hook Forge",
      "categoryId": "agentic-architecture",
      "questionIds": [
        "floor-03-q01",
        "floor-03-q02",
        "floor-03-q03",
        "floor-03-q04",
        "floor-03-q05",
        "floor-03-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-04",
      "number": 4,
      "name": "Tool Armory",
      "categoryId": "tools-mcp",
      "questionIds": [
        "floor-04-q01",
        "floor-04-q02",
        "floor-04-q03",
        "floor-04-q04",
        "floor-04-q05",
        "floor-04-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-05",
      "number": 5,
      "name": "Configuration Maze",
      "categoryId": "claude-workflows",
      "questionIds": [
        "floor-05-q01",
        "floor-05-q02",
        "floor-05-q03",
        "floor-05-q04",
        "floor-05-q05",
        "floor-05-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-06",
      "number": 6,
      "name": "Pipeline Forge",
      "categoryId": "claude-workflows",
      "questionIds": [
        "floor-06-q01",
        "floor-06-q02",
        "floor-06-q03",
        "floor-06-q04",
        "floor-06-q05",
        "floor-06-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-07",
      "number": 7,
      "name": "Prompt Workshop",
      "categoryId": "prompt-structured-output",
      "questionIds": [
        "floor-07-q01",
        "floor-07-q02",
        "floor-07-q03",
        "floor-07-q04",
        "floor-07-q05",
        "floor-07-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-08",
      "number": 8,
      "name": "Validation Gauntlet",
      "categoryId": "prompt-structured-output",
      "questionIds": [
        "floor-08-q01",
        "floor-08-q02",
        "floor-08-q03",
        "floor-08-q04",
        "floor-08-q05",
        "floor-08-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-09",
      "number": 9,
      "name": "Memory Halls",
      "categoryId": "context-reliability",
      "questionIds": [
        "floor-09-q01",
        "floor-09-q02",
        "floor-09-q03",
        "floor-09-q04",
        "floor-09-q05",
        "floor-09-q06"
      ],
      "clearThreshold": 4
    },
    {
      "id": "floor-10",
      "number": 10,
      "name": "Synthesis Chamber",
      "categoryId": "context-reliability",
      "questionIds": [
        "floor-10-q01",
        "floor-10-q02",
        "floor-10-q03",
        "floor-10-q04",
        "floor-10-q05",
        "floor-10-q06"
      ],
      "clearThreshold": 4
    }
  ],
  "questions": [
    {
      "id": "floor-01-q01",
      "floorId": "floor-01",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A customer support resolution agent's loop decides it is finished by checking whether the assistant's text contains the phrase TASK COMPLETE. In production the agent sometimes exits while a refund lookup is still pending, because the model wrote 'Task complete for step one - now checking refund status' right before emitting a tool_use block. What is the correct fix?",
      "options": [
        "Tighten the system prompt so the model writes TASK COMPLETE only as the final line of its genuinely last message",
        "Switch the completion check to look for an empty content array in the API response",
        "Terminate the loop only on stop_reason end_turn, and route stop_reason tool_use back into tool execution",
        "Add a regex that ignores TASK COMPLETE whenever it appears in the same response as a tool_use block"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "stop_reason is the API's authoritative, machine-readable signal for whether the model is done; assistant prose is probabilistic and responses routinely mix narration with tool_use blocks. The regex patch still leaves termination dependent on phrasing the model is never guaranteed to produce, and the prompt-tightening fix is best-effort for the same reason, so both paper over the root cause instead of fixing it.",
      "hint": "The API already provides a machine-readable signal for whether the model is done - do not infer completion from language.",
      "difficulty": "core",
      "tags": [
        "stop_reason",
        "loop-termination"
      ],
      "objectives": [
        "Apply stop_reason in a production architecture decision.",
        "Apply loop termination in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-01-q02",
      "floorId": "floor-01",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A fintech document-extraction service runs an agentic loop against the Claude API. After executing a lookup_exchange_rate tool, the developer appends a user message containing the tool_result and calls the API again - and the request fails with a 400 error saying the tool_result references an unknown tool_use id. What is wrong?",
      "options": [
        "The assistant message containing the tool_use block was never appended to history, so the tool_result has no preceding call to match against",
        "The tool_result block must be wrapped in an assistant-role message rather than a user-role message for the id matching to work",
        "The follow-up request must set tool_choice to any so the API can correlate the returned result with the originating call",
        "The tool_result content must be stringified JSON, because structured content blocks cannot be matched against a tool_use id"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Every tool_result must reference a tool_use block in the immediately preceding assistant message, so the loop has to append the full assistant response (including its tool_use blocks) and then a user message carrying the tool_result before resending the complete history. The assistant-role distractor inverts the protocol - tool_results belong in user messages because tool output is input you provide - and tool_choice and content formatting have nothing to do with id matching.",
      "hint": "A tool_result can only be matched against a tool_use block that actually exists in the history you send back.",
      "difficulty": "core",
      "tags": [
        "history-management",
        "tool_result"
      ],
      "objectives": [
        "Apply history management in a production architecture decision.",
        "Apply tool_result in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-01-q03",
      "floorId": "floor-01",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A platform team's deployment agent decides whether to execute a tool with the check: if response.content[0].type == 'tool_use'. It worked in testing, but in production the agent frequently ends with half-finished commentary like 'Let me check the rollout status first' and never runs the tool. Why?",
      "options": [
        "tool_use blocks are only emitted when tool_choice is set to any, so the default auto setting suppresses them in production traffic",
        "The model often emits a text block before the tool_use block, so checking only index zero misses the call; branch on stop_reason and scan every content block",
        "The streaming API reorders content blocks nondeterministically, so the agent must disable streaming to restore positional checks",
        "The model is hitting max_tokens before reaching the tool_use block, so raising max_tokens will fix the behavior"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "A single response can contain both text and tool_use blocks, and the narrative text frequently comes first, so a content[0] check silently drops tool calls. The robust pattern is to branch on stop_reason tool_use and iterate over all content blocks to collect every tool_use. A max_tokens truncation would surface as stop_reason max_tokens, not as this position-dependent miss, and tool_choice auto does not suppress tool calls.",
      "hint": "Think about what else can occupy the first slot of the content array alongside a tool call.",
      "difficulty": "core",
      "tags": [
        "content-blocks",
        "stop_reason"
      ],
      "objectives": [
        "Apply content blocks in a production architecture decision.",
        "Apply stop_reason in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-01-q04",
      "floorId": "floor-01",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A structured-extraction pipeline pulls clause data from 80-page legal contracts. The loop's logic is: if stop_reason is tool_use, run tools; otherwise treat the response as the final answer. QA reports that roughly 5% of outputs are valid-looking JSON that simply ends mid-field. What is the root cause?",
      "options": [
        "The model is hallucinating malformed JSON under load, so the pipeline needs a retry pass at temperature 0",
        "The extraction schema is missing required fields, so the model improvises structure and stops generating early",
        "The loop drops trailing content blocks whenever a response contains both text and tool_use together",
        "The loop treats stop_reason max_tokens as completion; it must detect truncation and request a continuation"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "stop_reason max_tokens means the response was cut off at the token ceiling, not finished, and any branch that lumps everything other than tool_use together with end_turn will silently accept truncated output. Retrying at temperature 0 regenerates the same truncated result because the cause is the token limit, not randomness, and schema gaps would produce wrong structure, not output that stops mid-field.",
      "hint": "There are more stop_reason values than just tool_use and end_turn - one of them means the model was cut off.",
      "difficulty": "core",
      "tags": [
        "max_tokens",
        "stop_reason"
      ],
      "objectives": [
        "Apply max_tokens in a production architecture decision.",
        "Apply stop_reason in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-01-q05",
      "floorId": "floor-01",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "After a runaway agent burned $400 in API calls overnight, an e-commerce team's incident review proposes capping the order-management agent at 3 loop iterations as the primary termination mechanism. A week later, 30% of legitimate multi-step tasks (check inventory, apply discount, create shipment) fail half-finished. What should the architecture look like?",
      "options": [
        "Keep the cap at 3 but prompt the model to plan ahead so every task finishes within three tool calls",
        "Let stop_reason end_turn drive termination, investigate why the runaway loop never reached it, and keep a generous iteration cap only as a safety fallback",
        "Raise the cap to exactly the longest observed legitimate task length, currently measured at 6 iterations",
        "Replace the loop with a fixed three-step pipeline so the iteration count becomes fully deterministic"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Iteration caps are safety fallbacks against pathological loops, never the primary control; genuine completion is signaled by stop_reason end_turn. Tuning the cap to the longest observed task just moves the failure boundary - any task one step longer still truncates - and neither tuned cap explains or fixes whatever caused the original runaway. A fixed pipeline throws away the adaptive sequencing the order workflows need.",
      "hint": "Ask what mechanism should normally end the loop, and what role a hard cap is actually meant to play.",
      "difficulty": "core",
      "tags": [
        "iteration-caps",
        "loop-termination"
      ],
      "objectives": [
        "Apply iteration caps in a production architecture decision.",
        "Apply loop termination in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-01-q06",
      "floorId": "floor-01",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A market-research agent asks Claude to compare three competitors, and the response comes back with stop_reason tool_use containing three web_search tool_use blocks. The developer's loop executes only the first tool_use block, appends a single tool_result, and resends the history. The API rejects the request. Why?",
      "options": [
        "Every tool_use block in the response must be executed, and the next user message must carry a tool_result for each of them",
        "Parallel tool calls require a separate API request per tool_use block, replayed back one at a time in order",
        "Search tools cannot be parallelized, so the agent must force sequential calls by setting tool_choice on each turn",
        "The text block preceding the tool calls must be stripped from history before any tool_results can be appended"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Claude requests parallel work by emitting multiple tool_use blocks in a single response, and the following user message must include a matching tool_result for every tool_use id. Answering only one leaves unmatched tool calls, which the API rejects. There is no one-call-per-request replay protocol - all results return together in the next user message - and assistant text blocks stay in history untouched.",
      "hint": "Count how many tool calls the model made versus how many answers you sent back.",
      "difficulty": "core",
      "tags": [
        "parallel-tools",
        "tool_result"
      ],
      "objectives": [
        "Apply parallel tools in a production architecture decision.",
        "Apply tool_result in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-02-q01",
      "floorId": "floor-02",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A customer support coordinator agent has already looked up the customer's account ID, plan tier, and the disputed invoice number through earlier tool calls. It then spawns a billing-investigator subagent with the Task prompt 'Investigate why this customer was double-charged.' The subagent responds that it cannot proceed without knowing which customer or invoice is involved. What is the root cause?",
      "options": [
        "The billing-investigator is running on Haiku, which cannot retain account details; switch its model to Opus",
        "Project CLAUDE.md was never set up, so subagents load no memory at startup; create one containing the account details",
        "Subagents start with isolated context; the coordinator must pack the account ID, plan tier, and invoice number directly into the Task prompt",
        "Subagents need a shared-memory flag enabled in settings.json before they can read the coordinator's conversation history"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Subagents do not inherit the coordinator's conversation - each starts with an isolated context, so any fact the subagent needs must be explicitly written into its task prompt. Packing the account ID, tier, and invoice number into the Task prompt fixes the root cause. CLAUDE.md is version-controlled project memory for stable standards, not a channel for per-ticket runtime facts, and no shared-memory flag exists in settings.json.",
      "hint": "Consider what a freshly spawned subagent can and cannot see of its parent's conversation.",
      "difficulty": "core",
      "tags": [
        "context-isolation",
        "context-packing"
      ],
      "objectives": [
        "Apply context isolation in a production architecture decision.",
        "Apply context packing in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-02-q02",
      "floorId": "floor-02",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A multi-agent research system must profile 8 competitors, and each profile is independent of the others. Today the coordinator spawns one research subagent, waits for its report, then spawns the next, taking 25 minutes end to end. What change makes the subagents run concurrently?",
      "options": [
        "Have the coordinator emit all 8 Task tool calls as multiple tool_use blocks in a single response",
        "Set CLAUDE_PARALLEL=8 in the environment so the runtime fans out Task calls automatically",
        "Submit the 8 profiles as a Message Batches job so they process simultaneously",
        "Add 'work on all competitors at the same time' to the coordinator's system prompt"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Parallel subagents are spawned by issuing multiple Task tool calls in one assistant response - each tool_use block launches a subagent that runs concurrently. CLAUDE_PARALLEL is not a real setting, and the Batch API trades latency for cost with results within 24 hours, so it cannot speed up a pipeline whose problem is wall-clock time. A prompt instruction is probabilistic best-effort; the actual mechanism is emitting the Task calls together in one turn, and only that guarantees concurrency.",
      "hint": "Recall how a single assistant turn can contain more than one tool invocation.",
      "difficulty": "core",
      "tags": [
        "parallel-tasks",
        "task-tool"
      ],
      "objectives": [
        "Apply parallel tasks in a production architecture decision.",
        "Apply task tool in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-02-q03",
      "floorId": "floor-02",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A nightly CI job runs claude -p 'Audit every changed package for license violations' --allowedTools 'Read,Grep,Glob,Bash'. The prompt tells the coordinator to delegate each package to a subagent, but it never spawns any - it scans everything itself and exhausts its context window on large diffs. What is wrong?",
      "options": [
        "Headless print mode cannot spawn subagents; the audit must run in an interactive session",
        "The Task tool is missing from allowedTools, so the coordinator has no way to spawn subagents; add Task to the list",
        "The prompt needs firmer wording such as 'you MUST delegate every package to a subagent'",
        "Subagent support in CI requires exporting CLAUDE_SUBAGENTS=true before invoking claude -p"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Spawning subagents happens through the Task tool, so Task must appear in allowedTools like any other tool; without it the coordinator can only do the work inline. Headless mode supports subagents fine, and CLAUDE_SUBAGENTS is not a real variable. Stronger prompt wording cannot grant a capability the tool allowlist has removed.",
      "hint": "Delegation itself happens through a tool, and tools must be permitted.",
      "difficulty": "core",
      "tags": [
        "allowedTools",
        "headless"
      ],
      "objectives": [
        "Apply allowedTools in a production architecture decision.",
        "Apply headless in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-02-q04",
      "floorId": "floor-02",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "An architect spent 30 minutes in a Claude Code session reading 40 files of a monorepo and building a verified mental model of its service boundaries. She now wants to explore three mutually exclusive migration strategies, each requiring long follow-up investigation that would contaminate the others' reasoning. What is the most efficient setup?",
      "options": [
        "Explore the three strategies sequentially in the same session, running /compact between each one",
        "Spawn three Task subagents from the current session, one per strategy",
        "Paste a hand-written summary of the findings into three fresh sessions, one per strategy",
        "Use fork_session to branch three sessions from the current one, so each strategy starts from the same loaded baseline"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "fork_session exists exactly for this: it branches new sessions from a shared baseline, so all three explorations start with the full 40-file understanding and none pollutes the others. Task subagents start with isolated, empty context, so the accumulated understanding would have to be repacked into each prompt and would arrive lossy. Sequential exploration with /compact lets earlier strategies bias later ones, and hand-written summaries lose fidelity.",
      "hint": "One mechanism duplicates an existing session's accumulated context; delegation does not.",
      "difficulty": "core",
      "tags": [
        "fork_session",
        "branching"
      ],
      "objectives": [
        "Apply fork_session in a production architecture decision.",
        "Apply branching in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-02-q05",
      "floorId": "floor-02",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A security-review coordinator audits a payments service by spawning three subagents: SQL injection in /api/orders, XSS in /web/templates, and hardcoded secrets in /config. Two weeks after release, an SSRF vulnerability is exploited in /api/webhooks - a directory no subagent was ever assigned. What was the architectural failure?",
      "options": [
        "The decomposition left coverage gaps; the coordinator should partition the full scope so every directory and vulnerability class has an owner",
        "The subagents ran on Haiku, which is too weak to detect SSRF; the scouts should run on Opus",
        "The SSRF-focused subagent failed silently; add retry logic so transient subagent failures are re-run",
        "Each subagent prompt should have ended with 'also flag anything else suspicious you happen to notice'"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Overly narrow decomposition is a known multi-agent pitfall: anything outside the assigned slices is simply never examined. The fix is to partition the entire scope - directories and vulnerability classes - so the union of subagent assignments covers everything. No SSRF agent existed to retry, and a vague 'anything else' suffix is a probabilistic patch that never guarantees /api/webhooks gets read.",
      "hint": "Ask whether the union of the assigned slices actually equals the whole scope.",
      "difficulty": "core",
      "tags": [
        "decomposition",
        "coverage-gaps"
      ],
      "objectives": [
        "Apply decomposition in a production architecture decision.",
        "Apply coverage gaps in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-02-q06",
      "floorId": "floor-02",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A market-intelligence coordinator spawns four research subagents scoped as 'pricing trends', 'market trends', 'industry trends', and 'competitor pricing'. The synthesized report repeats the same three statistics four times, and token spend is roughly quadruple a single-agent baseline. What should the architect change?",
      "options": [
        "Add a deduplication pass in the synthesizer that strips repeated claims before writing the report",
        "Redefine the subagent scopes as non-overlapping partitions of the research space before delegating",
        "Instruct each subagent to skip any topic the other three subagents are already covering",
        "Raise the scouts' temperature so the four agents are less likely to converge on identical findings"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Overlapping scopes are a decomposition pitfall: the four assignments describe nearly the same territory, so duplicated work and token spend are baked in before any agent runs. Partitioning the scope into mutually exclusive slices fixes the root cause. A synthesizer dedup pass hides the symptom while still paying for the redundant research, sampling settings cannot change what territory each agent was assigned, and subagents cannot 'skip what others cover' because their contexts are isolated from one another.",
      "hint": "Look at the four scope definitions themselves rather than at what happens downstream.",
      "difficulty": "core",
      "tags": [
        "decomposition",
        "overlap"
      ],
      "objectives": [
        "Apply decomposition in a production architecture decision.",
        "Apply overlap in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-03-q01",
      "floorId": "floor-03",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A fintech support agent has a process_refund tool. The system prompt states refunds above $200 require manager approval, yet logs show the agent issued a $480 refund last week after a persuasive customer message. Compliance now requires that over-cap refunds can never execute. What should the architect implement?",
      "options": [
        "A PreToolUse hook on process_refund that checks the amount and exits with code 2 when it exceeds $200, writing the violation to stderr",
        "A refund policy moved to the very top of the system prompt and repeated in CLAUDE.md so the model cannot miss it",
        "A second model pass that reviews every pending refund and approves or rejects it before execution",
        "A temperature of 0 on the support agent so it follows the refund policy more consistently"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Critical business rules like refund caps belong in hooks because hooks are deterministic code that guarantees enforcement, while prompt instructions are probabilistic best-effort. Exit code 2 blocks the tool call and the stderr message is fed back to the model so it can adapt. The second-model reviewer is the strongest distractor, but it is still a probabilistic component and cannot guarantee zero violations, and temperature 0 changes sampling, not whether the model can be persuaded.",
      "hint": "Think about which mechanism is deterministic rather than probabilistic when a business rule must never be violated.",
      "difficulty": "core",
      "tags": [
        "hooks",
        "refund-cap",
        "pretooluse"
      ],
      "objectives": [
        "Apply hooks in a production architecture decision.",
        "Apply refund cap in a production architecture decision.",
        "Apply pretooluse in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-03-q02",
      "floorId": "floor-03",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A platform team wrote a PreToolUse hook to stop Claude Code from editing files under infra/prod/. The script correctly detects the protected path, prints 'Edit blocked: protected production path' to stdout, and exits with code 0. In testing, the edits still go through and the agent never acknowledges any block. What is wrong?",
      "options": [
        "PreToolUse hooks cannot block tool calls; the rule must instead be a deny entry in settings.json permissions",
        "The hook needs to return hookSpecificOutput.additionalContext containing the block decision",
        "The hook must exit with code 2 to block the call, and write the explanation to stderr so it is fed back to the model",
        "The hook fires too early to see the file path; the protection must move to a PostToolUse hook"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "For PreToolUse hooks, a zero exit code allows the tool call to proceed; exit code 2 is what blocks the call, and stderr (not stdout) is the channel fed back to the model explaining why. The first option is false because gating tool calls before they run is exactly what PreToolUse exists for. additionalContext injects information but does not block anything, and PreToolUse receives the full tool input including the file path, so it does not fire too early.",
      "hint": "Recall which exit code blocks a tool call and which output stream gets fed back to the model.",
      "difficulty": "core",
      "tags": [
        "hooks",
        "exit-code-2",
        "pretooluse"
      ],
      "objectives": [
        "Apply hooks in a production architecture decision.",
        "Apply exit code 2 in a production architecture decision.",
        "Apply pretooluse in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-03-q03",
      "floorId": "floor-03",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A customer support agent calls a get_customer CRM tool that returns 40 fields per record, including marketing flags and audit metadata. After 15 lookups in a long session, context is bloated and the agent starts missing the three fields it actually uses: plan tier, billing status, and open tickets. What is the best fix?",
      "options": [
        "Instruct the agent in the system prompt to ignore the irrelevant CRM fields when reading tool results",
        "Add a PostToolUse hook on get_customer that trims each result down to the handful of fields the agent needs",
        "Switch to a model with a larger context window so the full 40-field records fit comfortably",
        "Run /compact after every few lookups to summarize the accumulated CRM payloads"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Verbose tool outputs should be trimmed deterministically at the source, and PostToolUse is the hook designed to normalize and reduce tool results before they enter context. A larger context window still leaves 37 useless fields per record diluting attention, so lost-in-the-middle misses persist. Prompting the model to ignore fields is probabilistic and the tokens still consume context either way, and /compact is reactive and lossy: it lets the bloat accumulate first and its summarization can blur the exact field values the agent needs.",
      "hint": "Verbose tool outputs are best handled deterministically at the moment they are produced, not by the model afterward.",
      "difficulty": "core",
      "tags": [
        "hooks",
        "posttooluse",
        "context-trimming"
      ],
      "objectives": [
        "Apply hooks in a production architecture decision.",
        "Apply posttooluse in a production architecture decision.",
        "Apply context trimming in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-03-q04",
      "floorId": "floor-03",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A healthcare intake agent writes visit summaries to a shared log through a write_log tool. CLAUDE.md instructs it to redact Social Security numbers first, and audits show it complies about 98% of the time. The compliance team requires zero SSNs in the logs, full stop. Which approach satisfies the requirement?",
      "options": [
        "Add few-shot examples of correctly redacted summaries to the system prompt",
        "Repeat the redaction rule in both the system prompt and CLAUDE.md and label it as mandatory",
        "Have a reviewer subagent check each summary for SSNs before it is logged",
        "Add a hook that scans write_log input and deterministically redacts or blocks any SSN pattern before the write runs"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "A 98% compliance rate is the signature of a probabilistic mechanism, and no amount of prompt reinforcement turns best-effort into a guarantee. PII redaction is a critical business rule, so it belongs in deterministic hook code that pattern-matches and rewrites or blocks the call every single time. The reviewer subagent is the strongest distractor, but it is another model and therefore still probabilistic; it can miss an SSN just as the original agent does.",
      "hint": "A 98% compliance rate is the fingerprint of a probabilistic mechanism.",
      "difficulty": "core",
      "tags": [
        "hooks",
        "deterministic-vs-probabilistic",
        "pii"
      ],
      "objectives": [
        "Apply hooks in a production architecture decision.",
        "Apply deterministic vs probabilistic in a production architecture decision.",
        "Apply pii in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-03-q05",
      "floorId": "floor-03",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "In a monorepo CI assistant, a run_coverage tool returns raw percentages per package. Reviewers notice the agent keeps flagging packages/legacy-billing for missing the 80% bar even though that package is formally exempt until Q3. The exemption list lives in a YAML file that changes as exemptions are granted and expire, and the agent rarely reads it. How should the team ensure coverage results are interpreted correctly every time?",
      "options": [
        "Add a PostToolUse hook on run_coverage that reads the exemption YAML and injects current exemptions via hookSpecificOutput.additionalContext",
        "Copy the exemption list into CLAUDE.md so it loads automatically at session start",
        "Rename the tool to run_coverage_with_exemptions so the agent knows exemptions exist",
        "Add a prompt instruction telling the agent to call a second tool to fetch exemptions after every coverage run"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "hookSpecificOutput.additionalContext lets a PostToolUse hook attach fresh interpretive context at the exact moment the tool result returns, so the model always sees the current exemptions alongside the numbers. CLAUDE.md is the strongest distractor, but it is a static copy that drifts from the changing YAML and can be lost mid-context in long sessions. The prompt-enforced second tool call is probabilistic and is exactly the behavior the agent is already failing to perform, and renaming the tool conveys nothing about which packages are exempt.",
      "hint": "Consider which mechanism can attach fresh interpretive context at the exact moment a tool result returns.",
      "difficulty": "core",
      "tags": [
        "hooks",
        "additionalContext",
        "posttooluse"
      ],
      "objectives": [
        "Apply hooks in a production architecture decision.",
        "Apply additionalContext in a production architecture decision.",
        "Apply posttooluse in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-03-q06",
      "floorId": "floor-03",
      "categoryId": "agentic-architecture",
      "kind": "agent",
      "prompt": "A developer-productivity team distributes Claude Code skills from a central repo. A bootstrap script syncs new skill folders into .claude/skills when a session opens, but engineers report that skills added that morning never auto-invoke until they manually intervene, because the skill scan happens before the sync finishes. The team wants newly synced skills available automatically in every fresh session. What should they configure?",
      "options": [
        "A UserPromptSubmit hook that runs the sync script before each prompt is processed",
        "A note in CLAUDE.md telling engineers to run /reload-skills as their first command in every session",
        "A SessionStart hook that runs the sync and returns reloadSkills so the skill scan picks up the new files",
        "A PostToolUse hook on Bash that triggers whenever the sync script appears in a command"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "SessionStart hooks run when the session opens and can return reloadSkills, which makes the harness rescan the skills directory after the sync completes, solving the ordering problem deterministically. Asking engineers to run /reload-skills works mechanically but depends on every human remembering every time, which is best-effort. Re-syncing on every UserPromptSubmit is wasteful and does not itself trigger a skill rescan, so freshly synced skills still would not auto-invoke.",
      "hint": "One hook event runs at session open and can ask the harness to rescan skills.",
      "difficulty": "core",
      "tags": [
        "hooks",
        "session-start",
        "skills"
      ],
      "objectives": [
        "Apply hooks in a production architecture decision.",
        "Apply session start in a production architecture decision.",
        "Apply skills in a production architecture decision."
      ],
      "references": [
        {
          "label": "Agent loop lessons",
          "href": "/learn/ai-from-scratch/phases/14-agent-engineering"
        }
      ]
    },
    {
      "id": "floor-04-q01",
      "floorId": "floor-04",
      "categoryId": "tools-mcp",
      "kind": "mcp",
      "prompt": "A travel-booking support agent exposes search_bookings, described as \"Look up customer records,\" and search_refund_requests, described as \"Look up customer requests.\" In 14% of billing conversations the agent calls search_bookings when it actually needs refund status. What is the most effective fix?",
      "options": [
        "Add a keyword-based pre-classifier that picks the right tool before the model sees the conversation",
        "Add a system prompt rule: for any message that mentions refunds, always call search_refund_requests",
        "Rewrite each description to state the tool's purpose, input format, and when to use it instead of its sibling",
        "Force tool_choice to search_refund_requests whenever the conversation is tagged as a billing issue"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Tool descriptions are the model's primary selection mechanism, and these two are near-identical, so the model has no signal to distinguish them. Differentiating the descriptions fixes the root cause for every conversation type. A pre-classifier or forced tool_choice patches around the symptom and breaks on mixed-intent conversations, and keyword prompt rules are brittle.",
      "hint": "Ask what information the model actually reads when it decides between two sibling tools.",
      "difficulty": "core",
      "tags": [
        "tool-descriptions"
      ],
      "objectives": [
        "Apply tool descriptions in a production architecture decision."
      ],
      "references": [
        {
          "label": "Tools and protocols",
          "href": "/learn/ai-from-scratch/phases/13-tools-and-protocols"
        }
      ]
    },
    {
      "id": "floor-04-q02",
      "floorId": "floor-04",
      "categoryId": "tools-mcp",
      "kind": "mcp",
      "prompt": "An e-commerce assistant has accumulated 18 tools spanning catalog search, inventory, refunds, shipping, and loyalty promotions. After the last batch of tools shipped, wrong-tool calls climbed from 3% to 19% of sessions. What should the architect do?",
      "options": [
        "Split the assistant into focused roles, each agent exposing only the 4-5 tools its job requires",
        "Expand every tool description with full parameter documentation so the model can disambiguate all 18",
        "Add a system prompt table that maps each customer intent to the tool that should handle it",
        "Switch the assistant to a larger model that can keep track of more tools at once"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Selection accuracy degrades once an agent carries roughly 15 or more tools; the canonical design is 4-5 focused tools per role. Splitting into role-scoped agents shrinks each decision space and fixes the root cause. Longer descriptions and intent tables add context without reducing the number of candidates the model must weigh on every turn, and a larger model does not change the crowded decision space.",
      "hint": "Think about how many tools one agent role should carry before selection quality drops.",
      "difficulty": "core",
      "tags": [
        "tool-count",
        "multi-agent"
      ],
      "objectives": [
        "Apply tool count in a production architecture decision.",
        "Apply multi agent in a production architecture decision."
      ],
      "references": [
        {
          "label": "Tools and protocols",
          "href": "/learn/ai-from-scratch/phases/13-tools-and-protocols"
        }
      ]
    },
    {
      "id": "floor-04-q03",
      "floorId": "floor-04",
      "categoryId": "tools-mcp",
      "kind": "mcp",
      "prompt": "A refund-processing subagent in a support system shares a tool registry that includes adjust_loyalty_points and send_marketing_email. Despite a system prompt line saying \"NEVER use marketing tools,\" the subagent sends a promotional email in about 2% of sessions. What is the right fix?",
      "options": [
        "Repeat the prohibition at the top and bottom of the system prompt with stronger wording",
        "Remove the marketing tools from the refund subagent's tool list entirely",
        "Add a PreToolUse hook that blocks send_marketing_email and returns an error to the model",
        "Lower the sampling temperature so the model follows the written prohibition more consistently"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "The governing rule is to remove cross-role tools rather than prompt against their use: a tool with no legitimate purpose for this role should not be visible at all. Removal eliminates the failure class deterministically and shrinks the selection space. The hook is the strongest distractor, but hooks guard tools that must remain available for legitimate uses; here the tool has no legitimate use, so a hook would just bounce calls the agent should never be able to attempt while still cluttering selection.",
      "hint": "If a tool has no legitimate use for this role, ask whether it should be in the agent's view at all.",
      "difficulty": "core",
      "tags": [
        "tool-scoping",
        "cross-role-tools"
      ],
      "objectives": [
        "Apply tool scoping in a production architecture decision.",
        "Apply cross role tools in a production architecture decision."
      ],
      "references": [
        {
          "label": "Tools and protocols",
          "href": "/learn/ai-from-scratch/phases/13-tools-and-protocols"
        }
      ]
    },
    {
      "id": "floor-04-q04",
      "floorId": "floor-04",
      "categoryId": "tools-mcp",
      "kind": "mcp",
      "prompt": "A fintech extraction agent's query_transactions tool returns the string \"Operation failed\" whenever the data warehouse times out. The model retries the identical query four times, burns its remaining turns, and gives up without producing output. How should the tool be redesigned?",
      "options": [
        "Cap the agentic loop at three iterations so failed retries terminate the run quickly",
        "Add a system prompt instruction telling the model to vary its query whenever any tool fails",
        "Catch the timeout in the tool and raise an exception so the loop ends and a human is paged",
        "Return a structured error with errorCategory timeout, an isRetryable flag, the attempted query, and any partial results"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "A bare \"Operation failed\" gives the model nothing to reason with, so it repeats the same call. A structured error stating the category, retryability, the query attempted, and partial results lets the model choose an informed next action. Iteration caps are safety fallbacks, not a primary control, paging a human on every transient timeout abandons recoverable work, and a generic prompt instruction cannot tell the model whether this specific failure is worth retrying.",
      "hint": "A tool error should hand the model enough information to choose its next move.",
      "difficulty": "core",
      "tags": [
        "structured-errors"
      ],
      "objectives": [
        "Apply structured errors in a production architecture decision."
      ],
      "references": [
        {
          "label": "Tools and protocols",
          "href": "/learn/ai-from-scratch/phases/13-tools-and-protocols"
        }
      ]
    },
    {
      "id": "floor-04-q05",
      "floorId": "floor-04",
      "categoryId": "tools-mcp",
      "kind": "mcp",
      "prompt": "A hardware support bot's lookup_warranty tool returns {\"error\": \"No records found\"} when a serial number has no active warranty. The agent treats this as a tool failure, apologizes, and escalates - and 30% of the human queue is now just out-of-warranty devices. What should change?",
      "options": [
        "Return a successful response with an empty results array, because zero matches is a valid answer rather than a failure",
        "Add a prompt note explaining that the \"No records found\" error actually means the device has no warranty",
        "Mark the error response as isRetryable false so the model stops escalating after the first attempt",
        "Have the tool return the closest matching serial number so the model always gets a record back"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "An empty result set is a successful query with zero matches, not an error; encoding it as an error makes the model conclude the tool broke. Returning success with an empty array lets the agent state confidently that no warranty exists. The prompt-note distractor leaves the broken contract in place and asks the model to reinterpret it probabilistically, the isRetryable flag still encodes a valid answer as a failure so the model keeps escalating, and returning a near-match invites fabricated answers about the wrong device.",
      "hint": "Decide whether zero matches is a failure of the tool or an answer from it.",
      "difficulty": "core",
      "tags": [
        "empty-results",
        "structured-errors"
      ],
      "objectives": [
        "Apply empty results in a production architecture decision.",
        "Apply structured errors in a production architecture decision."
      ],
      "references": [
        {
          "label": "Tools and protocols",
          "href": "/learn/ai-from-scratch/phases/13-tools-and-protocols"
        }
      ]
    },
    {
      "id": "floor-04-q06",
      "floorId": "floor-04",
      "categoryId": "tools-mcp",
      "kind": "mcp",
      "prompt": "An insurance claims extraction pipeline must begin every conversation by calling fetch_claim_document, and on multi-page claims the agent later needs fetch_supporting_exhibits before emitting the final extraction. The team set tool_choice to {\"type\": \"tool\", \"name\": \"fetch_claim_document\"} on every request, and now the agent fetches the same document repeatedly and never finishes. What is the fix?",
      "options": [
        "Switch every request to tool_choice \"any\" so the model can choose freely among all the tools",
        "Keep the forced setting but add a prompt instruction telling the model to fetch each document only once",
        "Force the tool on the first request only, then send all follow-up requests with tool_choice \"auto\"",
        "Switch to tool_choice \"none\" after the first call so the model is pushed straight to the extraction"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Forcing a specific tool applies to every turn it is sent on, so the model can never do anything except call fetch_claim_document. The force-then-relax pattern guarantees the required first call and then returns control to the model under auto. The \"any\" distractor still mandates some tool call on every turn, so the model can never finish with a final response, and \"none\" on all follow-ups would block the legitimate fetch_supporting_exhibits calls multi-page claims require.",
      "hint": "A forced tool constrains every turn it applies to - figure out which turn actually needs the constraint.",
      "difficulty": "core",
      "tags": [
        "tool_choice",
        "force-then-relax"
      ],
      "objectives": [
        "Apply tool_choice in a production architecture decision.",
        "Apply force then relax in a production architecture decision."
      ],
      "references": [
        {
          "label": "Tools and protocols",
          "href": "/learn/ai-from-scratch/phases/13-tools-and-protocols"
        }
      ]
    },
    {
      "id": "floor-05-q01",
      "floorId": "floor-05",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A fintech payments team of 12 engineers shares one repository. The tech lead wrote the team's TypeScript strict-mode and ledger error-handling standards into ~/.claude/CLAUDE.md on her laptop. Two new hires consistently generate code that violates these standards, and nobody can figure out why the rules are not being applied. What is the correct fix?",
      "options": [
        "Have every engineer copy the standards file into their own ~/.claude/CLAUDE.md",
        "Commit the standards to the project-level CLAUDE.md in the repository root",
        "Store the standards as environment entries in .claude/settings.json so they apply repo-wide",
        "Package the standards as a skill so Claude auto-invokes them whenever someone writes code"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "User-level ~/.claude/CLAUDE.md is personal memory that lives only on one machine, so teammates never load it. Team standards belong in the version-controlled project CLAUDE.md, which every clone picks up automatically. Copying files per engineer reintroduces drift; settings.json holds permissions, hooks, and env rather than coding guidance; and a skill triggers probabilistically per task, while always-relevant standards must be reliably present in memory.",
      "hint": "Consider which level of the CLAUDE.md hierarchy travels with the repository rather than with one person's machine.",
      "difficulty": "core",
      "tags": [
        "claude-md",
        "config-hierarchy"
      ],
      "objectives": [
        "Apply claude md in a production architecture decision.",
        "Apply config hierarchy in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-05-q02",
      "floorId": "floor-05",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A SaaS monorepo has packages/api built on Fastify and packages/dashboard built on React. The root CLAUDE.md documents both sets of conventions, and engineers report Claude applying React component patterns while editing API route handlers. Which change best fixes the misapplied conventions?",
      "options": [
        "Place a directory-level CLAUDE.md inside each package containing only that package's conventions",
        "Expand the root CLAUDE.md with conditional prose such as: when working in packages/api, ignore the React sections",
        "Split the monorepo into two repositories so each codebase gets its own dedicated CLAUDE.md",
        "Create one skill per package and tell engineers to invoke the matching one before editing"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Directory-level CLAUDE.md files scope guidance to the subtree where work is happening, so each package loads only its own conventions. Conditional prose in one big file is probabilistic - the model must remember to filter, which is exactly what is failing here. Splitting the repo is a drastic structural change to solve a configuration problem, and per-package skills depend on engineers remembering to invoke the right one before every edit.",
      "hint": "The CLAUDE.md hierarchy has a level designed for subtree-specific guidance.",
      "difficulty": "core",
      "tags": [
        "claude-md",
        "monorepo"
      ],
      "objectives": [
        "Apply claude md in a production architecture decision.",
        "Apply monorepo in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-05-q03",
      "floorId": "floor-05",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A customer-support team ships a skill that drafts refund-decision emails. Compliance requires that this skill never execute shell commands. The SKILL.md body states Never use Bash in bold, yet audit logs from last week show two sessions where the skill ran Bash anyway. What is the root-cause fix?",
      "options": [
        "Repeat the prohibition in all caps at both the top and bottom of the skill body",
        "Declare allowed-tools in the SKILL.md frontmatter listing only the tools the skill needs",
        "Add a project-wide PreToolUse hook that blocks every Bash invocation in the repository",
        "Lower the sampling temperature so the model follows the skill's instructions more reliably"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Instructions in a skill body are probabilistic; allowed-tools in the frontmatter is a deterministic restriction the harness enforces, scoped exactly to this skill. The project-wide hook is also deterministic but overbroad - it breaks every other workflow that legitimately needs Bash. Stronger wording and temperature tweaks leave compliance to chance.",
      "hint": "Look for the deterministic enforcement mechanism whose scope matches the thing being restricted.",
      "difficulty": "core",
      "tags": [
        "skills",
        "allowed-tools"
      ],
      "objectives": [
        "Apply skills in a production architecture decision.",
        "Apply allowed tools in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-05-q04",
      "floorId": "floor-05",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A platform team maintains 60 lines of secure-coding standards used by 14 service packages in a monorepo. Each package's CLAUDE.md currently holds a pasted copy. After the standards changed last sprint, an audit found 9 of the 14 copies were stale. How should the team restructure this?",
      "options": [
        "Add a sync script engineers are expected to run that re-copies the standards into all 14 CLAUDE.md files",
        "Move the standards into each engineer's ~/.claude/CLAUDE.md and announce updates in Slack",
        "Merge all 14 package files into a single large root CLAUDE.md so there is only one copy",
        "Keep one canonical standards file and reference it from each package CLAUDE.md via @import"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "@import composes memory files, so 14 packages can share one canonical source that updates everywhere at once with no duplication. A sync script keeps 14 duplicates on disk and depends on every engineer remembering to run it - the same human-discipline failure that produced the stale copies. User-level placement loses version control and team sharing, and one giant root file forces every session to carry all 14 packages' content.",
      "hint": "There is a composition mechanism that lets many CLAUDE.md files share a single source of truth.",
      "difficulty": "core",
      "tags": [
        "import",
        "monorepo"
      ],
      "objectives": [
        "Apply import in a production architecture decision.",
        "Apply monorepo in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-05-q05",
      "floorId": "floor-05",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "In a repository of GitHub Actions pipelines, Claude has stopped following the YAML formatting conventions that should come from a directory-level CLAUDE.md inside .github/workflows. Before changing any configuration, the engineer wants to confirm whether that file is actually being loaded. What is the right first step?",
      "options": [
        "Restart the session and repeat the request to see whether the behavior changes",
        "Paste the conventions directly into the chat so the current task can proceed",
        "Run /reload-skills to force the session to rescan its configuration tree",
        "Run /memory to inspect exactly which memory files the session has loaded"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "/memory shows which CLAUDE.md and memory files are loaded, turning a guess into a diagnosis. /reload-skills rescans skills, not memory files. Restarting or pasting content are blind workarounds that may mask the symptom without revealing whether the hierarchy is wired correctly.",
      "hint": "Diagnose what the session actually loaded before patching behavior.",
      "difficulty": "core",
      "tags": [
        "memory",
        "diagnostics"
      ],
      "objectives": [
        "Apply memory in a production architecture decision.",
        "Apply diagnostics in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-05-q06",
      "floorId": "floor-05",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A document-processing team built .claude/skills/invoice-extractor/SKILL.md with a 200-line body of extraction rules for vendor invoices. Its frontmatter description reads: Internal helper for documents. Users paste invoices constantly, but the skill never auto-invokes. What should the team change?",
      "options": [
        "Rewrite the description to state what it does and when to use it, naming vendor invoices",
        "Add a line to the project CLAUDE.md instructing Claude to always use the invoice-extractor skill",
        "Move the 200 lines of extraction rules from the body into the description so the model sees them",
        "Set context: fork in the frontmatter so the skill executes in its own isolated context"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "The frontmatter description drives auto-invocation; a vague phrase like Internal helper for documents gives the model nothing to match against invoice tasks. The CLAUDE.md directive is a probabilistic patch on top of the broken description and adds permanent context cost. Stuffing the body into the description destroys progressive disclosure, and context: fork affects execution, not triggering.",
      "hint": "Ask which piece of skill metadata the model actually reads when deciding whether to trigger it.",
      "difficulty": "core",
      "tags": [
        "skills",
        "auto-invocation"
      ],
      "objectives": [
        "Apply skills in a production architecture decision.",
        "Apply auto invocation in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-06-q01",
      "floorId": "floor-06",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "An engineer at a logistics company asks Claude Code to migrate the order-routing module from REST to gRPC - a change touching 35 files across three packages, with at least two viable migration strategies. Claude immediately starts editing files, and the engineer has to interrupt halfway through when the chosen approach turns out to conflict with the team's service-mesh setup. What should the engineer have done differently?",
      "options": [
        "Cap the session at 10 file edits so a wrong approach fails fast and can be restarted",
        "Add a CLAUDE.md rule telling Claude to describe every change before each edit",
        "Start the task in plan mode so the migration strategy is reviewed and approved before any edits",
        "Split the migration into 35 single-file sessions so each change stays small and obvious"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Plan mode is designed for exactly this profile - multi-file, architectural work with multiple valid approaches - because the strategy gets reviewed before any code changes happen. Direct execution is only appropriate for single-file, obvious fixes. Splitting into 35 single-file sessions hides the architectural decision rather than surfacing it, an edit cap restarts the same mistake instead of preventing it, and a per-edit narration rule in CLAUDE.md is a probabilistic instruction, not a review gate.",
      "hint": "Match the execution mode to the shape of the change: how many files are touched, and how many valid approaches exist?",
      "difficulty": "core",
      "tags": [
        "plan-mode",
        "claude-code"
      ],
      "objectives": [
        "Apply plan mode in a production architecture decision.",
        "Apply claude code in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-06-q02",
      "floorId": "floor-06",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A release engineer adds a GitHub Actions step that should have Claude Code turn the merged commits into release notes. She tries CLAUDE_HEADLESS=true claude \"summarize the commits\" and the job hangs waiting for an interactive terminal until the runner times out. Which invocation actually runs Claude Code non-interactively in CI?",
      "options": [
        "claude -p \"Summarize the merged commits into release notes\"",
        "claude --headless \"Summarize the merged commits into release notes\"",
        "claude --batch \"Summarize the merged commits into release notes\"",
        "Set CI=true so Claude Code detects the pipeline and disables interactive mode itself"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "claude -p is the headless print mode: it executes the prompt non-interactively, prints the result, and exits - the supported pattern for CI pipelines. --headless, --batch, and CLAUDE_HEADLESS-style environment variables are not real Claude Code interfaces, and there is no CI auto-detection that substitutes for -p.",
      "hint": "Exactly one real flag puts Claude Code into print-and-exit mode; the others are invented.",
      "difficulty": "core",
      "tags": [
        "headless",
        "ci-cd"
      ],
      "objectives": [
        "Apply headless in a production architecture decision.",
        "Apply ci cd in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-06-q03",
      "floorId": "floor-06",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A fintech team's pipeline runs claude -p to triage failing integration tests, then a Python script scrapes the verdict out of Claude's prose with a regex. Every few weeks the wording shifts (\"the likely culprit is...\" vs \"root cause:\") and the parser silently mis-routes tickets to the wrong on-call team. What fixes the root cause?",
      "options": [
        "Tighten the regex to cover the new phrasings and add unit tests for the parser",
        "Run claude -p with --output-format json and read the verdict from the structured result envelope",
        "Append \"always begin your answer with the exact phrase ROOT CAUSE:\" to the prompt",
        "Capture stderr and stdout separately so the prose and the verdict do not interleave"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Scraping free-form prose is the root flaw; --output-format json makes claude -p emit a machine-readable envelope the script can parse deterministically. A prompted sentinel phrase is probabilistic and will eventually drift just like the prose did, hardening the regex only restarts the breakage cycle with the next wording change, and stream separation does nothing about wording inside the prose itself.",
      "hint": "Choose deterministic machine-readable output over ever-smarter parsing of natural language.",
      "difficulty": "core",
      "tags": [
        "output-format",
        "headless"
      ],
      "objectives": [
        "Apply output format in a production architecture decision.",
        "Apply headless in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-06-q04",
      "floorId": "floor-06",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A nightly job runs claude -p with --output-format json to scan a repo for deprecated API usage and must hand a dashboard importer records shaped like {file, line, severity}. The JSON envelope always parses, but the result field inside is free-form text, and the importer rejects roughly one run in five. What gives the importer a typed guarantee?",
      "options": [
        "Add three correctly formatted example records to the prompt and rerun any failures",
        "Pin the model version so the formatting stays stable from run to run",
        "Chain a second claude -p call that reformats the first run's output into the record shape",
        "Pass the record schema to the job with --json-schema so the result payload itself is typed"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "--output-format json structures the envelope, not the content inside it; --json-schema constrains the result payload to the supplied schema, which is what the importer's contract needs. Few-shot examples improve the odds but remain probabilistic, pinning the model version still leaves the result field free-form, and a second reformatting call adds cost while still offering no guarantee.",
      "hint": "One flag structures the wrapper around the answer; a different flag types the answer itself.",
      "difficulty": "core",
      "tags": [
        "json-schema",
        "output-format"
      ],
      "objectives": [
        "Apply json schema in a production architecture decision.",
        "Apply output format in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-06-q05",
      "floorId": "floor-06",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "An e-commerce monorepo runs a long dependency-upgrade job through claude -p that takes about nine minutes. The CI runner kills any step that is silent on stdout for five minutes, so the job dies mid-run with nothing logged. The team wants real visibility into what the job is doing, not just a way to keep the runner from killing it. What should they change?",
      "options": [
        "Raise the runner's silence threshold to fifteen minutes for this one job",
        "Wrap the step in a shell loop that echoes a heartbeat line every sixty seconds",
        "Run the job with --output-format stream-json so events are emitted incrementally as they occur",
        "Split the upgrade into several claude -p calls so each one finishes in under five minutes"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "stream-json emits each event as it happens, which keeps stdout active for the watchdog and gives the team a live trace of what Claude is actually doing. A heartbeat echo quiets the watchdog but reveals nothing about progress, raising the threshold just hides the observability gap, and splitting the job adds orchestration complexity while each call still runs as a silent blob.",
      "hint": "Think incremental events flowing out during the run, not one blob at the end.",
      "difficulty": "core",
      "tags": [
        "stream-json",
        "ci-cd"
      ],
      "objectives": [
        "Apply stream json in a production architecture decision.",
        "Apply ci cd in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-06-q06",
      "floorId": "floor-06",
      "categoryId": "claude-workflows",
      "kind": "claude-platform",
      "prompt": "A 14-person platform team wants every GitHub pull request reviewed by Claude before human review. Today, reviews only happen when a developer remembers to run a review prompt locally, and about a quarter of PRs merge without one. What is the standard way to automate this?",
      "options": [
        "A nightly cron job that batch-reviews everything merged during the previous day",
        "Add claude-code-action to the repository's GitHub Actions workflow triggered on pull requests",
        "A pre-push hook on each developer laptop that runs claude -p against the branch diff",
        "A required PR checklist item where the author pastes the output of their local Claude review"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "claude-code-action is the supported GitHub Actions integration for PR review: it runs server-side on every pull request, removing the dependency on individual developer discipline. Laptop hooks and checklist items still rely on each developer's machine and memory, and a nightly batch review lands after merge - too late to gate anything.",
      "hint": "Pick the mechanism that runs server-side on every PR regardless of what any developer remembers to do.",
      "difficulty": "core",
      "tags": [
        "claude-code-action",
        "ci-cd"
      ],
      "objectives": [
        "Apply claude code action in a production architecture decision.",
        "Apply ci cd in a production architecture decision."
      ],
      "references": [
        {
          "label": "Autonomous systems",
          "href": "/learn/ai-from-scratch/phases/15-autonomous-systems"
        }
      ]
    },
    {
      "id": "floor-07-q01",
      "floorId": "floor-07",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "Your CI pipeline runs claude -p to review every PR in a 40-developer monorepo. The review prompt includes the line 'be careful not to flag things that are not real problems,' yet PRs still average 12 comments each, mostly style nitpicks the linter already enforces. What is the most effective prompt change?",
      "options": [
        "Lower the sampling temperature so the model generates fewer speculative findings and sticks to obvious problems",
        "Strengthen the existing instruction to say the model should be very careful and only report issues it is extremely confident are real",
        "Replace the vague caution with explicit flag and skip criteria: enumerate the defect types to report and state that linter-covered style issues must be skipped",
        "Add a hard cap of five comments per PR so the volume of nitpicks stays manageable for reviewers"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Vague cautions like 'be careful' give the model no operational definition of a real problem, so they fail at scale; explicit flag and skip criteria provide a checkable decision rule. Confidence-based phrasing is the same vagueness restated, temperature changes randomness rather than the decision rule, and a comment cap hides noise without improving precision.",
      "hint": "The fix is to make the decision rule operational, not to restate the caution more forcefully.",
      "difficulty": "core",
      "tags": [
        "explicit-criteria",
        "code-review",
        "prompting"
      ],
      "objectives": [
        "Apply explicit criteria in a production architecture decision.",
        "Apply code review in a production architecture decision.",
        "Apply prompting in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-07-q02",
      "floorId": "floor-07",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "Your fintech extraction service uses a tool_use definition with a detailed JSON schema to pull line items and totals from vendor invoices. Every response parses cleanly against the schema, yet on 6 percent of invoices the extracted line-item amounts do not add up to the extracted invoice total. What does this indicate?",
      "options": [
        "The schema is underspecified; adding minimum and maximum constraints on the amount fields will bring the sums into alignment",
        "The schema guarantees syntactic compliance only, so semantic checks like sum validation must run as a separate programmatic step",
        "tool_choice should be set to any so the model is forced to use the extraction tool on every invoice it processes",
        "The schema's field descriptions are too short; expanding them will make the extracted values arithmetically consistent"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "A tool_use JSON schema guarantees the output's structure, not the correctness of its values, and JSON Schema cannot express cross-field arithmetic like line items summing to a total. The root-cause fix is programmatic semantic validation downstream; numeric bounds and longer descriptions cannot enforce arithmetic consistency, and tool_choice changes when tools are called, not whether values are right.",
      "hint": "Separate what a schema can promise about shape from what it can promise about meaning.",
      "difficulty": "core",
      "tags": [
        "json-schema",
        "semantic-validation",
        "tool_use"
      ],
      "objectives": [
        "Apply json schema in a production architecture decision.",
        "Apply semantic validation in a production architecture decision.",
        "Apply tool_use in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-07-q03",
      "floorId": "floor-07",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A support-resolution agent ends each conversation by writing a handoff summary for human agents. The required format is four labeled sections, but in production the model sometimes merges sections, renames headers, or adds extras, even though the prompt describes the format in detail. What is the most reliable prompt-level fix?",
      "options": [
        "Add two to four complete example summaries to the prompt that demonstrate the exact section structure on representative tickets",
        "Expand the prose format description with stronger language such as 'you must always use exactly these four headers'",
        "Append thirty example summaries covering every ticket category the support team has ever encountered",
        "Ask the model to first restate the format rules in its own words, then write the summary beneath its restatement"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Few-shot examples demonstrate format far more reliably than prose descriptions, and 2 to 4 well-chosen examples are typically enough for format consistency. Thirty examples add cost and context bloat with diminishing returns, stronger prose wording is the same probabilistic instruction that is already failing, and a restatement preamble adds extra text that itself violates the required four-section output.",
      "hint": "Showing the model the output usually beats describing it, but more of a good thing has diminishing returns.",
      "difficulty": "core",
      "tags": [
        "few-shot",
        "format-consistency"
      ],
      "objectives": [
        "Apply few shot in a production architecture decision.",
        "Apply format consistency in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-07-q04",
      "floorId": "floor-07",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "An automated security reviewer posts findings on PRs across your platform team's repositories. Its 'potential race condition' category has run at roughly 80 percent false positives for three weeks, and engineers have started dismissing every finding unread, including valid secret-exposure alerts from other categories. What should you do first?",
      "options": [
        "Attach a model-reported confidence score to each finding so engineers can sort and triage the noisy category themselves",
        "Disable the race-condition category in production, tune it offline against labeled examples, and re-enable it once precision recovers",
        "Add a prompt instruction telling the model to flag race conditions only when it is certain the code is genuinely unsafe",
        "Send the team a reliability ranking of the finding categories so they know which ones are worth reading carefully"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "One high-false-positive category poisons trust in the entire tool, so the first move is to pull it from production and fix it offline against labeled data, restoring it only when precision recovers. Self-reported confidence scores are poorly calibrated so sorting by them does not rebuild trust, a certainty instruction is a vague caution restated, and a reliability memo asks engineers to keep absorbing the noise.",
      "hint": "When one noisy category makes engineers ignore everything, think about protecting trust in the whole tool first.",
      "difficulty": "core",
      "tags": [
        "false-positives",
        "reviewer-trust",
        "code-review"
      ],
      "objectives": [
        "Apply false positives in a production architecture decision.",
        "Apply reviewer trust in a production architecture decision.",
        "Apply code review in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-07-q05",
      "floorId": "floor-07",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "An e-commerce pipeline asks Claude to return product attributes as JSON in a plain text response. About 2 percent of responses begin with 'Here is the extracted JSON:' or wrap the object in a code fence, crashing the downstream parser. The prompt already says 'respond with only the JSON object, no other text.' What is the root-cause fix?",
      "options": [
        "Use strict structured outputs or a tool_use schema so conformance is guaranteed rather than requested through instructions",
        "Add a regex preprocessing step that strips any leading prose and code fences before the parser runs",
        "Repeat the JSON-only instruction at both the start and the end of the prompt so the model cannot miss it",
        "Detect parse failures at runtime and automatically resend the request until a clean JSON response comes back"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Prompt instructions are probabilistic and will occasionally be violated at scale; strict structured outputs or tool_use with a schema make conformance a guarantee of the API rather than a request. Regex stripping and retry loops patch the symptom while leaving the unreliable mechanism in place, and repeating the instruction is more of the same best-effort approach.",
      "hint": "Ask which option turns 'please format it this way' into a guarantee.",
      "difficulty": "core",
      "tags": [
        "structured-outputs",
        "json-parsing"
      ],
      "objectives": [
        "Apply structured outputs in a production architecture decision.",
        "Apply json parsing in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-07-q06",
      "floorId": "floor-07",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A healthcare intake assistant classifies patient messages as urgent, routine, or administrative. Accuracy on clear-cut messages is 98 percent, but messages mixing signals, like a medication-refill request that also mentions new chest pain, get classified inconsistently across runs. The prompt already contains three clear examples of each category. What should you add?",
      "options": [
        "More clear-cut examples of each category, scaling up to ten per class so every label is better represented",
        "An instruction telling the model to use its best clinical judgment whenever a message contains mixed signals",
        "A higher extended-thinking budget so the model reasons for longer about every incoming patient message",
        "A few examples of mixed-signal messages, each paired with the correct label and the reasoning that justifies it"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "The failures are concentrated in ambiguous inputs, so the examples must demonstrate how to resolve ambiguity, and including the reasoning teaches the decision process rather than just the answer. More clear-cut examples reinforce what already works, 'use best judgment' gives the model no new decision rule, and a bigger thinking budget adds latency to every message without supplying the missing tie-breaking criteria.",
      "hint": "Target the examples at where the model actually fails, and show the why, not only the what.",
      "difficulty": "core",
      "tags": [
        "few-shot",
        "ambiguous-cases"
      ],
      "objectives": [
        "Apply few shot in a production architecture decision.",
        "Apply ambiguous cases in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-08-q01",
      "floorId": "floor-08",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A fintech extraction pipeline validates Claude's invoice JSON against a schema plus business rules. When a rule fails - line_items sum to 4,210.50 but invoice_total reads 4,120.50 - the pipeline resends the exact same prompt, and all three retries return the same wrong output. What change makes the retry loop actually effective?",
      "options": [
        "Raise the temperature on retries so each attempt samples a different output instead of repeating the same mistake",
        "Include the exact validation failure in the retry prompt so the model knows what to fix and can reconcile the totals",
        "Switch each retry to a larger, more capable model so the second attempt reasons more deeply about the invoice",
        "Increase the retry count from three to ten so that one of the attempts eventually passes validation"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "A blind resend gives the model the identical input that already failed, so it reproduces the same failure; retries become corrective only when the specific error is fed back as new information. Raising temperature is gambling on randomness rather than correction, and neither a bigger model nor more attempts tells the model what was wrong.",
      "hint": "A retry can only outperform the first attempt if it receives information the first attempt did not have.",
      "difficulty": "core",
      "tags": [
        "retry-loops",
        "validation"
      ],
      "objectives": [
        "Apply retry loops in a production architecture decision.",
        "Apply validation in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-08-q02",
      "floorId": "floor-08",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A healthcare intake pipeline extracts discharge_date from referral packets, and the validator requires the field. About 12% of packets are outpatient referrals that contain no discharge date at all; for those, the retry-with-feedback loop burns all five attempts, and the model sometimes fabricates a plausible date on attempt four or five just to satisfy the validator. What is the root-cause fix?",
      "options": [
        "Make discharge_date nullable and accept null as a valid result when the source omits it",
        "Add a 'do not invent dates that are not present in the document' warning to the system prompt and keep the field required",
        "Reduce the retry limit from five attempts to two so fewer tokens are wasted and fabrication gets fewer chances",
        "Route every packet that exhausts its five retries into a human review queue for manual data entry"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "When the information is genuinely absent from the source, no number of retries can produce it, and a required field pressures the model toward fabrication. A nullable schema field fixes the root cause by making absence a legitimate, terminal answer. The prompt warning is a probabilistic patch on a deterministic schema flaw, fewer retries just fails faster, and human routing turns a design defect into a permanent operational expense for 12% of volume.",
      "hint": "Ask whether any retry could ever succeed when the source document simply does not contain the value.",
      "difficulty": "core",
      "tags": [
        "nullable-fields",
        "fabrication",
        "retry-loops"
      ],
      "objectives": [
        "Apply nullable fields in a production architecture decision.",
        "Apply fabrication in a production architecture decision.",
        "Apply retry loops in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-08-q03",
      "floorId": "floor-08",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A logistics company extracts line items and a total from carrier freight invoices. On about 3% of invoices the printed total does not equal the sum of the line charges - carrier billing errors the audit team is paid to find. Today the validator rejects those extractions as model mistakes, and the retry loop pressures the model until the numbers agree. How should the design change?",
      "options": [
        "Keep a single total field and have post-processing overwrite whatever was extracted with the computed sum of the line items",
        "Capture stated_total and calculated_total as separate fields with a conflict_detected flag, treating flagged rows as valid",
        "Add a retry instruction telling the model to re-read the invoice as many times as needed until the two totals reconcile",
        "Remove the total field from the schema entirely and compute invoice totals downstream from the extracted line items"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "A document that disagrees with itself is real data, not an extraction failure; the schema should preserve both the stated and the computed value with an explicit conflict flag so auditors see the discrepancy. Forcing reconciliation through retries or overwriting one value with the other destroys the billing errors the audit exists to catch, and dropping the total field entirely discards the printed total - without it there is nothing to compare the computed sum against, so the discrepancies vanish just the same.",
      "hint": "Sometimes a mismatch is the signal the business wants captured, not an error to retry away.",
      "difficulty": "core",
      "tags": [
        "conflict-detection",
        "schema-design"
      ],
      "objectives": [
        "Apply conflict detection in a production architecture decision.",
        "Apply schema design in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-08-q04",
      "floorId": "floor-08",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A CI pipeline runs claude -p to review pull requests. A 14-file PR fits comfortably in the context window at roughly 60k tokens, yet the review consistently produces detailed findings for the first four or five files and shallow or zero findings for the rest - even when humans later find real bugs in files 10 through 14. What is the most likely cause?",
      "options": [
        "The context window was silently truncated, so the later files were never actually delivered to the model",
        "Attention dilutes across a 14-file single pass, so files later in the prompt receive progressively shallower scrutiny",
        "The model classifies files appearing after the first few as test fixtures and automatically deprioritizes them",
        "The JSON output schema caps the number of findings, cutting off results before the later files are reported"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Fitting within the context window does not guarantee uniform scrutiny: a single pass over 14 files dilutes attention, and material later in the prompt gets shallower treatment. Truncation is ruled out because 60k tokens fits easily, the model has no built-in rule that demotes later files to test fixtures, and a schema cap would cut findings by count rather than consistently sparing the first files and starving the last ones. The fix points toward per-file review passes, not a bigger window.",
      "hint": "Fitting inside the context window is not the same as receiving equal scrutiny everywhere within it.",
      "difficulty": "core",
      "tags": [
        "attention-dilution",
        "code-review"
      ],
      "objectives": [
        "Apply attention dilution in a production architecture decision.",
        "Apply code review in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-08-q05",
      "floorId": "floor-08",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A structured-extraction team submits a Message Batches job covering 8,000 archived support tickets, each request tagged with a custom_id. Results show 7,760 successes, 180 failures for exceeding the maximum request size, and 60 failures from intermittent server errors. What is the most efficient recovery?",
      "options": [
        "Resubmit the full 8,000-request batch from scratch, since the 50% batch discount makes a complete rerun affordable",
        "Resubmit all 240 failed requests unchanged as a new batch and repeat the resubmission until every request succeeds",
        "Use the custom_ids to isolate failures, chunk the 180 oversized tickets, and resubmit them plus the 60 transient ones",
        "Convert all 240 failed requests into synchronous API calls so an engineer can step through and debug each one interactively"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "custom_id exists precisely so failures can be isolated and resubmitted without redoing completed work, and the two failure classes need different treatment: oversized requests fail deterministically and must be fixed before resubmission, while transient server errors can be retried as-is. Resubmitting all 240 unchanged guarantees the 180 oversized requests fail again, rerunning all 8,000 pays twice for finished work, and hand-debugging 240 requests synchronously forfeits the discount and the automation.",
      "hint": "Separate the failures that will recur deterministically from the ones that were just bad luck.",
      "difficulty": "core",
      "tags": [
        "batch-api",
        "custom_id",
        "retry-loops"
      ],
      "objectives": [
        "Apply batch api in a production architecture decision.",
        "Apply custom_id in a production architecture decision.",
        "Apply retry loops in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-08-q06",
      "floorId": "floor-08",
      "categoryId": "prompt-structured-output",
      "kind": "architecture",
      "prompt": "A CI workflow has Claude Code generate a payment-reconciliation module, then prompts in the same session: 'Now critically review the code you just wrote for bugs.' The review almost always concludes the implementation looks correct, yet QA keeps finding logic errors in the merged code. Which change most improves bug detection?",
      "options": [
        "Strengthen the review prompt to 'act as a hostile senior reviewer and assume the code is broken until proven otherwise'",
        "Repeat the same-session review three times and take the union of all findings to compensate for individual misses",
        "Run the review in a separate session whose context contains only the diff, not the generation conversation",
        "Enable extended thinking on the same-session review so the model reasons more deeply before approving the code"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Same-session self-review keeps the generation reasoning in context, so the model tends to confirm the decisions it just made; an independent reviewer session sees only the artifact and evaluates it fresh. Harsher prompts and extended thinking still operate on top of the biased context, and repeating a biased review three times unions the same blind spots.",
      "hint": "Consider what the reviewer already believes when its context contains the reasoning that produced the code.",
      "difficulty": "core",
      "tags": [
        "independent-review",
        "ci-cd"
      ],
      "objectives": [
        "Apply independent review in a production architecture decision.",
        "Apply ci cd in a production architecture decision."
      ],
      "references": [
        {
          "label": "LLM engineering",
          "href": "/learn/ai-from-scratch/phases/11-llm-engineering"
        }
      ]
    },
    {
      "id": "floor-09-q01",
      "floorId": "floor-09",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A fintech support agent handles a disputed charge of $147.23. The conversation runs 25 turns, and the agent uses progressive summarization to keep the history manageable. At turn 22 the agent offers the customer a refund of $47 - the exact figure has eroded through repeated summarization passes. What is the root-cause fix?",
      "options": [
        "Strengthen the summarization prompt with 'always preserve monetary amounts exactly as written' so figures survive each pass",
        "Disable summarization and rely on a model with a larger context window so the raw 25-turn history stays verbatim",
        "Keep exact figures, IDs, and dates in a structured case-facts block outside the summarized history",
        "Re-run the transaction lookup tool on every turn so the disputed amount is always freshly loaded in context"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Progressive summarization is lossy by design, so exact values must live in a structure that is never summarized. A case-facts block carried verbatim in every request guarantees $147.23 survives to turn 22. Prompting the summarizer to be careful is probabilistic best-effort, keeping the entire raw history merely trades erosion for mid-context burial and ever-growing cost, and re-running the lookup every turn wastes tokens while patching the symptom.",
      "hint": "Ask which data should be exempt from a lossy process rather than asking the lossy process to be careful.",
      "difficulty": "core",
      "tags": [
        "case-facts",
        "summarization",
        "context-management"
      ],
      "objectives": [
        "Apply case facts in a production architecture decision.",
        "Apply summarization in a production architecture decision.",
        "Apply context management in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-09-q02",
      "floorId": "floor-09",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A logistics operations agent calls a shipment-tracking tool that returns a 45-field JSON object per shipment, including carrier metadata, customs codes, and internal routing flags. The agent only ever uses status, ETA, and current location. Sessions tracking 30+ shipments hit context limits by mid-session. What should the architect do?",
      "options": [
        "Run /compact to summarize accumulated history each time the session approaches the context limit",
        "Add a PostToolUse hook that trims each result to status, ETA, and location before it enters history",
        "Instruct the agent in the system prompt to ignore irrelevant fields when reading tool results",
        "Upgrade to a model with a larger context window so the full 45-field payloads can accumulate safely"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Verbose tool outputs should be trimmed before they accumulate; a PostToolUse hook deterministically reduces each result to the needed fields at the source of the bloat. /compact is lossy and acts only after the damage is done, prompting the agent to 'ignore' fields removes zero tokens, and a larger window just delays the failure while raising cost.",
      "hint": "Reduce the tokens at the moment they enter context, not after they have piled up.",
      "difficulty": "core",
      "tags": [
        "context-management",
        "hooks",
        "tool-output-trimming"
      ],
      "objectives": [
        "Apply context management in a production architecture decision.",
        "Apply hooks in a production architecture decision.",
        "Apply tool output trimming in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-09-q03",
      "floorId": "floor-09",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A healthcare intake assistant opens with a patient who reports three concerns: a billing question, a prescription refill, and a referral request. By turn 15 the assistant has resolved the billing question and closes the conversation, never addressing concerns #2 and #3. What design change fixes this reliably?",
      "options": [
        "Track the concerns in a structured issue list with per-item status, updated as each one closes",
        "Add a system prompt line: 'Always address every concern the patient raises before ending the conversation'",
        "Have the assistant ask the patient whether anything was missed before it closes the conversation",
        "Shorten the flow so all three concerns are handled within the first ten turns of the conversation"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "Multi-issue conversations need an explicit issue list with status tracking that persists across turns, so open items are checked before the conversation closes. A prompt admonition is probabilistic and degrades exactly when the context grows long, and asking the patient to re-list their concerns shifts the burden onto the user while leaving the drift unfixed.",
      "hint": "Durable structured state beats a polite reminder when items must survive fifteen turns.",
      "difficulty": "core",
      "tags": [
        "issue-tracking",
        "context-management"
      ],
      "objectives": [
        "Apply issue tracking in a production architecture decision.",
        "Apply context management in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-09-q04",
      "floorId": "floor-09",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A multi-agent research system's coordinator builds a 60k-token synthesis prompt: subagent findings concatenated chronologically, with the critical scope constraint ('only include peer-reviewed sources after 2020') stated once around token 30k, where it landed in sequence. The final report repeatedly cites blog posts from 2017. What change most directly fixes this?",
      "options": [
        "Increase the thinking budget so the model reasons more carefully over the full 60k tokens",
        "Rerun the synthesis on a model with a larger context window so the prompt fits more comfortably",
        "Append a final instruction line - 'double-check that every citation meets the scope constraint' - to the prompt",
        "Move the scope constraint and key summaries to the top of the prompt under clear headers"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "This is the lost-in-the-middle effect: facts buried mid-context get missed even when the prompt fits comfortably in the window. Placing critical constraints and summaries at the top under clear headers puts them where attention is strongest. The larger-window option misdiagnoses the problem - nothing overflowed - and a trailing reminder still requires the model to attend to the buried constraint.",
      "hint": "The prompt fits in the window - think about where in the window the constraint sits.",
      "difficulty": "core",
      "tags": [
        "lost-in-the-middle",
        "context-management",
        "multi-agent"
      ],
      "objectives": [
        "Apply lost in the middle in a production architecture decision.",
        "Apply context management in a production architecture decision.",
        "Apply multi agent in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-09-q05",
      "floorId": "floor-09",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A telecom support agent is mid-troubleshooting when the customer types 'Stop. I want to talk to a real person.' The agent responds 'I understand, but let's try resetting your router first' and continues for four more turns before the customer abandons the chat. How should escalation be designed?",
      "options": [
        "Treat an explicit request for a human as an immediate escalation trigger, honored regardless of progress",
        "Escalate when the customer's sentiment score drops below a calibrated threshold across two consecutive turns",
        "Escalate after the agent's self-assessed confidence in resolution falls below 50 percent",
        "Escalate once the agent has exhausted its full troubleshooting runbook without resolving the issue"
      ],
      "correctOptionIndexes": [
        0
      ],
      "explanation": "An explicit human request is one of the reliable escalation triggers and must be honored immediately - continuing to troubleshoot past it destroys trust and drives abandonment. Sentiment and self-reported confidence are unreliable proxies, and waiting for runbook exhaustion is exactly the behavior that drove this customer away.",
      "hint": "One trigger in this list requires no inference at all - the customer stated it outright.",
      "difficulty": "core",
      "tags": [
        "escalation"
      ],
      "objectives": [
        "Apply escalation in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-09-q06",
      "floorId": "floor-09",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "An e-commerce support agent looks up a customer's orders for the last 30 days. The order-search tool returns an empty array, the agent's wrapper raises a SearchFailedError, and the agent retries the call five times before telling the customer 'our system is down.' The customer simply placed no orders that month. What is the correct design?",
      "options": [
        "Have the agent retry with progressively wider date ranges until at least one order is found",
        "The tool should return a structured success with results: [] and a zero count; the agent reports no orders in that window",
        "Catch the SearchFailedError and have the agent apologize and escalate to a human after the first failure",
        "Add a fallback that queries the data warehouse directly when the order-search tool returns nothing"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "An empty result set is a valid successful outcome - zero matches - not an error. The wrapper conflating 'no rows' with 'failure' caused phantom retries and a false outage report. Widening the date range fabricates an answer to a question the customer did not ask, and escalating a non-error wastes human time on a working system.",
      "hint": "Distinguish 'the search ran and found nothing' from 'the search could not run.'",
      "difficulty": "core",
      "tags": [
        "zero-results",
        "tool-errors"
      ],
      "objectives": [
        "Apply zero results in a production architecture decision.",
        "Apply tool errors in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-10-q01",
      "floorId": "floor-10",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A developer has been working with Claude Code on a 40-package monorepo for five hours straight. Early in the session the agent cited exact file paths and line numbers; now it says things like \"this service typically follows the standard repository pattern\" and proposes an edit to a helper function that does not exist. What is the most likely explanation?",
      "options": [
        "Anthropic silently routed the session to a smaller model under load, reducing answer quality and recall of specifics midway through the session",
        "Hours of accumulated verbose tool output are degrading recall - vague generalities and invented specifics are classic long-session degradation",
        "The project CLAUDE.md was evicted from the prompt cache, so the team's coding conventions are no longer visible to the model in later turns",
        "The developer's recent prompts have grown too short, leaving the model without enough instruction to stay specific about files and line numbers"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "Multi-hour sessions accumulate verbose tool output that buries the specifics the model once cited precisely; the telltale symptom is a shift from exact citations to vague generalities and invented details. The remedy is context hygiene (scratchpads, /compact, subagent delegation). Claude Code does not silently swap models mid-session, and prompt-cache eviction affects cost and latency, not what is present in context.",
      "hint": "Ask what changes about a session's answer quality as hours of verbose tool output pile up in one context.",
      "difficulty": "core",
      "tags": [
        "context-degradation",
        "long-sessions"
      ],
      "objectives": [
        "Apply context degradation in a production architecture decision.",
        "Apply long sessions in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-10-q02",
      "floorId": "floor-10",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "An expense-report extraction system shows 97% field-level accuracy on its aggregate dashboard, but the finance team keeps escalating wrong totals from handwritten receipts, which make up 4% of volume. Engineering points out that 97% comfortably exceeds the 95% SLA. What is the flaw in that reasoning?",
      "options": [
        "The SLA threshold is simply set too low; raising the aggregate accuracy target from 95% to 99% would force the handwritten receipt problem to surface on the dashboard",
        "A measured 97% is statistically indistinguishable from the 95% floor at this volume, so the system may already be violating the SLA without anyone noticing",
        "Aggregate accuracy masks per-segment failure - receipts may be failing badly while printed invoices carry the average; validate accuracy per document type and field",
        "The finance team is anchoring on rare anecdotes; at 97% field accuracy some visible errors are statistically expected and remain acceptable under the SLA"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "A 4% segment can fail almost completely while the blended average stays above target - near-perfect printed invoices plus badly failing handwritten receipts still averages around 97%. The governing rule is per-segment validation by document type and field; raising the aggregate target is a patch that still cannot localize which segment is broken, and the escalations are a systematic segment failure, not anecdotal noise.",
      "hint": "A small segment can fail almost completely without moving a blended average below its target.",
      "difficulty": "core",
      "tags": [
        "per-segment-validation",
        "evaluation"
      ],
      "objectives": [
        "Apply per segment validation in a production architecture decision.",
        "Apply evaluation in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-10-q03",
      "floorId": "floor-10",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A media company is running an 8-hour Claude Code session migrating 200 analytics reports to a new SQL dialect. The context keeps filling with thousands of lines of grep output and test logs, and by hour four the agent's answers turn slow and generic. Which working pattern addresses the root cause?",
      "options": [
        "Raise max_tokens on every request so the model has more room to reason over the long accumulated history of the session",
        "Switch the session over to Claude Opus, since its deeper reasoning capacity handles long accumulated contexts without degrading",
        "Restart the session every hour and paste the previous transcript into the new session as a primer to maintain continuity",
        "Persist findings to scratchpad files, run /compact at phase boundaries, and delegate verbose exploration to subagents"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "The root cause is verbose intermediate output bloating the main context: scratchpad files externalize durable facts, /compact condenses at milestones, and subagents keep noisy exploration in isolated contexts so raw logs never enter the main session. max_tokens governs output length rather than input degradation, switching models does not stop context bloat from degrading recall, and pasting an old transcript into a fresh session simply reimports the bloat.",
      "hint": "The cure is keeping verbose intermediate output out of the main context, not making the context or the model bigger.",
      "difficulty": "core",
      "tags": [
        "scratchpad",
        "compact",
        "subagents"
      ],
      "objectives": [
        "Apply scratchpad in a production architecture decision.",
        "Apply compact in a production architecture decision.",
        "Apply subagents in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-10-q04",
      "floorId": "floor-10",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A research swarm gathering electric-vehicle market data flags a \"source conflict\": one finding says global EV sales were 10.5M units, another says 17.3M. Investigation shows the first comes from a 2023 report and the second from a 2025 report - and the synthesizer had discarded both figures as unreliable. What fixes this?",
      "options": [
        "Add a reconciliation step that averages the numeric claims whenever any two sources disagree by more than 20%, then report the blended figure",
        "Rank the sources by domain authority and keep only the figure that comes from the higher-authority publication, discarding the other",
        "Tighten the scout prompts so they only collect market figures published within the last 12 months, keeping the dataset current",
        "Capture publication dates as temporal metadata on every claim, so figures from different years read as a time series, not contradictions"
      ],
      "correctOptionIndexes": [
        3
      ],
      "explanation": "Figures measured at different times are not contradictions - they are data points about a changing quantity, and carrying temporal metadata through synthesis prevents false-conflict detection while preserving trend information. Averaging fabricates a number no source ever reported, authority ranking discards a valid historical data point, and restricting collection to recent sources throws away exactly the history trend analysis needs.",
      "hint": "Two correct measurements of a changing quantity can differ for a reason that a piece of metadata captures.",
      "difficulty": "core",
      "tags": [
        "temporal-metadata",
        "synthesis"
      ],
      "objectives": [
        "Apply temporal metadata in a production architecture decision.",
        "Apply synthesis in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-10-q05",
      "floorId": "floor-10",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "A healthcare patient-intake system extracts 14 fields from 6,000 faxed forms daily; medication dosage and allergy fields are safety-critical. Reviewing every form by hand costs too much, and a 5% random spot-check let a dosage error through last month. How should human review be routed?",
      "options": [
        "Route forms to human review whenever the model's overall document-level confidence score falls below a fixed 0.8 threshold",
        "Route a fixed 20% random sample to review, weighted toward forms received outside business hours when fax quality is at its worst",
        "Route on deterministic field-level signals - null dosage or allergy values, schema failures, or out-of-range dosage units trigger human review",
        "Re-extract every form a second time with the same model and prompt, and route to human review only the forms where the two passes disagree on any field"
      ],
      "correctOptionIndexes": [
        2
      ],
      "explanation": "Review capacity should concentrate where errors are costly: deterministic per-field validation on the safety-critical fields (nulls, schema failures, out-of-range values) catches the dangerous cases. A document-level confidence score is poorly calibrated and can stay high even when one critical field is wrong - the same masking problem as aggregate accuracy. Bigger random samples spend budget on harmless fields, and double extraction doubles cost while missing systematic errors the model makes identically both times.",
      "hint": "The unit of risk in this pipeline is the field, not the document.",
      "difficulty": "core",
      "tags": [
        "human-review",
        "field-validation"
      ],
      "objectives": [
        "Apply human review in a production architecture decision.",
        "Apply field validation in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    },
    {
      "id": "floor-10-q06",
      "floorId": "floor-10",
      "categoryId": "context-reliability",
      "kind": "scenario",
      "prompt": "An overnight multi-agent research coordinator fans out 60 subagent tasks over roughly seven hours. A crash at hour five currently forces rerunning everything, wasting about $90 of API spend per incident. The team is debating recovery designs. Which is best?",
      "options": [
        "Enable 1-hour prompt caching on the coordinator's stable prefix so a restarted run reuses the cached work and skips already-completed reasoning",
        "Append each completed subagent's task id, status, and structured findings to a manifest; a restarted coordinator loads it and dispatches only incomplete tasks",
        "Persist the coordinator's full message history to disk every 10 minutes and on restart replay the conversation from the most recent snapshot to continue work",
        "Wrap every subagent call in retry-with-backoff so transient failures never surface and coordinator crashes become effectively impossible to hit"
      ],
      "correctOptionIndexes": [
        1
      ],
      "explanation": "A manifest recording completed task ids plus their structured findings is the minimal durable state needed to resume: restart logic deterministically skips finished work and re-dispatches only the rest. Replaying full message history restores bloated context and a fragile transcript rather than clean state, prompt caching is a cost optimization that holds no completion state, and retries handle transient tool errors but cannot make process crashes impossible.",
      "hint": "Ask what minimal durable state lets a freshly started coordinator know exactly which work is already done.",
      "difficulty": "core",
      "tags": [
        "crash-recovery",
        "manifests",
        "multi-agent"
      ],
      "objectives": [
        "Apply crash recovery in a production architecture decision.",
        "Apply manifests in a production architecture decision.",
        "Apply multi agent in a production architecture decision."
      ],
      "references": [
        {
          "label": "Production readiness",
          "href": "/learn/ai-from-scratch/phases/17-infrastructure-and-production"
        }
      ]
    }
  ]
};

export const claudeQuestionCount = claudeCertifiedArchitectChallenge.questions.length;
