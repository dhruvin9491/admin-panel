export const generateUniqId = () => {
    return window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export const generateRandomNumber = (from = 0, to = 100) => {
    if (from > to) throw new Error("Invalid range: 'from' should be less than or equal to 'to'");

    return Math.floor(Math.random() * (to - from + 1)) + from;
};