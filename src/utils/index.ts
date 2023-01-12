import { AxiosError } from "axios";
import { getInput } from "@actions/core";
import * as ERRORS from "../constants/errors";
import * as TRIGGERS from "../constants/triggers";
import * as INPUTS from "../constants/inputs";
import * as ASANA from "../constants/asana";

export const getProjectsFromInput = (inputName: string): String[] => {
  const projects = getInput(inputName);
  if (!projects) return [];

  return projects.split("\n").map((gid) => `${gid}`);
};

export const validateTrigger = (eventName: string) => {
  if (!TRIGGERS.allowed.includes(eventName))
    throw new Error(ERRORS.WRONG_TRIGGER);
};

export const validateProjectLists = (
  allowedProjects: String[],
  blockedProjects: String[]
) => {
  if (allowedProjects.length > 0 && blockedProjects.length > 0)
    throw new Error(ERRORS.BOTH_PROJECT_LISTS_ARE_NOT_EMPTY);
};

export const isAxiosError = (e: any): e is AxiosError => e.isAxiosError;

export const createPRDescription = (prDescription?: string) => {
  const projectGid = getInput(INPUTS.ASANA_PROJECT_GID);
  const taskGid = getInput(INPUTS.ASANA_TASK_GID);

  const asanaTaskLink = `${ASANA.BASE_URL}/${projectGid}/${taskGid}`;

  return projectGid && taskGid
    ? `${prDescription}\n\n${asanaTaskLink}`
    : prDescription;
};
