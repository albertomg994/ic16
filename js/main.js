window.onload = function() {
    
    var SurfGame = function () {
        //Creamos el objeto surfGame

    };
    
    
 SurfGame.prototype = {


     
    //Constants
     PIXELS_PER_POINT: 30,
     GAME_SPEED: 1,
     Y_OFFSET_OF_GRAPH:400,
     SURFER_DIMENSIONS: 50,
     X_OFFSET_OF_SURFER:50,
     LINE_WIDTH: 10,
     COLORS: [0x0000FF,0x00FF40,0xFF0000], //Blue, Green and Red
     JUMP_HEIGHT: 600,
     TIME_PER_MOVEMENT: 5,
     
    // Measures and resolutions
    w: 961,
    h: 1550,
    heightButton: 200,
    widthButton: 327,

    // Text buttons variables
    button_1_text: undefined,
    button_2_text: undefined,
    button_3_text: undefined,

    // 
    points_text: undefined,
    max: undefined,
    min: undefined,
    average: undefined,
    points: 0,
    counter_points: 60,

    //Variables of the game
    pic: undefined,
    stockValues: new Array(),
    numCompanies: 3,
    all_companies_stock: new Array(),
    graphPlot: undefined,
    sprites: new Array(),
    surfer:undefined,
    advancedPixels:0, //Number of pixels moved in the game,
    surferSlope:0,
    activePlot:0,
     jumping:false,
     blockedCounter: 5,
     timeBarGraphics: undefined,
     buttonsEnabled: true,
   date_text_sprite: undefined,
   date_text: undefined,
     background: undefined,
    
    preload: function(){
         //game.load.image('logo', 'phaser.png');
         game.load.image('surfer','surfer.png');
         game.load.image('main-buttons', 'assets/sprites/main-buttons.png');
         game.load.image('main-buttons-grey', 'assets/sprites/main-buttons-grey.png');
         game.load.image('back','assets/back.png');
        
    },
    
    create: function () {
        
         //Put the logo on the background
       // var background  = game.add.sprite(0, 0, 'back');
        
         background = game.add.tileSprite(0, 0, this.w, this.h, "back");
        // Add main buttons
        this.pic = game.add.sprite(0, this.h-this.heightButton, 'main-buttons');
        


       
        this.pic.scale.set(1);

        this.button_1_text = game.add.text(this.widthButton/4, this.h-this.heightButton/1.5, "APPL", { font: "54px Arial", fill: "#ffffff" });
        this.button_2_text = game.add.text(this.heightButton+this.widthButton/1.7, this.h-this.heightButton/1.5, "GOOGL", { font: "54px Arial", fill: "#ffffff" });
        this.button_3_text = game.add.text(2*this.heightButton+this.widthButton, this.h-this.heightButton/1.5, "MSFT", { font: "54px Arial", fill: "#ffffff" }); 

        this.points_title = game.add.text(this.w/2 - 90, 20,  "SCORE", { font: "50px Arial", fill: "#ffffff" }); 
        this.points_text = game.add.text(this.w/2 - 30, 120,  0, { font: "99px Arial", fill: "#ffffff" });  //


        game.input.onTap.add(this.onTap, this);

       
        //logo.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        

        //game.time.events.add(500, this.substractCounter, this);
        //Init data of all stocks
        //init_all_companies_stocks(this.all_companies_stock,this.numCompanies);
        load_year_stock_values(this.all_companies_stock, true);  // load from JSON


        
       
        
         // physics
       this.physics.startSystem( Phaser.Physics.ARCADE );
        
	    game.physics.arcade.gravity.y = 200;
        
        
        
       
           
        //Calculate the maximum and minimum values, and the average
        this.max = this.all_companies_stock[0][0];
        this.min = this.all_companies_stock[0][0];
        for (var i = 0; i < 3; i++) {
          // get max and min values
          for (var j = 0; j < this.all_companies_stock[i].length; j++) {
            if (this.all_companies_stock[i][j] > this.max) this.max = this.all_companies_stock[i][j];
            if (this.all_companies_stock[i][j] < this.min) this.min = this.all_companies_stock[i][j];
          }
        }
        this.average = (this.max - this.min) / 2;

        console.log(this.max + " - " + this.min + " - " + this.average);

        //Generate the sprites for the plots
        for(var i = 0; i < this.numCompanies; i++){
            
             //Generate the Graphic object for the plot
             var graphic = game.add.graphics(0,0);
             this.generatePlotGraphic(i,graphic);
            
            //Generate the sprite for the graphic
             var currentSprite = game.add.sprite(0, this.Y_OFFSET_OF_GRAPH, graphic.generateTexture());
             
             this.sprites.push(currentSprite);
             //currentSprite.anchor.set(0.5);
             //currentSprite.scale.setTo(3, 3);
             graphic.destroy();
            
        }
        
        //Generate the line of the mean
        var g = game.add.graphics(0,this.average);
        g.beginFill(0x000000);
        g.lineStyle(5, 0xFFFFFF, 1);
        g.moveTo(0,this.average);
        console.log(this.average);
        g.lineTo(this.w,this.average);
        g.endFill();
            
        

         //Generate the sprite for the surfer
        this.surfer = game.add.sprite(this.X_OFFSET_OF_SURFER, 0, 'surfer');
        game.physics.arcade.enable([this.surfer]);
        this.surfer.body.gravity.y = 500;

        this.surfer.body.allowGravity = false;
      
       

        
        
        
        // código escrito por Alberto perfectamente formateado
        //date_text_sprite = game.add.sprite(this.w / 2 - 100, this.h - this.heightButton - 300);

       
        
      
    },

    update: function(){
        
        background.tilePosition.x -= 0.5;
         //Only draw the active plot
        for(var j = 0; j < this.numCompanies; j++){
            if(j==this.activePlot){
                this.sprites[j].visible = true;
            }
            else{
                this.sprites[j].visible = false;
            }
        }
        
        for(var i = 0; i < this.numCompanies; i++){
            this.sprites[i].x-= this.GAME_SPEED;
            
            
        }
        this.advancedPixels+=this.GAME_SPEED;
        
        
        if(!this.jumping){
            this.surfer.y = this.getHeightOfSurfer() + this.Y_OFFSET_OF_GRAPH -this.SURFER_DIMENSIONS + 3;
            //If goes down, sprite goes up 3 pixels (half of grosor of the linea)
            if(this.surferSlope < 0){
                this.surfer.y -=this.LINE_WIDTH / 2 ;
            }
        }
        
        //Control end of jump
        if(this.jumping && this.surfer.body.velocity.y > 0){
            if(this.surfer.y >= this.getHeightOfSurfer() + this.Y_OFFSET_OF_GRAPH -this.SURFER_DIMENSIONS + 3){
                this.jumping = false;
                 this.surfer.body.allowGravity = false;
            }
        }
        
        this.calculatePoints();
        
        // print date
        //But only every PIXELS_PER_POINT pixels, every time the day changes
        if(this.advancedPixels % this.PIXELS_PER_POINT == 0){
             var current_point = this.getCurrentPoint();
            dates = get_dates_list();
            //var style = { font: "60px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: date_text_sprite.width, align: "center", backgroundColor: "#000000" };

            if(this.date_text){
                this.date_text.destroy();
            }
            
            this.date_text = game.add.text(this.w / 2 - 150, this.h - this.heightButton - 220, dates[current_point], { font: "64px Arial", fill: "#ffffff" });
            //this.date_text = game.add.text(0, 0, dates[current_point], style);
            //this.date_text.x = Math.floor(date_text_sprite.x + date_text_sprite.width / 2);
            //this.date_text.y = Math.floor(date_text_sprite.y + date_text_sprite.height / 2);
        }
       
    },
    render: function () {
        //xPosition++;
        
       
        
        //console.log(this.surferSlope)
        
       
       
        //console.log("plot");

        //game.debug.spriteInfo(this.sprite, 20, 32);
        //this.bmd.clear();
        //Simply plot the function
        //this.graphPlot.moveTo(500,50);
    


    },
    generatePlotGraphic: function(j,graphObject){
        for (i = 0; i < this.all_companies_stock[j].length - 1; i++) {
          ini_y = this.all_companies_stock[j][i];
          fin_y = this.all_companies_stock[j][i+1];
          ini_x = i*this.PIXELS_PER_POINT;
          fin_x = (i+1)*this.PIXELS_PER_POINT;

        
              // set a fill and line style
          graphObject.beginFill(this.COLORS[j],0.7);
          graphObject.lineStyle(0, this.COLORS[j], 1);
            
          if(ini_y < fin_y){ //Se esta bajando
              
               graphObject.drawRect(ini_x, fin_y, (fin_x - ini_x), this.h - this.heightButton - 400 -  fin_y);
               graphObject.drawTriangle([ new Phaser.Point(fin_x, fin_y), new Phaser.Point(ini_x,fin_y), new Phaser.Point(ini_x, ini_y) ]);
               //graphObject.drawPolygon(poly.points);
          }
          else{ //Se esta subiendo
               graphObject.drawRect(ini_x, ini_y, (fin_x - ini_x), this.h - this.heightButton - 400 -  ini_y);
               graphObject.drawTriangle([  new Phaser.Point(fin_x, ini_y),new Phaser.Point(ini_x,ini_y), new Phaser.Point(fin_x, fin_y) ]);
          }
            
           
        
        

          // draw a shape
          graphObject.moveTo(ini_x, ini_y);
          //graphObject.lineTo(fin_x, fin_y);
    }
    },
    getHeightOfSurfer: function(){
        
        var relativeAdvancedPixels = this.advancedPixels + this.X_OFFSET_OF_SURFER + this.SURFER_DIMENSIONS;
        var initialPoint = Math.floor(relativeAdvancedPixels/this.PIXELS_PER_POINT);
        var finalPoint = initialPoint + 1;
        var pixelsAdvancedSinceFirstPoint = (relativeAdvancedPixels - initialPoint*this.PIXELS_PER_POINT);
        var percentageAdvancedSinceFirstPoint = (pixelsAdvancedSinceFirstPoint/this.PIXELS_PER_POINT);
        var heightDifference = this.all_companies_stock[this.activePlot][finalPoint] - this.all_companies_stock[this.activePlot][initialPoint];
        this.surferSlope = -(heightDifference); //So if goes down, slope is negative
        var heightRightNow = this.all_companies_stock[this.activePlot][initialPoint] + percentageAdvancedSinceFirstPoint*heightDifference;
        return heightRightNow;
    },
       getCurrentPoint: function(){
        
        var relativeAdvancedPixels = this.advancedPixels + this.X_OFFSET_OF_SURFER + this.SURFER_DIMENSIONS;
        var initialPoint = Math.floor(relativeAdvancedPixels/this.PIXELS_PER_POINT);
        return initialPoint;
    },
     
    changeButton: function(id, text){
            switch(id){
                case 1:
                    this.button_1_text.destroy();
                    this.button_1_text = game.add.text(this.widthButton/4, this.h-this.heightButton/1.5, text, { font: "54px Arial", fill: "#ffffff" });
                    break;
                case 2:
                    this.button_2_text.destroy();
                    this.button_2_text = game.add.text(this.heightButton+this.widthButton/1.7, this.h-this.heightButton/1.5, text, { font: "54px Arial", fill: "#ffffff" });
                    break;
                case 3:
                    this.button_3_text.destroy();
                    this.button_3_text = game.add.text(2*this.heightButton+this.widthButton, this.h-this.heightButton/1.5, text, { font: "54px Arial", fill: "#ffffff" });
                    break;
                default: 
                    this.points_text.destroy();
                    //First we draw not visible to have the width
                    var actual = this.getHeightOfSurfer();
                    var text = this.points;
                    if(actual < this.average){
                        text = "↑ " + text;
                    }
                    else if(actual > this.average){
                        text = "↓ " + text;
                    }
                    this.points_text = game.add.text(-100,-100,  text, { font: "99px Arial", fill: "#ffffff" }); 
                    //Two times so points_text.width is correct
                    this.points_text = game.add.text(this.w/2 - this.points_text.width/2, 120,  text, { font: "99px Arial", fill: "#ffffff" }); 
                    //this.points_text = game.add.text(this.w-this.widthButton, 100, "Points: " + this.points, { font: "54px Arial", fill: "#ffffff" });
                    break;
            }
    },
    onTap: function(pointer, doubleTap) {
            // Calculate the corners of the menu
            var x1 = 0, x2 = this.w,
                y1 = this.h-this.heightButton, y2 = this.h;

            var limitButton2 = 327;
            var limitButton3 = 654;

            // Check if the click was inside the menu
            if(pointer.clientX > x1 && pointer.clientX < x2 && pointer.clientY > y1 && pointer.clientY < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                 if(this.buttonsEnabled){
                var choise;

                // Calculate the choice 
                if(pointer.clientX<limitButton2){
                    choise = 1;
                } else if(pointer.clientX>=limitButton2 && pointer.clientX<=limitButton3){
                    choise = 2;
                } else if(pointer.clientX>limitButton3){
                    choise = 3;
                } else {
                    choise = 0;
                }
                
                this.buttonsEnabled = false;
                this.pic.loadTexture('main-buttons-grey',0);
                this.blockedCounter = this.TIME_PER_MOVEMENT;
                game.time.events.add(0, this.substractCounter, this);
                
               
                    
                
                //Cambiar la activa
                this.activePlot = choise - 1;
                //console.log(this.activePlot);
                return(choise);
            }
            } else {
                
                if(!this.jumping){
                     this.surfer.body.allowGravity = true;
                 this.surfer.body.velocity.y = -this.JUMP_HEIGHT;
                 this.jumping = true;
                }
                
            }

    },
     substractCounter: function(){
         
         //Reprogram
         if(this.blockedCounter > 0){
             game.time.events.add(500, this.substractCounter, this);
             
         }
         
         //Restore
         if(this.blockedCounter <= 0){
             this.buttonsEnabled = true;
             this.pic.loadTexture('main-buttons',0);
         }
         
         if(this.timeBarGraphics){
             this.timeBarGraphics.destroy();
         }
         this.timeBarGraphics = game.add.graphics(0, 0);
          // set a fill and line style
         this.timeBarGraphics.beginFill(0x00FF00);
         this.timeBarGraphics.lineStyle(5, 0xFFFFFF, 1);
         console.log(this.blockedCounter/this.TIME_PER_MOVEMENT);
         this.timeBarGraphics.drawRect(0, this.h-this.heightButton-50, (1-this.blockedCounter/this.TIME_PER_MOVEMENT)*961, 50);
         this.timeBarGraphics.endFill();
         this.blockedCounter-= 0.5;

     },

     calculatePoints: function() {
        var actual = this.getHeightOfSurfer();
        //console.log(actual);
         
         this.points = Math.floor(this.points + (this.average - actual)/100);
        
        if(this.counter_points==0){
          this.changeButton(4, undefined);
          this.counter_points = 60;
        }
        this.counter_points--;
     }

};

    
    
  var game = new Phaser.Game(961, 1550, Phaser.CANVAS, '');
  game.state.add('Game',SurfGame,true);
  
  

};
