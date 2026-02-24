
export interface City {
    id: string | number;
    name: string;
    state?: string;
    country?: string;
    complete_name?: string;
}

export interface Country {
    id: number | string;
    name: string;
    code: string;
    active: boolean;
    numeric?: number; // ISO 3166-1 numeric country code
}

export const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const displayCity = ({ name, complete_name }: City) => {
    // If complete_name is provided (from API usually), use it
    if (complete_name) {
        const completeNameParts = complete_name.split("/").reverse().slice(1);
        const completeNameString = completeNameParts.length > 0 ? completeNameParts.join(", ") : "";
        return `${name}${completeNameString ? `, ${completeNameString}` : ``}`;
    }
    // Fallback for when only name is present
    return name;
};

export const formatCityName = (cityName: string) => {
    return cityName?.replace(/\s*,\s*/g, ", ") || "";
};
