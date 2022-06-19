/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
    let arr1 = ToArray([], obj);
    let arr2 = ToArray([], anotherObject);
    function ToArray(arr, obj) {
        for (let key in obj) {
            arr.push(key);
            if (typeof obj[key] === 'object') {
                ToArray(arr, obj[key]);
            } else {
                arr.push(obj[key]);
            }
        }
        return arr;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
    function deepCopy2(dest, obj) {
        for (let key in obj) {
            if (Array.isArray(obj[key])) dest[key] = [...obj[key]];
            if ((typeof obj[key]) === "object" && !Array.isArray(obj[key])) {
                dest[key] = deepCopy2({}, obj[key]);
            }
            else {
                dest[key] = obj[key];
            }
        }
        return dest;
    }
    return deepCopy2({}, obj);
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
    function nameToArr(arr, obj) {
        for (let key in obj) {
            arr.push(key);
            if ((typeof obj[key]) === 'object') {
                arr.concat(nameToArr(arr, obj[key]));
            }
            else {
                arr.push(key);
            }
        }
        return arr;
    }

    return [... new Set(nameToArr([], obj))];
};

