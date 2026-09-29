import { createContext, useContext } from "react";
import { stack } from "../data/stack";
import { projects } from "../data/projects";
import { gallery } from "../data/gallery";
import { events } from "../data/activity";

// What the site shows before (or without) the API: the files in src/data.
export const DEFAULT_CONTENT = {
  skills: stack,
  projects,
  gallery,
  activity: events,
};

export const ContentContext = createContext({
  content: DEFAULT_CONTENT,
  status: "loading",
  reload: () => {},
  setSection: () => {},
});

export function useContent(section) {
  return useContext(ContentContext).content[section];
}

// Everything, for the admin panel.
export function useContentStore() {
  return useContext(ContentContext);
}
