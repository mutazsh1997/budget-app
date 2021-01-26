var budgetController = (function() {
    var Expens = function(id , description , value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    } 

    Expens.prototype.calcParcentage = function(totalIncome){
        
        if(totalIncome > 0)
        this.percentage = Math.round((this.value / totalIncome) * 100);
        else
        this.percentage = -1;
    }
    
    Expens.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id , description , value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var calculateTotal = function(type){
        var sum = 0;
        data.allItem[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItem: { 
          exp: [],
          inc: []  
         },
         totals: {  
            exp: 0,
            inc: 0
         },
         budget: 0,
         percentage: -1 
    };
    //this public functions
    return{
        addItem: function(type, des, val){
            var newItem , ID;

        //create new ID 
        if(data.allItem[type].length > 0){
            ID = data.allItem[type][data.allItem[type].length - 1].id + 1; 
        }else{
            ID = 0;
        }
        //create new item and check if it's inc or exp;
        if(type === 'exp'){
            newItem = new Expens(ID , des ,val);
        }else if (type === 'inc'){
            newItem = new Income(ID , des ,val);
        }
        //push into the new item data structure;
        data.allItem[type].push(newItem);

        //return the new item element;
        return newItem;
        },
        
        deleteItem: function(type,id){
            var ids ,index;

            ids = data.allItem[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);
            
            if(index !== -1){
               data.allItem[type].splice(index , 1);
            }
        },

        calculateBudget: function(){

            //calculate totals expenses and income
            calculateTotal("exp");
            calculateTotal("inc");

            //calculate the budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the  percentage of income that we spent
            if (data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.totals.inc = -1;
            }
    },
        calculatePercenetage :function(){
            
            data.allItem.exp.forEach(function(cur){
                cur.calcParcentage(data.totals.inc);
            });
    },

        getPercentage: function(){
            var allPerc = data.allItem.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function(){
            
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentageT: data.percentage
            }
        },

        testing: function(){
            console.log(data);
        }
    }

}());
 
var UIController = (function(){
    var domString = {
        itemType: ".add__type",
        itemDescription:".add__description",
        itemValue:".add__value",
        btnSubmit:".add__btn",
        incumContainer : ".income__list",
        expinceContainer : ".expenses__list",
        budgetLapel : ".budget__value",
        incomeLapel : ".budget__income--value",
        expensesLapel : ".budget__expenses--value",
        persintageLapel : ".budget__expenses--percentage",
        container : ".container",
        expPercLapel : ".item__percentage",
        dateLapel : ".budget__title--month",
    }
    
    var nodeListForEach = function(list, callBack){
            
        for (i = 0; i < list.length; i++){ 
            callBack(list[i],i);
        }
   }
   var formatNumber =  function(num, type){
       
       var numSplit, int, dec;
       
       num = Math.abs(num);
       num = num.toFixed(2);
       
       numSplit = num.split('.');
       
       int = numSplit[0];
       if(int.length > 3){
           int = int.substr(0, int.length -3) + "," + int.substr(int.length - 3 , 3); //input 1230 output 1,230.00;
        }
        
        dec = numSplit[1];
        
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        
    };
    
    return{
        
        getInput:function(){
            return{
                type: document.querySelector(domString.itemType).value,       
                description: document.querySelector(domString.itemDescription).value,       
                value: parseFloat(document.querySelector(domString.itemValue).value),       
            }
        },
        addNewItems: function(Obj,type){
            var html ,newHtml ,element;
            
            if(type === 'inc'){
                
                element = domString.incumContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> '+
                '<div class="item__description">%description%</div><div class="right clearfix">'+
                '<div class="item__value">%value%</div> <div class="item__delete">'  +
                '<button class="item__delete--btn">X</button>     </div>    </div></div>';
                
            }else if (type === 'exp'){
                
                element = domString.expinceContainer;
                
                html = '<div class="item clearfix" id="exp-%id%">' +
                '<div class="item__description">%description%</div>' +
                '<div class="right clearfix">  <div class="item__value">%value%</div>' +  
                '<div class="item__percentage">21%</div>   <div class="item__delete">' +
                '<button class="item__delete--btn">X</button>  </div>  </div>   </div>';
            }
            
            newHtml = html.replace('%id%' , Obj.id);
            newHtml = newHtml.replace('%description%' , Obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(Obj.value, type));
            
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
        },
        deleteListItem: function(currentId){
            let el = document.getElementById(currentId);
            el.parentNode.removeChild(el);
        },
        clearFileds: function(){
            var fileds , arrayFilds;
            
            fileds = document.querySelectorAll(domString.itemDescription + ", " + domString.itemValue);
            
            arrayFilds = Array.prototype.slice.call(fileds);
            
            arrayFilds.forEach(function(thisEl){
                thisEl.value = "";
            });
            // if the input is empty focus at description
            arrayFilds[0].focus();
        },
        
        displayBudget :function(obj){
            
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(domString.budgetLapel).textContent = formatNumber(obj.budget, type);
            document.querySelector(domString.incomeLapel).textContent =  formatNumber(obj.totalInc,'inc');
            document.querySelector(domString.expensesLapel).textContent = formatNumber(obj.totalExp,'exp');
            
            if(obj.percentageT > 0){
                document.querySelector(domString.persintageLapel).textContent = obj.percentageT + '%';
            }else{
                document.querySelector(domString.persintageLapel).textContent = obj.percentageT + '---';
            }
            
        },
        
        displayPercentage: function(percenatage){
            
            var fields = document.querySelectorAll(domString.expPercLapel);
            
            nodeListForEach(fields,function(cur,index){
                if(percenatage[index] > 0)
                cur.textContent = percenatage[index] + "%";
                else
                cur.textContent = "---";
            });
        },
        
        displayDate: function(){
            let date, mounth, year, day;
            
            date = new Date();
            
            day = date.getDate();
            
            mounth = date.getMonth() + 1;
            
            year = date.getFullYear();
            
            
            document.querySelector(domString.dateLapel).textContent = day + "/" + mounth + "/" + year;
        },
        
        changeType: function(){
            
            var fields = document.querySelectorAll(
                domString.itemType + ","
                + domString.itemDescription +  "," 
                + domString.itemValue
                );
                
                nodeListForEach(fields , function(cur){
                    cur.classList.toggle('red-focus');
                });
                document.querySelector(domString.btnSubmit).classList.toggle('red');
            },
            
            domVar :function(){
                return domString;
            }
        }
    }());
    
    var appController = (function(UIController , budgetCtrl){
        
        var dom = UIController.domVar();
        
        var setupEventListner = function(){
            
            document.querySelector(dom.btnSubmit).addEventListener('click' , ctrlAddItem);
            
            
            document.addEventListener('keypress',  function(e){
        
        //13 mean enter key and which mean key code for older browser;
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }  
    });
    
    document.querySelector(dom.container).addEventListener('click' , ctrlDeleteItem);
    
    document.querySelector(dom.itemType).addEventListener('change', UIController.changeType);
};

var updateBubget = function(){
    
    // calculate the budget
    budgetCtrl.calculateBudget();
    // return the budget
    var budget = budgetCtrl.getBudget();
    // display the budget to ui
    UIController.displayBudget(budget);
};

var calcParcentage = function(){
    
    //calculate percenatge
    budgetCtrl.calculatePercenetage();
    //read percenatage from the budget controller
    var dataperc =  budgetCtrl.getPercentage();
    //display prcenatage to UI
    UIController.displayPercentage(dataperc);
};

var ctrlAddItem = function(){
    
    var input, newItem;
    
    //get the input from user 
    input = UIController.getInput();
    console.log(input);
    //check if the inputs is not empty 
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){  
        //add the item to the budget controller;
          newItem = budgetController.addItem(input.type, input.description, input.value);
        //get data and display it to ui
           UIController.addNewItems(newItem, input.type);
        //clear fildes after submit on ui 
            UIController.clearFileds();
        //update budget and calculate
            updateBubget();
        //update and calc percenatge
            calcParcentage();
    }else{
        if(input.value <= 0)
         alert("the value should be greater than zero");
        else
         alert("the description or value sould be valid");
     }
};

    var ctrlDeleteItem = function(event){
        var itemId, splitId, type, ID;

        itemId = event.target.parentElement.parentElement.parentElement.id;
        if(itemId){
            //income-1
            splitId = itemId.split("-");
            //get the split id and convert to its own kind
            type = splitId[0];
            ID = parseInt(splitId[1]);
            //delete the data from budget controll
            budgetController.deleteItem(type,ID);
            //delete the item form the ui ctrl
            UIController.deleteListItem(itemId);
            //update the budget ui
            updateBubget();
            //update and calc percenatge
            calcParcentage();
        }
         
};

    return {
        init: function(){
            UIController.displayDate();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentageT:''
            });
            setupEventListner();
        }
    }
   
})(UIController , budgetController);


appController.init();