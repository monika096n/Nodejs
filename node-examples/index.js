/*var rect = {
   perimeter : (x,y) => (2*(x+y)),
   area :(x,y) => (x*y)

}; */
// standard js object 





//instead of standard js we are going to import the node module
var  rect=require('./rectangle');
//importing file node module


/*



// going to create  fn 

function solveRect(l,b){
    console.log("solving for rectangle with  l= " + l + " and b = "+ b  );

    if(l<=0 || b<=0){
        console.log("l and b shouldn't be less than 0");
    
    }
    else{
   console.log("printing the area of the rectangle is "+rect.area(l,b) + "  with l"+ l +" and b "+ b);
   console.log("printing the perimeter of the rectangle is "+rect.perimeter(l,b) + " with l "+ l +" and b "+ b);


    }
}

*/

function solveRect(l,b){

    console.log("solving for rectangle with  l= " + l + " and b = "+ b  );

    rect(l,b,(err,rectangle) =>
    {
        if(err){
            console.log("ERROR:",err.message);
        }
        else
        {
            console.log("solving for area of rectangle with  l= " + l + " and b = "+ b + " and area is"+rectangle.area());
            console.log("solving for perimeter of rectangle with  l= " + l + " and b = "+ b + " and perimeter is"+rectangle.perimeter());


        }

    }

    );
    console.log("this statement is after the call to rect");
}




solveRect(2,4);
solveRect(3,5);
solveRect(0,2);
solveRect(-5,4);
