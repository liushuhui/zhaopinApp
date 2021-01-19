export function getRedirectTo(type, header) {
    let path;
    console.log('pathType', type);
    if (type === 'jobSeeker') {
        path = '/jobSeeker'
    } else {
        path = '/boss'
    }

    return path;
}