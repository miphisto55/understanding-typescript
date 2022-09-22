"use strict";
var Generics;
(function (Generics) {
    // These are all the same thing
    // const names1 = ['Alex', 'Karah'];
    // const names2: Array<string> = ['Alex', 'Karah'];
    // const names3: string[] = ['Alex', 'Karah'];
    // // Working with generic types - we can tell the Promise that we specifically are expecting a string return
    // const promise: Promise<string> = new Promise( (resolve, reject) => {
    //     setTimeout( () => {
    //         resolve('This is done!');
    //     }, 2000)
    // });
    // promise.then(data => {
    //     data.split(' ');
    // })
    function merge(objA, objB) {
        return Object.assign(objA, objB);
    }
    console.log(merge({ name: 'Alex' }, { age: 69 }));
    const mergedObj = merge({ name: 'Alex', hobbies: ['Programming', 'Sports'] }, { age: 69 }); // Hover over mergedObj to see how that intersection worked.
    console.log(mergedObj);
    function countAndDescribe(element) {
        let descText = 'I have no value.';
        if (element.length === 1) {
            descText = 'I have 1 element.';
        }
        else if (element.length > 1) {
            descText = 'I have ' + element.length + ' elements.';
        }
        return [element, descText];
    }
    console.log(countAndDescribe('Hi there!'));
    console.log(countAndDescribe(['One', 'Two']));
    console.log(countAndDescribe([]));
    // console.log(countAndDescribe(1));    // will not work because of course numbers do not have a "length" property
    function extractAndConvert(obj, key) {
        return 'Value: ' + obj[key];
    }
    class MyKeyedObject {
        constructor(name, age) {
            this.name = 'default';
            this.age = 0;
            this.name = name;
            this.age = age;
        }
    }
    const objWithKey = new MyKeyedObject('Alex', 32);
    const extracedAge = extractAndConvert(objWithKey, 'age');
    console.log(extracedAge);
    class DataStorage {
        constructor() {
            this.data = [];
        }
        addItem(item) {
            this.data.push(item);
        }
        removeItem(item) {
            this.data.splice(this.data.indexOf(item), 1);
        }
        getItems() {
            return [...this.data];
        }
    }
    const textStorage = new DataStorage();
    textStorage.addItem("Alex");
    textStorage.addItem("Karah");
    textStorage.removeItem("Alex");
    console.log(textStorage.getItems());
})(Generics || (Generics = {}));
//# sourceMappingURL=app.js.map