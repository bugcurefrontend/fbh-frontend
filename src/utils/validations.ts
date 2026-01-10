const validationMessage = {
    required: "This field is required*",
    email: "Please enter a valid Email ID",
    phoneNo: "Please enter a valid Contact Number",
    pinCode: "Please enter a valid Pincode",
    zipCode: "Please enter a valid Zip Code (4-8 alphanumeric characters)",
    panNoPattern: "Please enter a valid PAN Number",
    aadharPattern: "Please enter a valid Aadhar No",
    abhyasiIdPattern: "Please enter a valid Abhyasi ID",
    name: "Whitespaces are not allowed at the start & Special characters are not allowed.",
    whitespace: "Whitespaces/Special Char are not allowed at the beginning or end.",
    alphabet: "Only alphabets are allowed",
    driverLicense: "Invalid Driver's License number",
    voterId: "Invalid Voter ID number",
    passport: "Invalid Passport number",
    rationCard: "Invalid Ration Card number",
};

export interface Validation {
    value: RegExp | boolean;
    message: string;
}

const validations: Record<string, Validation> = {
    required: {
        value: true,
        message: validationMessage.required,
    },

    name: {
        value: /^[^ ][^<>'"\\\/;^`~_=+|?!@#$%^&*()\[\]{}0-9]*$/,
        message: validationMessage.name,
    },

    alphabet: {
        value: /^[^ ][^<>'"\\\/;^`~_=+|?!@#$%^&*()\[\]{}0-9]*$/,
        message: validationMessage.alphabet,
    },

    email: {
        value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: validationMessage.email,
    },

    phoneNo: {
        value: /^[+][0-9]{10,14}$/,
        message: validationMessage.phoneNo,
    },

    pinCode: {
        value: /^[0-9]{6}$/,
        message: validationMessage.pinCode,
    },

    zipCode: {
        value: /^[a-zA-Z0-9]{4,8}$/,
        message: validationMessage.zipCode,
    },

    abhyasiId: {
        value: /^([a-zA-Z]{6}[0-9]{3}|[HABhab]{1}[0-9]{8})$/,
        message: validationMessage.abhyasiIdPattern,
    },

    panNo: {
        value: /^([A-Z]{5}[0-9]{4}[A-Z]{1})$/,
        message: validationMessage.panNoPattern,
    },

    aadhar: {
        value: /^[0-9]{12}$/,
        message: validationMessage.aadharPattern,
    },

    whiteSpace: {
        value: /^[A-Za-z0-9]+(?: +[A-Za-z0-9]+)*$/,
        message: validationMessage.whitespace,
    },

    license: {
        value: /^[A-Z0-9-\S]{0,20}$/,
        message: validationMessage.driverLicense,
    },

    voterId: {
        value: /^[A-Z0-9-\S]{0,20}$/,
        message: validationMessage.voterId,
    },

    passport: {
        value: /^[A-Z0-9-\S]{0,20}$/,
        message: validationMessage.passport,
    },

    ration: {
        value: /^[A-Z0-9-\S]{0,20}$/,
        message: validationMessage.rationCard,
    },
};

export default validations;
