const getId = () => '_' + Math.random().toString(36).substr(2, 9);

const include = (list, condition) => {
    let i = 0
    while (i < list.length) {
        if (condition(list[i])) return true
        i++
    }
    return false
}

export { getId, include }
