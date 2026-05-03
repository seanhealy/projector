# projector

A personal CLI toolkit. TypeScript, runs on [Deno](https://deno.com), built on [Cliffy](https://cliffy.io). Compiles to a single self-contained binary.

## Prerequisites

- [Deno](https://deno.com) 2.x

```sh
brew install deno
# or: curl -fsSL https://deno.land/install.sh | sh
```

## Usage

```sh
deno task start <command> [options]
```

### Commands

| Command | Description |
| --- | --- |
| `hello [--name <name>]` | Say hello. |

Run `deno task start --help` for the live command list, or `deno task start <command> --help` for per-command flags.

## Tasks

| Task | What it does |
| --- | --- |
| `deno task start` | Run the CLI. |
| `deno task dev` | Run with `--watch` for hot reload. |
| `deno task compile` | Build a single-binary executable to `dist/projector`. |
| `deno task fmt` | Format the codebase. |
| `deno task lint` | Lint the codebase. |
| `deno task test` | Run the test suite. |

## Project layout

```
src/
├── main.ts                 # Root command — registers all subcommands
└── commands/
    └── <name>/
        └── command.ts      # Exports `export const <name> = new Command()...`
```

Each command lives in its own directory. As a command grows, helpers (`api.ts`, `prompts.ts`, `types.ts`, etc.) live alongside its `command.ts` — the directory is a sealed unit.

## Adding a command

1. Create `src/commands/<name>/command.ts`:

   ```ts
   import { Command } from "@cliffy/command";

   export const <name> = new Command()
     .description("What it does.")
     .option("-f, --flag <value:string>", "A flag.")
     .action(({ flag }) => {
       // ...
     });
   ```

2. Wire it into `src/main.ts`:

   ```ts
   import { <name> } from "./commands/<name>/command.ts";

   const cli = new Command()
     // ...
     .command("<name>", <name>);
   ```

That's it. Registration is explicit (rather than filesystem auto-discovery) because `deno compile` snapshots the bundle — runtime directory walks don't work inside the compiled binary.

## Building a standalone binary

```sh
deno task compile
./dist/projector hello --name Echo
```

The resulting binary embeds the Deno runtime and all dependencies. No Deno install required to run it.
