enum Roles {
    ADMIN = 'ADMIN',
    MOD = 100,
    USER = 200,
    READ_ONLY = 'READ ONLY'
};

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: Roles;
} = {
    name: 'Alex',
    age: 30,
    hobbies: ['Sports', 'Cooking', 'Music'],
    role: Roles.ADMIN
};

let favouriteActivities: string[];
favouriteActivities = person.hobbies;

person.hobbies.forEach(hobby => console.log(hobby.toUpperCase()));

for (const hobby of person.hobbies) {
    console.log(hobby.toLowerCase())
}

if (person.role === Roles.ADMIN) {
    console.log('This person is an administrator');
    console.log(person.role);
    console.log(Roles.MOD);
    console.log(Roles.READ_ONLY);
}