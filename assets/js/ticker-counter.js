var slide=1;

$(document).ready(function (){
    setInterval(updateCounter, 1000);
});

function updateCounter() {
    firebase.database()
    .ref('curr_presentation_state')
    .on('value', function(snapshot) {
        var stateObj=snapshot.val();
        if (stateObj && stateObj.state=='paused') {
            $("#counter-ticker-paused").show();
            return;
        }

        $("#counter-ticker-paused").hide();
        var current=$("#counter-ticker").text();
        var newValue="";

        // next slide
        if (current == "0"){        
            newValue=15;
            slide++;
        } else {
            newValue=current-1;
        }

        if (slide > 3) {
            var obj={state: 'paused'};
            firebase.database()
            .ref('curr_presentation_state')
            .set(obj)
            .then(function (_){
                console.info("presentation state updated ", obj);
                window.location.reload();
            });
            return;
        }

        $("#slideNumber").text(slide);
        $("#counter-ticker").text(newValue);
        updatePresentation(slide, newValue);
    });
}

function updatePresentation(slide, time) {
    var obj={
        slideNumber: slide,
        slideTime: time
    };

    firebase.database()
        .ref('curr_presentation')
        .set(obj)
        .then(function (_){
            console.info("presentation updated ", obj);
        });
}
