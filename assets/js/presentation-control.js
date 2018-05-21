$(document).ready(function (){
    var database = firebase.database();
    console.info("database is init");
    
    firebase.database()
    .ref('curr_presentation')
    .on('value', function(snapshot) {
        var slide=snapshot.val();
        $("#slide-time").text(slide.slideTime);
        $("#slide-number").text(slide.slideNumber);
    });

    firebase.database()
    .ref('curr_presentation_state')
    .on('value', function(snapshot) {
        var obj=snapshot.val();
        console.info(obj);
        if (obj && obj.state=='paused') {
            console.info("i am paused")
            $("#playingState").hide();
            $("#pausedState").show();
        } else {
            $("#playingState").show();
            $("#pausedState").hide();
        }
    });

    $("#pauseSlide").on("click", function(){
        $("#playingState").hide();
        $("#pausedState").show();

        var obj={
            state: 'paused'
        }

        firebase.database()
        .ref('curr_presentation_state')
        .set(obj)
        .then(function (_){
            console.info("done");
        });
    });

    $("#continueSlide").on("click", function(){
        $("#pausedState").hide();
        $("#playingState").show();
        console.info("#continueSlide");

        // firebase.database()
        // .ref('curr_presentation')
        // .once('value')
        // .then(function(snapshot) {

        //     if (snapshot.val().slideNumber > 3) {

        //         var obj={
        //             slideNumber: slide,
        //             slideTime: time
        //         };

        //         firebase.database()
        //         .ref('curr_presentation')
        //         .set(obj)
        //         .then(function (_){
        //             console.info("done");
        //         });
        //     }

        // });

        var obj = {
            state: 'running'
        }

        firebase.database()
        .ref('curr_presentation_state')
        .set(obj)
        .then(function (_){
            console.info("done");
        });
    });
});




