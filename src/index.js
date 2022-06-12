/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
    let arrs1 = ToArray(obj);
    let arrs2 = ToArray(anotherObject);

    function ToArray(objects) {
        const arrs = [];
        const fun = (object) => {
            for (let key in object) {
                arrs.push(key);
                if (typeof object[key] === 'object') {
                    fun(object[key]);
                } else {
                    arrs.push(object[key]);
                }
            }
            return arrs;
        }
        fun(objects);
        return arrs;
    }
    for (let i = 0; i < arrs1.length; i++) {
        if (arrs1[i] !== arrs2[i]) {
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
            if ((typeof obj[key]) == "object" && !Array.isArray(obj[key])) {
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
            if ((typeof obj[key]) == 'object') {
                arr.concat(nameToArr(arr, obj[key]));
            }
            else {
                arr.push(key);
            }
        }
        const objInArr = new Set(arr);
        const arrInObj = [...objInArr]

        return arrInObj;

    }
    return nameToArr(obj);
};

// const obj2 = { prop: 'bohdan', obj: { arr: 1 } };
// const obj1 = {
//     name: 'test',
//     prop: { obj: { name: 'bohdan', arr: [1, 2, 3], iss: true } },
// };
// -----------------------------

// let q = deepCopy3([], obj1);
// console.log(q);

// function deepCopy3(arr, obj) {
//     for (let key in obj) {
//         arr.push(key);
//         if ((typeof obj[key]) == 'object') {
//             arr.concat(deepCopy3(arr, obj[key]));
//         }
//         else {
//             arr.push(key);
//         }
//     }
//     arr = new Set(arr);
//     return [...arr];

// }
