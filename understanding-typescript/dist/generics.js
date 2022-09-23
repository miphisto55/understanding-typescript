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
            const indexNotFoundFromSplice = -1;
            if (this.data.indexOf(item) === indexNotFoundFromSplice) {
                this.data.splice(this.data.indexOf(item), 1);
            }
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
    const numberStorage = new DataStorage();
    numberStorage.addItem(5);
    numberStorage.addItem(3);
    numberStorage.removeItem(5);
    console.log(numberStorage.getItems());
    function createCourseGoal(title, desc, date) {
        // The partial keyword allows you to make objects with OPTIONAL fields/properties
        // Useful if we want to do some validation in here or something else with the data before
        // setting this fields one by one.
        // Otherwise we could just make a new courseGoal object and simply assign each property the correct value
        // between the object curly braces
        let courseGoal = {};
        courseGoal.title = title;
        courseGoal.desc = desc;
        courseGoal.completeUntil = date;
        return courseGoal; // And now we want to cast the object from Partial<CourseGoal> to CourseGoal
    }
    function createCourseGoal2(title, desc, date) {
        // Other way that is easier and more common of course
        let courseGoal = {
            title: title,
            desc: desc,
            completeUntil: date
        };
        return courseGoal; // And now we want to cast the object from Partial<CourseGoal> to CourseGoal
    }
    // array is readonly, cannot modify it in any way, push or pop etc..
    const namez = ['Alex', 'Karah'];
    // namez.push("Bob")
})(Generics || (Generics = {}));
//# sourceMappingURL=generics.js.map