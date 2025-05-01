import dotenv from "dotenv";
dotenv.config();
import { GroundhoggClient } from "./client";
const gh = new GroundhoggClient({
    baseUrl: process.env.GROUNDHOGG_API_URI,
    publicKey: process.env.GROUNDHOGG_PUBLIC_KEY,
    token: process.env.GROUNDHOGG_TOKEN,
    defaultFrom: "parth@mail.snitchfeed.com",
});
async function main() {
    await gh.createContact({
        email: "hello@parthkoshti.com",
        first_name: "Parth",
        last_name: "Koshti",
    });
    const response = await gh.sendEmail({
        to: ["hello@parthkoshti.com"],
        subject: "Transaction Email Test",
        fromEmail: "parth@snitchfeed.com",
        fromName: "Parth from SnitchFeed",
        type: "transactional",
        content: "<p>I'm sending you an email from the API!</p>",
        replyTo: "parth@snitchfeed.com",
    });
    console.log(response.status);
}
main();
