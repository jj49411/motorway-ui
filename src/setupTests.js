import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  // throw an error on unhandled requests
  server.listen({ onUnhandledRequest: "error" });

  // the simulated browser does not support dialog element APIs yet
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };

  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    // dispatch a close event ensures any onClose listeners trigger correctly
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
