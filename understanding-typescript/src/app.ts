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

    function extractAndConvert<T extends object, U extends keyof T>
    (obj: T, key: U) {
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

    const objWithKey = new MyKeyedObject('Alex', 32);
    const extracedAge = extractAndConvert(objWithKey, 'age');
    console.log(extracedAge);

    class DataStorage<T> {
        private data: T[] = [];

        addItem(item: T) {
            this.data.push(item);
        }

        removeItem(item: T) {
            const indexNotFoundFromSplice: number = -1;

            if (this.data.indexOf(item) === indexNotFoundFromSplice) {
                this.data.splice(this.data.indexOf(item), 1);
            }
        }

        getItems() {
            return [...this.data];
        }
    }

    const textStorage = new DataStorage<string>();
    textStorage.addItem("Alex");
    textStorage.addItem("Karah");
    textStorage.removeItem("Alex");
    console.log(textStorage.getItems());
    
    const numberStorage = new DataStorage<number>();
    numberStorage.addItem(5);
    numberStorage.addItem(3);
    numberStorage.removeItem(5);
    console.log(numberStorage.getItems());

    // Would need a more complicated or specific logic to handle objects properly.
    // const objStorage = new DataStorage<object>();
    // objStorage.addItem({name: "Alex"});
    // objStorage.addItem({name: "Karah"});
    // objStorage.removeItem({name: "Alex"});  // This will not work since the object here is a separate memory address from when we added name: 'Alex' above
    // console.log(objStorage.getItems());     // It will instead just remove "Karah" since that object happens to be the last thing in the array (index not found returns -1)
}