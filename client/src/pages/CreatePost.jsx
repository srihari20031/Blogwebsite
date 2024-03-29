import { useState } from "react";
import Editor from "../components/Editor";
import { Navigate } from "react-router";

// const createNewPost = () => {};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", files[0]);
    data.set("content", content);
    console.log(files);
    e.preventDefault();
    const postURL = `${import.meta.env.VITE_REACT_POST_URL}/post`

    const response = await fetch(postURL, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      return setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  );
};

export default CreatePost;
