import { Dispatch, FormEventHandler, SetStateAction, useRef, useState } from "react";
import { ThemeName, useUserTheme } from "../ThemeContext";

import { HeroGrid } from "./HeroGrid";
import Image from "next/image";
import { Input } from "./Input";
import { ScrapeTarget } from "../../pages";
import { Subtext } from "./Subtext";
import { fetchMetadataFromSearch } from "api/client/fetchMetadata";

/** @jsxImportSource @emotion/react */

type HeroProps = { setScrapeTargets: Dispatch<SetStateAction<ScrapeTarget[]>> };
export const Hero = (props: HeroProps) => {
  const { setScrapeTargets } = props;
  const { userTheme } = useUserTheme();

  const urlInputRef = useRef<HTMLInputElement>(null);
  const siteInputRef = useRef<HTMLInputElement>(null);
  const queryInputRef = useRef<HTMLInputElement>(null);
  const [formView, setFormView] = useState<"single_site" | "google_search">("single_site");

  const handleSubmitSingleSite: FormEventHandler = (e) => {
    e.preventDefault();

    if (urlInputRef.current) {
      try {
        new URL(urlInputRef.current.value);
        const urlTarget = {
          url: urlInputRef.current.value,
        };

        setScrapeTargets((prev) => [...prev, urlTarget]);
        urlInputRef.current.value = "";
      } catch (error) {
        console.error("Invalid url");
      }
    }
  };

  const handleSubmitGoogleSearch: FormEventHandler = async (e) => {
    e.preventDefault();

    if (siteInputRef.current && queryInputRef.current) {
      const searchTarget = {
        site: siteInputRef.current.value,
        query: queryInputRef.current.value,
      };

      try {
        // new URL(siteInputRef.current.value);
        // const asd = await fetchMetadataFromSearch({
        //   site: siteInputRef.current.value,
        //   query: queryInputRef.current?.value,
        // });

        // const newUrls = asd?.map((newUrl) => newUrl.url);
        setScrapeTargets((prev) => [...prev, searchTarget]);
      } catch (error) {
        console.error("Invalid url");
      }
    }
  };

  return (
    <HeroGrid>
      <span>
        <a href="https://github.com/wenchonglee/rich-link-preview" target="_blank" rel="noreferrer">
          <Image
            src={userTheme === ThemeName.Dark ? "/github-light.png" : "/github-dark.png"}
            alt="Github-icon"
            height={16}
            width={16}
          />
        </a>
      </span>
      <h1>Rich link preview </h1>
      <Subtext>
        Messaging apps today show a preview of the pasted link <br />
        Is your website handling meta tags well? Enter your url to check it out
      </Subtext>

      <br />

      {formView === "single_site" ? (
        <form onSubmit={handleSubmitSingleSite}>
          <Input autoFocus ref={urlInputRef} type="url" placeholder="Enter Url" />
          <a onClick={() => setFormView("google_search")}>or search your site</a>
        </form>
      ) : (
        <form onSubmit={handleSubmitGoogleSearch}>
          <Input autoFocus ref={siteInputRef} type="url" placeholder="e.g. youtube.com" />
          <Input ref={queryInputRef} type="text" placeholder="e.g. test" />
          <button onClick={handleSubmitGoogleSearch}>go search</button>
          <a onClick={() => setFormView("single_site")}>back</a>
        </form>
      )}
      <br />

      <Subtext>
        Read more about Open Graph Protocol{" "}
        <a href="https://ogp.me/" target="_blank" rel="noreferrer">
          here
        </a>
      </Subtext>
    </HeroGrid>
  );
};
