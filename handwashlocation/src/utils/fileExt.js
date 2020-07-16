export default function fileExt(filename) {
    const parts = filename.split('.')
    return parts[parts.length - 1]
}