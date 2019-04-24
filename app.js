const   
    bodyParser          = require("body-parser"), 
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer")
    mongoose            = require("mongoose"),      
    express             = require("express"),
    app                 = express();
      

mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Db's up dude!!");
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(expressSanitizer())
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


const postSchema = new mongoose.Schema({
    title: String, 
    image: String,
    body: String, 
    created: {type: Date, default: Date.now}
});

postSchema.methods.speak = function() {
    console.log(this)
    var greeting = this.title ? this.title + " is updated"  : "Crap, you blew it... or did I?";
    console.log(greeting);
};

const BlogPost = mongoose.model("BlogPost", postSchema);

// ======= SAVE ====== //
const shittyPost = new BlogPost({
    title: "The grateful death's tribute to Bob Dylan",
    image: "https://cdn2.pitchfork.com/longform/555/Pitchfork%20Grateful%20Dead%20Final%203.jpg",
    body: "Oh, the ragman draws circles Up and down the block I’d ask him what the matter was But I know that he don’t talk And the ladies treat me kindly And they furnish me with tape But deep inside my heart I know I can’t escape",
    created: new Date().getTime()
})

shittyPost.save((err, shittyPost) => {
    if (err) return console.log(err);
    shittyPost.speak();

})
// <<<<=======  FINAL SAVE ======>>>>

app.get("/", function(req, res){
    res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
    BlogPost.find(function (err, posts) {
        if (err) return console.log(err);
        posts.reverse();
        console.log(posts)
        res.render("index", {posts:posts});    
    });
});
 
app.get("/blogs/new", (req, res) =>{
    res.render("new");
})

app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    const 
        postBody  = req.body.blog,
        post      = new BlogPost ({
                        title: postBody.title,
                        image: postBody.image,
                        body: postBody.body,
                        created: Date.now()
                    });
    post.save(function(err, post){
        if (err) return res.render("new")
        post.save;
    })
    res.redirect("/blogs")
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
        
    BlogPost.findById(id, (err, blog) => {
        if (err) return res.render("/blogs")
        res.render("show", {blogpost:blog});
        });    
})

app.get("/blogs/:id/edit", (req, res) => {
    const id = req.params.id;
    BlogPost.findById(id, function (err, blog) {
        if (err) return res.render("/blog")
        res.render("edit", {blog: blog});
      })
})

app.put("/blogs/:id", (req, res) => {
    console.log("PUT MOTHERFU@@@!!!")
    const 
        id = req.params.id,    
        title = req.body.blog.title,
        image = req.body.blog.image,
        body = req.body.blog.body;

    BlogPost.updateOne({_id: id}, {
        id: id, 
        title: title,
        image: image, 
        body: body
    }, function(err, blog) {
        if (err) return res.redirect("/blogs")
        res.redirect(`/blogs/${id}`)
    });
});

app.delete("/blogs/:id", (req, res) => {
    
    const id = req.params.id;
    BlogPost.findByIdAndDelete({_id: id}, function(err){
        if (err) return res.send("Couldn't delete a damn thing!" + err);
        res.redirect("/blogs");
    });
})

app.listen(3000, "0.0.0.0", function(){
    console.log("Server's up dude!");
});