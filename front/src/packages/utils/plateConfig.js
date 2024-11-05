export default function createEditConfig() {
    let componentList = [];
    let componentMap = {};

    return {
        componentList,
        componentMap,
        register: (elem) => {
            componentList.push(elem);
            componentMap[elem.key] = elem;
        }
    }
}
