import { Dispatch, FormEventHandler, SetStateAction, useRef, useState } from "react";
import { ThemeName, useUserTheme } from "../ThemeContext";

import { Button } from "./Button";
import { HeroGrid } from "./HeroGrid";
import Image from "next/image";
import { Input } from "./Input";
import { Label } from "./Label";
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
        setScrapeTargets((prev) => {
          console.log(prev);
          console.log([urlTarget, ...prev]);
          return [urlTarget, ...prev];
        });
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
        setScrapeTargets((prev) => [searchTarget, ...prev]);
      } catch (error) {
        console.error("Invalid url");
      }
    }
  };

  return (
    <HeroGrid>
      <span>
        <a
          href="https://github.com/wenchonglee/rich-link-preview"
          target="_blank"
          rel="noreferrer"
          css={{
            "&:-webkit-any-link": {
              textDecoration: "none",
            },
          }}
        >
          <Image
            src={userTheme === ThemeName.Dark ? "/github-light.png" : "/github-dark.png"}
            alt="Github-icon"
            height={16}
            width={16}
          />{" "}
          <span>@wenchonglee</span>
        </a>
      </span>
      <h1>Rich link preview </h1>
      <Subtext>
        Messaging apps today show a preview of the pasted link <br />
        Enter a url or try a google search on your site
      </Subtext>

      <br />

      {formView === "single_site" ? (
        <form onSubmit={handleSubmitSingleSite}>
          <div
            css={(theme) => ({
              display: "grid",
              gap: theme.space.md,
            })}
          >
            <div>
              <Label htmlFor="url">Enter a Url</Label>
              <Input
                id="url"
                autoFocus
                ref={urlInputRef}
                type="url"
                placeholder="e.g. https://github.com/wenchonglee/rich-link-preview"
              />
            </div>

            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Subtext
                as="a"
                onClick={() => setFormView("google_search")}
                css={{ display: "block", cursor: "pointer" }}
              >
                Search your site instead
              </Subtext>

              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitGoogleSearch}>
          <div
            css={(theme) => ({
              display: "grid",
              gap: theme.space.md,
            })}
          >
            <div>
              <Label htmlFor="query">Enter a search query</Label>
              <Input id="query" ref={queryInputRef} type="text" placeholder="e.g. test" />
            </div>

            <div>
              <Label htmlFor="site">Enter a url</Label>
              <Input id="site" autoFocus ref={siteInputRef} type="url" placeholder="e.g. https://youtube.com" />
            </div>

            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Subtext as="a" onClick={() => setFormView("single_site")} css={{ display: "block", cursor: "pointer" }}>
                Enter a single url instead
              </Subtext>

              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      )}
      <br />
    </HeroGrid>
  );
};
