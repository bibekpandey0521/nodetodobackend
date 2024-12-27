import express  from "express";
import mongoose from "mongoose";
import dotnev from 'dotenv';
import { Todo } from "./model.js"


const app = express();
app.use(express.json());
dotnev.config();
const port = 8000;

async function connectDB() {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(connection.connection.host);

}
connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
app.get('/', async (req, res) => {
    const user = await Todo.find();
    res.status(200).json({
        user,
    });
});
app.post('/',async(req,res) => {
    const newTodo = req.body;
    const todo = await Todo.create(newTodo);
    res.status(201).json({todo});
});

app.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    const todo = await Todo.findById(id);
    if(todo){
        const updatedTodo = await Todo.updateOne({
         _id:id,   
        },
        data
    );
    return res.status(200).json({ updatedTodo });

    }
    return res.status(404).json({ message: 'Todo doesnot exist' });

});

app.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    console.log(req.params.id)
    const todo = await Todo.findById(id);
    if(todo){
        const deleteTodo = await Todo.deleteOne({
            _id:id,
        });
        return res.status(200).json({deleteTodo});
    }
    return res.status(404).json({
        message:'Todo doesnot exits'
    });
});