var Comment = React.createClass({
    render : function(){
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
                Hello! I'm a comment list.
            </div>
        );
    }
});

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
