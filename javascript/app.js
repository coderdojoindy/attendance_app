$(document).ready(function(){

    Parse.initialize("LueDcbNFGrkMpsFaL4c6YQKSjLMFmMjMRhtS8Q1g", "bij3B89DgH1ZhhnJXZabFCzyORCykr9IJmZTaENQ");
    var Meeting = Parse.Object.extend("Meeting");
    var _meetings = [];

    $("#save").click(function(){
        var meeting = new Meeting();
        var m = new Date($("#date").val());
        var meetingDate = new Date(m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate());

        if (meetingDate === "") {
            alert("Invalid name or date");
            return false;
        }
        meeting.save({date:meetingDate}).then(function(meeting){
            _meetings.push(meeting);
            showMeetings();
            $("#name").val("");
            $("#date").val("");
        });

        return false;
    });

    var showMeetings = function(){
        var t = $("#meetings");
        var tableRows = t.find('tr[id!="header"]');
        tableRows.remove();   
        for(var meetingIndex in _meetings){
            var meeting = _meetings[meetingIndex];            
            meetingDate = $("<td/>", {text:meeting.get("date").toDateString()});
            row = $("<tr/>");
            row.append(meetingDate);
            t.append(row);
        }
    }

    var loadMeetings = function(){
        var query = new Parse.Query(Meeting);
        query.limit(10);
        query.find().then(function(results){
            _meetings = results;
            showMeetings();
        });
    }

    loadMeetings();
});

