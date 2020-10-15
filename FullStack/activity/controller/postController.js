
const getAllPost  =  (req,res) => {
    res.status(201).json({
        status:"Success",
        user : users
    })
};

const getPost =  (req,res) => {
    //req parameter -> user id
    let cUid  = req.params.uid;
    let userArr = users.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status : "Success",
        user: userArr.length == 0 ? "No User":userArr[0]
    })
};

const createPost =  (req,res) => {
    let user = req.body;
    user.uid = uuidv4();
    console.log(user);

    users.push(user);
    fs.writeFileSync(path.join(__dirname,"/db/user.json"), JSON.stringify(users));
    res.status(201).json({
        status : "Success",
        user: req.body
    })
};

const updatePost =  (req, res) => {
    let cUid = req.params.uid;
    let toBeUpdatedObj = req.body;
    let userArr  =users.filter((user) => {
        return user.uid ==cUid;
    });
    let user  = userArr[0];

    for(let key in toBeUpdatedObj) {
        console.log(key);
        user[key] = toBeUpdatedObj[key];
    }
    
    fs.writeFileSync(path.join(__dirname,"/db/user.json"), JSON.stringify(users));
    
    res.status(200).json({
        status: "Success",
        user: user
    })

};

const deletePost =  (req, res) => {
    let cid = req.params.uid;

    console.log(users.length);
     users = users.filter( (user) => {return user.uid != cid; });

    fs.writeFileSync(path.join(__dirname, "/db/user.json"),JSON.stringify(users));
    res.status(200).json( {
        status : "Success",
        users,
        length: users.length
    })

    
};