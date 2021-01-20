export function getRedirectTo(type, header) {
    let path;
    console.log('type', type);
    if (type === 'jobSeeker') {
        path = '/jobSeeker'
    } else {
        path = '/boss'
    }
    if (!header) {
        path = `${path}info`
    }
    return path;
}