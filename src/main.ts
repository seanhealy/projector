import { Command } from "@cliffy/command";
import { hello } from "./commands/hello/command.ts";

const cli = new Command()
  .name("projector")
  .version("0.1.0")
  .description("Projector — a personal CLI toolkit.")
  .command("hello", hello);

if (import.meta.main) {
  await cli.parse(Deno.args);
}
