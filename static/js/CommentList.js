var CommentList = React.createClass({displayName: "CommentList",
    render : function(){
        return (
            React.createElement("div", {className: "commentList"},
                <Comment author="Peter">This is one comment</Comment>
                <Comment author="Demostenes">This is *another* comment</Comment>
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
    render : function(){
        return (
            React.createElement("div", {className: "commentForm"},
                "Hello!, I'm a comment form."
            )
        );
    }
});
