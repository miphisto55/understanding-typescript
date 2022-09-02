const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
} = {
    name: 'Alex',
    age: 30,
    hobbies: ['Sports', 'Cooking', 'Music'],
    role: [2, 'Author']
};

person.role = [0, 'admin'];

let favouriteActivities: string[];
favouriteActivities = person.hobbies;

person.hobbies.forEach(hobby => console.log(hobby.toUpperCase()));

for (const hobby of person.hobbies) {
    console.log(hobby.toLowerCase())
}