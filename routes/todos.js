const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()


router.get('/', async (req, res) =>{
    const todos = await (await Todo.find({}).lean()).reverse()

    res.render('index', {title: 'Todos List', isIndex: true, todos})
})

router.get('/create', (req, res)=>
{
    res.render('create', {title: 'Create Todo', isCreate: true})
})

router.post('/create', async (req, res) =>{
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async(req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})


router.post("/update/:id",(req,res) => {
    if(req.body._id == "")
    {
        insertRecord(req, res);
    }
    else{
        updateRecord(req,res);
    }
})

function insertRecord(req, res)
{
    var todo = new Todo();

    title.title = req.body.title;

    todo.save((err,doc) =>{
        if(!err){
            res.redirect('/');
        }
        else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err.req.body);
                res.render("edit", {
                    viewTitle: "Update",
                    title: req.body
                });
            }
        }
    })
}

function updateRecord(req,res)
{
    Todo.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,todo)=>{
        if(!err){
            res.redirect('index');
        }
        else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err.req.body);
                res.render("edit", {
                    viewTitle: "Update",
                    title: req.body
                });
            }
        }
    })
}

router.get('/update/:id',(req,res) => {
    Todo.findById(req.params.id,(err,todo)=>{
    if(!err){
        res.render("edit", {
            viewTitle: "Update",
            title: todo
        })
    }
  })
})

router.get('/delete/:id', (req,res) => {
	Todo.findByIdAndRemove(req.params.id,(err,doc)=> {
	  if(!err){
        res.redirect('/');
      }
	  else{
		console.log("error")
    }
    })
})

module.exports = router