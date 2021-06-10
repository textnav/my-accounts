import axios from "axios";
import { generateUUID, initializeAxiosMockAdapter } from "./mock.config";

let instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
  },
});

describe("mock utils", () => {
  it("should generate uuid", () => {
    expect(generateUUID()).not.toBeNull();
  });

  it("should generate uuid", async () => {
    const mock = initializeAxiosMockAdapter(instance);
    const res = await mock.onPost("/transfer");
    expect(mock).not.toBeNull();
  });
  it("should call transfer", async () => {
    const mock = initializeAxiosMockAdapter(instance);
    const res = await mock.onPost("/transfer");
    expect(res).not.toBeNull();
  });
});
