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
export const deepCopy = (obj) => { };

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => { };



// 

const obj = {
    name: 'test',
    prop: { obj: { name: 'bohdan', arr: [1, 2, 3] } },
};
const nextObj = {
    name: 'test',
    prop: { obj: { name: 'bohdan', arr: [1, 2, 3] } },
};
// -----------------------------


// let arrs1 = ToArray(obj);
// let arrs2 = ToArray(nextObj);
// function ToArray(objects) {
//     const arrs = [];
//     const fun = (object) => {
//         for (let key in object) {
//             arrs.push(key);
//             if (typeof object[key] === 'object') {
//                 fun(object[key]);
//             } else {
//                 arrs.push(object[key]);
//             }
//         }
//         return arrs;
//     }
//     fun(objects);
//     return arrs;
// }
// for (let i = 0; i < arrs1.length; i++) {
//     if (arrs1[i] !== arrs2[i]) {
//         return false;
//     };
// }
// typeof object === 'object' && !Array.isArray(object)