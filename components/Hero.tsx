import { Dispatch, FormEventHandler, SetStateAction, useRef, useState } from "react";

import Image from "next/image";

/** @jsxImportSource @emotion/react */

export const Hero = ({ setUrls }: { setUrls: Dispatch<SetStateAction<string[]>> }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      try {
        new URL(inputRef.current.value);
        const newUrl = inputRef.current.value;
        setUrls((prev) => [...prev, newUrl]);
        inputRef.current.value = "";
      } catch (error) {
        console.error("Invalid url");
      }
    }
  };

  return (
    <div
      css={{
        display: "grid",
        placeContent: "center",
        justifyContent: "flex-start",
      }}
    >
      <h1>Rich link preview </h1>
      <p
        css={(theme) => ({
          fontSize: theme.fontSize.s,
          color: theme.color.text2,
        })}
      >
        Messaging apps today show a preview of the pasted link <br />
        Is your website handling meta tags well? Enter your url to check it out
      </p>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          ref={inputRef}
          type="url"
          placeholder="Enter Url"
          css={(theme) => ({
            backgroundColor: theme.color.surface2,
            color: theme.color.text1,
            border: "none",
            width: "50ch",
            borderRadius: "6px",
            padding: theme.space.s,
            transition:
              "box-shadow 200ms ease-out,background-image 200ms ease-out,background-size 200ms ease-out,background-color 200ms ease-out",
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
            "&:focus": {
              outline: "none",
              backgroundSize: "100% 100%",
              backgroundImage: "linear-gradient(to top, #07C, #07C 2px, transparent 2px, transparent 100%)",
              backgroundColor: theme.color.surface3,
            },
            "&:invalid": {
              backgroundImage:
                "linear-gradient(to top, #BD271E, #BD271E 2px, transparent 2px, transparent 100%)!important",
              backgroundSize: "100% 100%",
            },
          })}
        />
      </form>
      <br />

      <p
        css={(theme) => ({
          color: theme.color.text2,
          fontSize: theme.fontSize.s,
        })}
      >
        Read more about Open Graph Protocol{" "}
        <a href="https://ogp.me/" target="_blank" rel="noreferrer">
          here
        </a>
      </p>

      <p>
        <a href="https://github.com/wenchonglee/rich-link-preview" target="_blank" rel="noreferrer">
          <Image
            src={window.matchMedia("(prefers-color-scheme: dark)").matches ? "/github-light.png" : "/github-dark.png"}
            alt="github-icon"
            height={16}
            width={16}
          />
        </a>
      </p>
    </div>
  );
};
