/**  Prototypal inheritance**/
var parent = {
  value: "parentValue",
  obj: {
    objValue: "parentObjValue"
  },
  walk: function () {
    console.log("walking!");
  }
};

/*This child has no properties of his own, so all his properties (value, objValue)
are those of the parent*/
var child = Object.create(parent);
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);
//
/*Now we assign the child properties, so that they are not the same as the parent's.
But beware, when we assign child.obj.value, since the child has no obj property,
js will go up to the parent to find it, so it will change the value of the parent
obj.objValue*/
child.value = "childValue";
child.obj.objValue = "childObjValue";
console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);
//In this line we can verify that the child obj is equal to the parent obj
console.log("child.obj === parent.obj ? ", child.obj === parent.obj);

var grandChild = Object.create(child);
console.log("Grandchild: ", grandChild);
grandChild.walk();

//** Function constructors
// See my other course: HTML, CSS, and Javascript for Web Developers
// Lecture #48
function Dog(name) {
  this.name = name;
  console.log("'this' is: ", this);
}
//To invoque a function constructor, we have to place "new" before calling the function
//That way we create a new Dog object.
var myDog = new Dog("Max");
console.log("myDog: ", myDog);

// Not being used as a function constructor.
//Here we didn't use "new" so we are not creating a Dog object, and the
//"this" in the function refers to the outer scope, which in this case is the global
//scope, that is, the browser window.
Dog("Max2");
