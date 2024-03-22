const mongoose=require('mongoose');
const {marked} = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify =  createDomPurify(new JSDOM().window)

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    markdown:{
        type:String,
        required:true  
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitaizedHTML:{
        type:String,
        required:true
    }
})

blogSchema.pre('validate',function(next){
    if(this.title){
        this.slug = Slugify(this.title,{lower:true,strict:true})
    }
    if(this.markdown){
        this.sanitaizedHTML= dompurify.sanitize(marked(this.markdown))
    }

    next()
})

module.exports = mongoose.model("Blog",blogSchema);  //导出模型，