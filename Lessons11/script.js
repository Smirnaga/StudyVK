'use strict';




function Student(name, marks) {
    this.name = name;
    this.marks = marks;
}

Student.prototype.averageMark = function () {
    return this.marks.reduce((sum, current) => (sum + current)) / (this.marks.length);
};
Student.prototype.minMark = function () {
    return Math.min.apply(null, this.marks);
};
Student.prototype.maxMark = function () {
    return Math.max.apply(null, this.marks);
};



const students = [
    new Student('Student 1', [10, 9, 8, 0, 10, ]), // имя, оценки
    new Student('Student 12', [10, 0, 8, 0, 3, 4])
];


