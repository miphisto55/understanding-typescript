const person = {
    name: 'Alex',
    age: 30,
    hobbies: ['Sports', 'Cooking', 'Music']
};

let favouriteActivities: string[];
favouriteActivities = person.hobbies;

person.hobbies.forEach(hobby => console.log(hobby.toUpperCase()));

for (const hobby of person.hobbies) {
    console.log(hobby.toLowerCase())
}