import { Command } from "@cliffy/command";

export const hello = new Command()
  .description("Say hello.")
  .option("-n, --name <name:string>", "Who to greet.", { default: "world" })
  .action(({ name }) => {
    console.log(`Hello, ${name}!`);
  });
