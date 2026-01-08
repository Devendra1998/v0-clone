import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import Sandbox from "@e2b/code-interpreter";



export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },

  async ({ event, step }) => {

    const sandBoxId = await step.run("get-sandbox-id", async () => {
        const sandbox = await Sandbox.create("v0-clone-nextjs-app");
        return sandbox.sandboxId;
    })

    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agent that says hello",
      system: "You are a helpful assistant.",
      model: gemini({
        model: "gemini-2.5-flash",
      }),
    });

    const {output} = await helloAgent.run("Say hello to the user");

    const sandBoxUrl = await step.run("get-sandbox-url", async () => {
        const sandbox = await Sandbox.connect(sandBoxId);
        const host = sandbox.getHost(3000);
        return `http://${host}`;
    })

    return {
        message: output[0].content
    }

  },
);