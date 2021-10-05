import * as utils from "./index";
import * as ERRORS from "../constants/errors";
import * as core from "@actions/core";
import { ALLOWED_PROJECTS, BLOCKED_PROJECTS } from "../constants/inputs";

test("getProjectsFromInput should return array of project gids", () => {
  jest.spyOn(core, "getInput").mockImplementation((type: string) => {
    switch (type) {
      case ALLOWED_PROJECTS:
        return "1\n2\n3";
      case BLOCKED_PROJECTS:
        return "";
      default:
        return "";
    }
  });

  expect(utils.getProjectsFromInput(ALLOWED_PROJECTS)).toEqual(["1", "2", "3"]);
  expect(utils.getProjectsFromInput(BLOCKED_PROJECTS)).toEqual([]);
});

describe("validateTrigger", () => {
  test("should throw an error if wrong eventType was provided", () => {
    expect(() => utils.validateTrigger("push")).toThrow(ERRORS.WRONG_TRIGGER);
  });

  test("should not throw an error if wrong eventType was provided", () => {
    expect(() => utils.validateTrigger("pull_request")).not.toThrow();
    expect(() => utils.validateTrigger("pull_request_review")).not.toThrow();
    expect(() =>
      utils.validateTrigger("pull_request_review_comment")
    ).not.toThrow();
  });
});

describe("validateProjectLists", () => {
  test("should throw an error if both projects lists are not empty", () => {
    expect(() => utils.validateProjectLists(["1"], ["1"])).toThrow(
      ERRORS.BOTH_PROJECT_LISTS_ARE_NOT_EMPTY
    );
  });
  test("should not throw an error if only one projects list is not empty", () => {
    expect(() => utils.validateProjectLists(["1"], [])).not.toThrow();
    expect(() => utils.validateProjectLists([], ["1"])).not.toThrow();
  });
});
