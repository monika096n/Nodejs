/* const assert = require('assert'); //for checking purpose

exports.insertDocument=(db,document,collection,callback) => //inserting a document n the particular collection
{
    const coll=db.collection(collection); //naming the database collection as coll 
    coll.insert(document,(err,result)=> //inserting a document in coll
    {
        assert.equal(err,null);//checking error is null for correctly inserted or not
        console.log(" Inserted "+result.result.n+" documents into the collection "+collection);//result.result.n will give no.of operations done 
         callback(result);//it will provide results when a callback is called
    });
};

exports.findDocuments=(db,collection,callback) => { //will give documents found in collection
    const coll=db.collection(collection);
    coll.find({}).toArray((err,docs)=>
    {
        assert.equal(err,null);//checking error is null
        callback(docs);
     });
};

exports.removeDocument=(db,document,collection,callback) => //removing a document n the particular collection
{
    const coll=db.collection(collection);
    coll.deleteOne(document,(err,result)=>
    {

        assert.equal(err,null);//checking error is null
        console.log("Remove  the document "+ document);
        callback(result);
  });
};


exports.updateDocument=(db,document,update,collection,callback) => //updating a document n the particular collection
{
    const coll=db.collection(collection);
    coll.updateOne(document,{$set:update},null,(err,result)=>//updating a field in a document
    {

        assert.equal(err,null);//checking error is null
        console.log("update the document with "+ update); //printing the field which is to be update ,that is passed in function
        callback(result);
  });
};

*/

const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};