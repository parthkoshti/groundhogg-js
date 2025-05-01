# GroundhoggClient

[![NPM Version](https://img.shields.io/npm/v/groundhogg-client.svg)](https://www.npmjs.com/package/groundhogg-js)
[![License](https://img.shields.io/github/license/snitchfeed/groundhogg-client)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](./tests)

A lightweight TypeScript client for interacting with the [Groundhogg v4 REST API](https://help.groundhogg.io/collection/141-developers). Easily manage contacts, tags, and send transactional or marketing emails via API.

---

## Features

- ✅ Create, fetch, update, and delete contacts
- 🏷️ Add or remove tags by email
- 📩 Send transactional or marketing emails
- 🌱 Fully typed with TypeScript
- 🧪 Tested with [Vitest](https://vitest.dev)

---

## Installation

```bash
# With pnpm
pnpm add groundhogg-js

# Or with npm
npm install groundhogg-js

# Or with yarn
yarn add groundhogg-js

```

## Usage

```typescript
import { GroundhoggClient } from "groundhogg-client";
import dotenv from "dotenv";

dotenv.config();

const gh = new GroundhoggClient({
  baseUrl: process.env.GROUNDHOGG_API_URI!,
  publicKey: process.env.GROUNDHOGG_PUBLIC_KEY!,
  token: process.env.GROUNDHOGG_TOKEN!,
  defaultFrom: "no-reply@yourdomain.com",
});
```

### Create Contact

```typescript
await gh.createContact({
  email: "john@example.com",
  first_name: "John",
  last_name: "Doe",
  tags: [123, "newsletter"],
});
```

### Get Contact

```typescript
const contact = await gh.getContact("john@example.com");
console.log(contact);
```

### Add or Remove Tags

```typescript
await gh.addOrRemoveTags({
  email: "john@example.com",
  addTags: ["customer"],
  removeTags: [123],
});
```

### Delete Contact

```typescript
await gh.deleteContact("john@example.com");
```

### Send Email

```typescript
await gh.sendEmail({
  to: ["john@example.com"],
  subject: "Welcome!",
  fromEmail: "team@yourdomain.com",
  fromName: "Your Team",
  type: "transactional",
  content: "<p>Thanks for joining!</p>",
  replyTo: "support@yourdomain.com",
});
```

## Environment Variables

The client expects the following environment variables (or pass them directly):

```bash
GROUNDHOGG_API_URI=https://yourdomain.com
GROUNDHOGG_PUBLIC_KEY=your-public-key
GROUNDHOGG_TOKEN=your-token
```

## License

MIT © [Parth Koshti](https://github.com/parthkoshti)
