import { AxiosError } from "axios";
import { getInput } from "@actions/core";
import * as ERRORS from "../constants/errors";
import * as TRIGGERS from "../constants/triggers";

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
