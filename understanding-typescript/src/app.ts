namespace Generics {

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

    function merge<T extends object, U extends object>(objA: T, objB: U) {
        return Object.assign(objA, objB);
    }

    console.log(merge( {name: 'Alex'}, {age: 69} ));

    const mergedObj = merge( {name: 'Alex', hobbies: ['Programming', 'Sports']}, {age: 69} ); // Hover over mergedObj to see how that intersection worked.
    console.log(mergedObj);

    interface Lengthy {
        length: number;
    }

    function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
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

    function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
        return 'Value: ' +  obj[key];
    }

    class MyKeyedObject {
        name: string = 'default';
        age: number = 0;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

    }

    const gogo = new MyKeyedObject('Alex', 32);
    const extracedAge = extractAndConvert(gogo, 'age');
    console.log(extracedAge);
}