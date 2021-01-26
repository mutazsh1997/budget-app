const compaines = [
    {name:"compainy one" , category:"computer cs" , start: 1987 , end:2018},
    {name:"compainy tow" , category:"computer" , start: 1996 , end:2018},
    {name:"compainy three" , category:"games" , start: 1993 , end:2018},
    {name:"compainy four" , category:"computer" , start: 1994 , end:2018},
    {name:"compainy five" , category:"computer" , start: 1992 , end:2018},
    {name:"compainy six" , category:"scince" , start: 1990 , end:2018},
    {name:"compainy seven" , category:"physics" , start: 2004 , end:2018},
    {name:"compainy nine" , category:"math" , start: 2008 , end:2017},
    {name:"compainy eight" , category:"teac" , start: 2019 , end:2018},
];

const ages = [25,15,61,20,18,91,49,6,23];

///////////////////////////foreach & for loop;
    //why can do everything with forloop and foreach (fliter ,map ,etc...)
 /*   for (let i = 0; i < compaines.length; i++) {
        const element = compaines[i];
        console.log(element);
    }   */
    //forEach
   /*  compaines.forEach(function(comp){
       var n = comp;
       console.log(n);
    }); */


/////////////////////////fliter
//fliter the data from array ;

    //get the ages that can drink
    //with for loop;
   /*    let canDrinkFor = [];
    for(let i =0 ; i< ages.length; i++){
        if(ages[i] >=21){
            canDrinkFor.push(ages[i]);
        }
    }
    console.log(canDrinkFor);
   */
    //with filter ES5
/*     const canDrink = ages.filter(function(can){
        if(can >= 21){
            return true;
        }
    });
    console.log(canDrink);
 */
 //ES6
  /*
    const canDrink = ages.filter(age => age >= 21);
    console.log(canDrink);
*/

//filter computer company
/* 
const computerCompaines = compaines.filter(function(comp){
    if(comp.category === 'computer'){
        return true;
    }
});
console.log(computerCompaines);
 */

 //ES6
 /* 
 const computerCompaines = compaines.filter(comp => comp.category === "computer");
 console.log(computerCompaines); */

 //fliter 80s companies
/* 
 const comp = compaines.filter(comp => comp.start >= 1980 && comp.start < 2000);
 console.log(comp);
 */
 // get all compaines lasted 10 year
/* 
 const lastedTen = compaines.filter(comp => (comp.end - comp.start) >= 10);
 console.log(lastedTen);
 */

///////////////////////////map
//map function for get the data from array

//create array of compaines names

//ES5
/* 
const testMap = compaines.map(function(comp){
    return `${comp.name} [${comp.start} - ${comp.end}]`;
}); */
//ES6
/* 
const testMap = compaines.map(comp => 
    `${comp.name} [${comp.start} - ${comp.end}]`
); 
console.log(testMap); */

//get 
/* 
const ageSquare = ages.map(age => Math.sqrt(age));
const ageTimeOne = ages.map(age => age);
const ageTimeTow = ages.map(age => age * 2);
console.log(ageSquare);
console.log(ageTimeOne);
console.log(ageTimeTow);
 */
///////////////////////////slice

//ES5

//ES6

///////////////////////////sort
//soter the compaines from newest to oldest 
// soter from big to small ; 

//ES5
/* const sortedCompaines = compaines.sort(function(c1 , c2){
    if(c1.start > c2.start){
        return -1;
    }else{
        return 1;
    }
});

console.log(sortedCompaines);

 *///ES6
 /* 
const sortedCompaines = compaines.sort((a ,b) => (a.start < b.start ? 1 : -1));
console.log(sortedCompaines); */

//sort ages
/* 
const sortAge = ages.sort();

//use this if there if a single num like 1 to 9
const sortAgeA = ages.sort((a,b) => a - b);
console.log(sortAgeA);
console.log(sortAge);
 */
///////////////////////////reduce
//reduce all the el of array 
//with stander for loop
/* let ageSum = 0;
for (let i =0 ; i < ages.length ; i++){
    //ageSum = ageSum + ages[i] same as this
    ageSum += ages[i]
}
 */
/* const ageSum = ages.reduce(function(total,age){
    return total + age;
}, 0);
 */
 const ageSum = ages.reduce((total ,age) => total + age ,0 );

console.log(ageSum + "test");
 

 //get total year of all companies
/* 
 const totalYears = compaines.reduce((total , comp) => total + (comp.start - comp.end) , 0);

 console.log(totalYears);

 */

 //put it all together 
/*
 const combined = ages
 .map(age => age * 2)
 .filter(age => age > 40)
 .sort((a ,b) => a - b)
 .reduce((b,c) => b + c,0);
 
 console.log(combined);

*/
/*
var keys = (function () {  
    document.addEventListener("keypress",function(e){
        var key = (e.keyCode).toString();
    console.log(key);
}); 
})(); 
*/

 