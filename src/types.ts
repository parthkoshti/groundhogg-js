export type UpdateContact = {
  id_or_email: string | number;
  by_user_id?: boolean;
  contact: Omit<ContactResponse, "email">;
};

export type ContactResponse = {
  ID: number;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    user_id: number;
    owner_id: number;
    optin_status: number;
    date_created: string;
    date_optin_status_changed: string;
    ID: number;
    gravatar: string;
    age: number;
  };
  meta: {
    ip_address: string;
  };
  tags: Array<{
    ID: number;
    data: {
      tag_id: number;
      tag_slug: string;
      tag_name: string;
      tag_description: string;
      contact_count: string;
      show_as_preference: string;
    };
  }>;
  files: Array<{
    file_name: string;
    file_path: string;
    file_url: string;
    date_uploaded: number;
  }>;
  user: {
    data: {
      ID: string;
      user_login: string;
      user_nicename: string;
      user_email: string;
      user_url: string;
      user_registered: string;
      user_activation_key: string;
      user_status: string;
      display_name: string;
    };
    ID: number;
    caps: {
      subscriber: boolean;
    };
    cap_key: string;
    roles: Array<string>;
    allcaps: {
      read: boolean;
      level_0: boolean;
      subscriber: boolean;
    };
    filter: any;
  };
  notes: Array<{
    ID: string;
    data: {
      object_id: number;
      object_type: string;
      user_id: string;
      context: string;
      content: string;
      timestamp: string;
      date_created: string;
      ID: string;
    };
  }>;
};
