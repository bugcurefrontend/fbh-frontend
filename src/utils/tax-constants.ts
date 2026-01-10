export interface IdType {
    value: string;
    label: string;
}

// ID types available for Indian citizens
export const indianIdTypes: IdType[] = [
    { value: "pan", label: "PAN" },
    { value: "passport", label: "Passport" },
    { value: "aadhar", label: "Aadhar" },
    { value: "license", label: "Driver's License" },
    { value: "voter", label: "Voter ID" },
    { value: "ration", label: "Ration Card" },
];

// ID types available for foreign citizens
export const foreignIdTypes: IdType[] = [
    { value: "pan", label: "Indian PAN" },
    { value: "passport", label: "Passport" },
];

// India country ID (from the API, not ISO numeric code)
export const INDIA_COUNTRY_CODE = 358;

// Enum mapping for ID types
export const idTypeEnum: Record<string, string> = {
    pan: "Pancard",
    passport: "Passport",
    aadhar: "Aadhar Card",
    license: "Driving License",
    voter: "Voter Id",
    ration: "Ration Card",
};
