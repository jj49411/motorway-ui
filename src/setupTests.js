import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };

  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    // Dispatching a close event ensures any 'onClose' listeners in your React component trigger correctly
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
