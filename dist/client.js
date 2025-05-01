import ky from "ky";
export class GroundhoggClient {
    constructor({ baseUrl, publicKey, token, defaultFrom, defaultReplyto, }) {
        this.defaultFrom = defaultFrom;
        this.defaultReplyto = defaultReplyto || defaultFrom;
        this.client = ky.create({
            prefixUrl: baseUrl,
            headers: {
                "Gh-Token": token,
                "Gh-Public-Key": publicKey,
                "Content-Type": "application/json",
            },
            hooks: {
                beforeRequest: [
                    (request) => {
                        request.headers.set("Accept", "application/json");
                    },
                ],
            },
        });
    }
    // Helper method for handling errors
    async handleResponse(res) {
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`API Error: ${res.status} - ${errorMessage}`);
        }
        return res.json();
    }
    async createContact(data) {
        try {
            const res = await this.client.post("wp-json/gh/v4/contacts", {
                json: data,
            });
            return await this.handleResponse(res);
        }
        catch (error) {
            console.error("Error creating contact:", error);
            throw error;
        }
    }
    async getContact(email) {
        try {
            const res = await this.client.get("wp-json/gh/v4/contacts", {
                searchParams: {
                    search: email,
                },
            });
            const data = await this.handleResponse(res);
            return data.items?.[0] || null;
        }
        catch (error) {
            console.error("Error fetching contact by email:", error);
            throw error;
        }
    }
    async addOrRemoveTags({ email, addTags, removeTags, }) {
        try {
            const contact = await this.getContact(email);
            if (!contact) {
                throw new Error(`Contact with email ${email} not found`);
            }
            const res = await this.client.put(`wp-json/gh/v4/contacts/${contact.ID}`, {
                json: {
                    add_tags: addTags,
                    remove_tags: removeTags,
                },
            });
            return await this.handleResponse(res);
        }
        catch (error) {
            console.error("Error updating contact:", error);
            throw error;
        }
    }
    async deleteContact(email) {
        try {
            const contact = await this.getContact(email);
            if (!contact) {
                throw new Error(`Contact with email ${email} not found`);
            }
            const res = await this.client.delete(`wp-json/gh/v4/contacts/${contact.ID}`);
            return await this.handleResponse(res);
        }
        catch (error) {
            console.error("Error deleting contact:", error);
            throw error;
        }
    }
    async sendEmail({ to, subject, fromEmail, fromName, replyTo, type, content, }) {
        try {
            const res = await this.client.post("wp-json/gh/v4/emails/send", {
                json: {
                    to,
                    subject,
                    from_email: fromEmail || this.defaultFrom,
                    from_name: fromName,
                    type,
                    content,
                    reply_to: replyTo || fromEmail || this.defaultReplyto,
                },
            });
            return await this.handleResponse(res);
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}
