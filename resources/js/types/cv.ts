import { CVTemplateType } from './cv-template';

export type CVType = {
    id: string;
    template_id: string;
    name: string;
    owner_name: string;
    owner_email: string;
    owner_phone: string;
    owner_address: string;
    owner_linkedin: string;
    owner_website: string;
    owner_summary: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
    created_by: string;
    updated_by: string | null;
    template: CVTemplateType;
};
