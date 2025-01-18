"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import axios from "axios";

function CreatePrompt() {
  const router = useRouter(); // Use router from next/navigation
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const getPromptDetail = async () => {
      const res = await axios.get(`/api/prompt/${promptId}`);
      console.log(res);

      setPost({ prompt: res.data.prompt, tag: res.data.tag });
    };
    if (promptId) getPromptDetail();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true); // Set submitting state to true
    if (!promptId) {
      return alert("Prompt Id not found");
    }

    try {
      const response = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
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
      type="Edit"
      submitting={submitting} // Updated to match corrected spelling
      post={post}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  );
}

export default CreatePrompt;
