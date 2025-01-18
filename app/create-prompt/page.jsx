"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import axios from "axios";

function CreatePrompt() {
  const { data: session } = useSession(); // Access session data correctly
  const router = useRouter(); // Use router from next/navigation
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true); // Set submitting state to true

    try {
      const response = await axios.post("/api/prompt/new", {
        prompt: post.prompt,
        userId: session?.user?.id, // Ensure session and user ID are valid
        tag: post.tag,
      });
      console.log(response);

      if (response.status == 201) {
        router.push("/"); // Redirect to homepage after success
      } else {
        console.error("Failed to create the prompt:", response.statusText);
      }
    } catch (error) {
      console.error("Error while creating the prompt:", error);
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Form
      type="Create"
      submitting={submitting} // Updated to match corrected spelling
      post={post}
      setPost={setPost}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;
