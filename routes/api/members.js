const express = require('express');
const router = express.Router();
const members = require('../../Members.js')
const uuid = require('uuid')


// get all members
router.get('/',(req, res)=>{
    res.json(members)
})
// get single members
router.get('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400)
        .send('no such an ID')
    }
})

// create a member
router.post('/', (req, res)=>{
   const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
   }
   if(!newMember.name || !newMember.email){
       return res.status(400).render('index',{msg:'please include a new name and email'})
   }
   members.push(newMember)
   res.render('index', members)
   res.redirect('/')
})

//update member
router.put('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        members.forEach((member => {
            if(member.id === parseInt(req.params.id)){
                member.name = req.body.name ? req.body.name : member.name;
                member.email = req.body.email ? req.body.email : member.email;
                res.json({msg: 'member updated' , member})
            }
        }))
    
    }else{
        res.status(400)
        .send('no such an ID');
    }
})

// delete member

router.delete('/:id',(req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
      //res.json(members.filter(member => member.id === parseInt(req.params.id)))
      res.json({msg:'member deleted', restMembers: members.filter(member => member.id !== parseInt(req.params.id))})
    }else{
        res.status(400)
        .send('no such an ID')
    }
})



module.exports = router;