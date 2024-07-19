const getImageUrl = (profile) => {
    if (!profile) return null;
    return typeof profile === 'string' ? profile : URL.createObjectURL(profile);
};

export default getImageUrl;