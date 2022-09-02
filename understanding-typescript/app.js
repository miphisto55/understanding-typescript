var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles[Roles["MOD"] = 100] = "MOD";
    Roles[Roles["USER"] = 200] = "USER";
    Roles["READ_ONLY"] = "READ ONLY";
})(Roles || (Roles = {}));
;
var person = {
    name: 'Alex',
    age: 30,
    hobbies: ['Sports', 'Cooking', 'Music'],
    role: Roles.ADMIN
};
var favouriteActivities;
favouriteActivities = person.hobbies;
person.hobbies.forEach(function (hobby) { return console.log(hobby.toUpperCase()); });
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toLowerCase());
}
if (person.role === Roles.ADMIN) {
    console.log('This person is an administrator');
    console.log(person.role);
    console.log(Roles.MOD);
    console.log(Roles.READ_ONLY);
}
