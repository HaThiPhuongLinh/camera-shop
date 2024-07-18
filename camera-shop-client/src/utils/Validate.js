
const isValidFullName = (name) => {
    // Check if the name consists of at least 2 words
    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
        return false;
    }

    // Check if each word starts with a capital letter
    for (const word of words) {
        if (!word.match(/^[A-Z]/)) {
            return false;
        }
    }

    return true;
};

const isValidEmail = (email) => {
    // You can use a more robust email regex if needed
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
    // Check if password meets the requirements
    if (password.length < 8) {
        return false;
    }
    if (!password.match(/^[A-Z]/)) {
        return false;
    }
    if (!password.match(/[0-9]/)) {
        return false;
    }
    if (!password.match(/[^A-Za-z0-9]/)) {
        return false;
    }
    return true;
};

const isValidPhone = (phone) => {
    // Check if phone number is valid
    const phoneRegex = /^\d{10}$|^\d{11}$/;
    return phoneRegex.test(phone);
};

const isValidAddress = (address) => {
    // Check if the address has at least 2 words
    const words = address.trim().split(/\s+/);
    if (words.length < 2) {
        return false;
    }

    // Check if it contains at least one number
    if (!address.match(/[0-9]/)) {
        return false;
    }

    return true;
};

export { isValidFullName, isValidEmail, isValidPassword, isValidPhone, isValidAddress };