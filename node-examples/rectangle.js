 /*
 
exports.perimeter = (x,y) =>(2*(x+y));
exports.area = (x,y) =>(x*y);
//these are node modules//
// fn name = parameters =>return value;

*/


//now we are going to use call back fn

module.exports=(x,y,callback) => {

if( x<=0 || y<=0)

         setTimeout( () => 

         callback(new Error("l and b shouldn't be less than 0"),null)

         ,2000);
         
         //setTimeout(fn name,ms)  callback(newError(),return value)


else
    setTimeout( () => 

    callback(null,{
        perimeter :() =>(2*(x+y)),
        area : () =>(x*y),  //bcoz no error we used callback(null,objects to compute rectangle)

    })

    ,2000);
}
