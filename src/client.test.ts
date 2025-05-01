import { describe, it, expect, beforeAll } from "vitest";
import dotenv from "dotenv";
dotenv.config();

import { GroundhoggClient } from "./client";

const gh = new GroundhoggClient({
  baseUrl: process.env.GROUNDHOGG_API_URI!,
  publicKey: process.env.GROUNDHOGG_PUBLIC_KEY!,
  token: process.env.GROUNDHOGG_TOKEN!,
  defaultFrom: process.env.TEST_FROM!,
});

const TEST_EMAIL = process.env.TEST_EMAIL!;

describe("GroundhoggClient", () => {
  beforeAll(async () => {
    await gh.createContact({
      email: TEST_EMAIL,
      first_name: "Test First Name",
      last_name: "Test Last Name",
      tags: ["test"],
    });
  });

  it("should retrieve contact by email", async () => {
    const contact = await gh.getContact(TEST_EMAIL);
    expect(contact).toBeDefined();
    expect(contact.ID).toBeDefined();
  });

  it("should add and remove tags", async () => {
    const res = await gh.addOrRemoveTags({
      email: TEST_EMAIL,
      addTags: ["newsletter"],
      removeTags: ["test"],
    });
    expect(res.status).toBe("success");
  });

  it("should send a transactional email", async () => {
    const res = await gh.sendEmail({
      to: [TEST_EMAIL],
      subject: "Transactional Email Test",
      fromEmail: process.env.TEST_FROM!,
      fromName: "GroundHogg API Test",
      type: "transactional",
      content: "<p>This is a test email from vitest.</p>",
      replyTo: process.env.TEST_FROM!,
    });
    expect(res.status).toBe("success");
  });

  it("should delete the contact", async () => {
    const res = await gh.deleteContact(TEST_EMAIL);
    expect(res.status).toBe("success");
  });
});
