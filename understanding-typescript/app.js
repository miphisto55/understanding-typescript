var person = {
    name: 'Alex',
    age: 30,
    hobbies: ['Sports', 'Cooking', 'Music']
};
var favouriteActivities;
favouriteActivities = person.hobbies;
person.hobbies.forEach(function (hobby) { return console.log(hobby.toUpperCase()); });
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toLowerCase());
}
