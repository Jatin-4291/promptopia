import { connectToDB } from "@utils/database";
import Prompt from "@models/promptModels";

export const POST = async (req) => {
  try {
    // Parse the request body
    const { prompt, userId, tag } = await req.json();

    // Connect to the database
    await connectToDB();

    // Create a new prompt document
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    // Save the prompt to the database
    await newPrompt.save();

    // Return a success response
    return new Response(JSON.stringify({ newPrompt }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating prompt:", error);

    // Return an error response
    return new Response(JSON.stringify({ error: "Failed to create prompt" }), {
      status: 500,
    });
  }
};
