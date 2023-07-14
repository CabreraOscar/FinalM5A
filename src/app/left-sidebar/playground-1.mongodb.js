
// Select the database to use.
use('titanic');


//CONSULTAS

//db.data.find();

//db.data.find({ "Survived": 1 });

//db.data.find({ "Fare": { $gt: 500} });

//db.data.find({ "Pclass": 1, "Embarked": "C" });

//db.data.findOne({ "PassengerId": 3 });

//db.data.find({ "Name": { $regex: "Miss" } });

//db.data.find({ "Age": { $gt: 40 }, "Pclass": 1 });

//db.data.find({ "Sex": "male", "SibSp": { $gt: 0 } });


//db.data.find({ "Cabin": "" });

//db.data.find({ "Embarked": { $in: ["C", "Q"] }, "Fare": { $gt: 30 } });