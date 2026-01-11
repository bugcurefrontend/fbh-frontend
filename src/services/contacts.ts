/**
 * Contact Form API Service
 * Handles submission of contact form data to Strapi
 */

import { fetchAPI } from "./api";
import { ContactFormData, ContactApiResponse } from "@/types/contact";

/**
 * Submit contact form data to Strapi
 * @param formData - Contact form data with first_name, last_name, email, message
 * @returns Promise with the created contact submission
 */
export async function submitContactForm(
    formData: ContactFormData
): Promise<ContactApiResponse> {
    try {
        const response = await fetchAPI(
            "/contacts",
            {},
            {
                method: "POST",
                body: JSON.stringify({ data: formData }),
            }
        );

        return response;
    } catch (error) {
        console.error("Error submitting contact form:", error);
        throw error;
    }
}
