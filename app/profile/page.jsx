"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@node_modules/next-auth/react";
import axios from "@node_modules/axios";
import Profile from "@components/Profile";
function Myprofile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const isConfirmed = confirm("Are you sure you want to dleete this prompt?");
    if (isConfirmed) {
      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`);
      } catch (error) {
        console.log(error);
      }
      const filteredPost = posts.filter((p) => {
        p.post_id !== post._id;
      });
      setPosts(filteredPost);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/user/${session?.user.id}/post`);
        console.log(res);

        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (session?.user.id) fetchPost();
  }, []);
  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your Personlised Profile Page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Myprofile;
