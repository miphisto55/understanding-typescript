"use strict";
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles[Roles["MOD"] = 100] = "MOD";
    Roles[Roles["USER"] = 200] = "USER";
    Roles["READ_ONLY"] = "READ ONLY";
})(Roles || (Roles = {}));
;
const person = {
    name: 'Alex',
    age: 30,
    hobbies: ['Sports', 'Cooking', 'Music'],
    role: Roles.ADMIN
};
let favouriteActivities;
favouriteActivities = person.hobbies;
person.hobbies.forEach(hobby => console.log(hobby.toUpperCase()));
for (const hobby of person.hobbies) {
    console.log(hobby.toLowerCase());
}
if (person.role === Roles.ADMIN) {
    console.log('This person is an administrator');
    console.log(person.role);
    console.log(Roles.MOD);
    console.log(Roles.READ_ONLY);
}
//# sourceMappingURL=objs-arrays-enums.js.map