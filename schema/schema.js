const graphql = require("graphql"); 

const _ = require("lodash");

const { 
     GraphQLObjectType,
     GraphQLString,
     GraphQLSchema,
     GraphQLID,
     GraphQLInt
 } = graphql;


//dummyData
var books = [
    { name: "Name of the Wind", genre:"Fantasy", id:"1", authorId:"1" },
    { name: "The Final Empire", genre:"Fantasy", id:"2", authorId:"2" },
    { name: "The Long Earth", genre:"Sci-fi", id:"3", authorId:"3" }
]

//dummyData
var authors = [
    { name: "Ebu", age:44, id:"1" },
    { name: "Bekir", age:45, id:"2" },
    { name: "Demiray", age:66, id:"3" }
]

const BookType = new GraphQLObjectType({
    name:"Book",
    fields: () => ({
        id:{type:GraphQLID},// string olması gerekmez bir uniq olsun kafi
        name:{type:GraphQLString},// string olması zorundadır
        genre:{type:GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields: () => ({
        id:{type:GraphQLID},// string olması gerekmez bir uniq olsun kafi
        name:{type:GraphQLString},// string olması zorundadır
        age:{type:GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){

               return _.find(books, {id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id:args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
})