const express = require('express');
const uuid = require('uuid');
const router = express.Router();
//const router2 = express.Router();
const members = require('../../Members');
//const Junkmembers = require('../../JunkMembers');



// Can hit with react, angular, postman. Input into postman
router.get('/', (req, res) => // A route
{
    res.json(members);
    //res.json( {msg: 'Im coming from router.get / '})
});
// Get Single Member
router.get('/:id', (req, res) => // A route
{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found)
    {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else
    {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}`});
    }
    
});

// Create Member : Note: I had a really hard type seeing my mistake of switching req <-> res typo.
router.post('/', (req, res) => {
    //res.send(req.body); //Just sends back json
    const newMember = {
        id: uuid.v4(),
        name: req.body.name, //The json string req
        email: req.body.email, //The json string req
        status: 'active'
    };
    //Note: If no else statment is include you'll get a 'Headers are already sent', that why include return
    if( !newMember.name || !newMember.email) {
      return res.status(400).json({ msg: 'Please include a name and email'});
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
    //Note: This is hardcoded but will be working with database, example mongodb. It'll work by having to
    //      install package, example 'mongoose
});
// Update member, when updating on a server it's usally a put request
router.put('/:id', (req, res) => // Making a request to /api/members/:id
{
    const found = members.some(member => member.id === parseInt(req.params.id)); // Check if memeber exist
    if (found)
    {
        const updMember = req.body; // Put request body into this variable
        // Loop through the members. This stuff will be different is using a database
        members.forEach(member => 
            {
                if(member.id === parseInt(req.params.id))
                {
                    member.name = updMember.name ? updMember.name : member.name; // If they sent a request update else keep same
                    member.email = updMember.email ? updMember.email : member.email; // If they sent a request update else keep same
                    res.json({msg: 'Member updated', member});
                }
            });
    }
    else
    {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}`});
    }
});
// Delete Members. Not sure if this is correct. It just excludes the id from showing up not exactly deleting it.
router.delete('/:id', (req, res) => // A route
{
    const found = members.some(member => member.id === parseInt(req.params.id)); // Check if it exist
    if (found)
    {
        res.json
            ({
                msg: 'Member deleted',
                // I'm guessing filter is a deleting funcation and check if the id exist i.e. if it exist
                memebers: members.filter(member => member.id !== parseInt(req.params.id)) 
            }); // Want to filter out id
    }
    else
    {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}`});
    }
    
});
/*
router2.get('/:id', (req, res) => // A route
{
    res.json(Junkmembers.filter(member => member.id === parseInt(req.params.id)));
});
//Note: Using 'get' request(http://localhost:5000/Junkmembers)
//      in postman triggers 'app.use(logger);' as does
//      request(http://localhost:5000/api/members).

router2.get('/', (req, res) => 
{
    res.json(Junkmembers);
});
*/


module.exports = router;
//module.exports = router2;
//Current Time: 39:50