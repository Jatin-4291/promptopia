import { connectToDB } from "@utils/database";
import Prompt from "@models/promptModels";
export const GET = async (request) => {
  try {
    connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to Fetch all Prompts", { status: 500 });
  }
};
