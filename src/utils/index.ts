import { AxiosError, AxiosResponse } from "axios";
import { getInput } from "@actions/core";
import * as ERRORS from "../constants/errors";
import * as TRIGGERS from "../constants/triggers";
import { ALWAYS_PASS } from "../constants/inputs";

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

export const shouldPass = (): boolean => {
  return getInput(ALWAYS_PASS) === "true";
};

interface ErrorInfo {
  message: string;
  status: number;
  response?: AxiosResponse;
}
export const getErrorInfo = (err: any): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: "Unknown error",
    status: 500,
  };
  if (err instanceof Error) {
    errorInfo.message = err.message;
  }
  if (isAxiosError(err) && err.response) {
    errorInfo.response = err.response;
    errorInfo.status = err.response.status;
  }

  return errorInfo;
};
