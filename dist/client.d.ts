export declare class GroundhoggClient {
    private client;
    private defaultFrom;
    private defaultReplyto;
    constructor({ baseUrl, publicKey, token, defaultFrom, defaultReplyto, }: {
        baseUrl: string;
        publicKey: string;
        token: string;
        defaultFrom: string;
        defaultReplyto?: string;
    });
    private handleResponse;
    createContact(data: {
        email: string;
        first_name: string;
        last_name?: string;
        tags?: Array<number | string>;
        [key: string]: any;
    }): Promise<any>;
    getContact(email: string): Promise<any>;
    addOrRemoveTags({ email, addTags, removeTags, }: {
        email: string;
        addTags?: Array<number | string>;
        removeTags?: Array<number | string>;
    }): Promise<any>;
    deleteContact(email: string): Promise<any>;
    sendEmail({ to, subject, fromEmail, fromName, replyTo, type, content, }: {
        to: string[];
        subject: string;
        fromEmail?: string;
        fromName: string;
        replyTo: string;
        type: "marketing" | "transactional";
        content: string;
    }): Promise<any>;
}
