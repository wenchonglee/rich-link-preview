import React, { FormEventHandler, useRef, useState } from "react";

import { RichLinkPreview } from "./RichLinkPreview";
import { RichLinkPreviewListContainer } from "./RedditList";

export const Form = (props: unknown) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[]>([]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      try {
        const urlInterface = new URL(inputRef.current.value);
        const newUrl = inputRef.current.value;
        setUrls((prev) => [...prev, newUrl]);
        inputRef.current.value = "";
      } catch (error) {
        console.error("Invalid url");
      }
    }
  };

  return (
    <RichLinkPreviewListContainer>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>

      {urls.map((url, index) => {
        return <RichLinkPreview scrapeResponse={null} url={url} key={index} />;
      })}
    </RichLinkPreviewListContainer>
  );
};
