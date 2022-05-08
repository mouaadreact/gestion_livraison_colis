
var users=[];

var addUsers=(username,socketId)=>{
!users.some((user)=>user.username===username) && username!=='' && users.push({username,socketId});
  return users;
}

var removeUsers=(socketId)=>{
users=users.filter((user)=>{
  return (user.socketId!==socketId)
});
}

var getUsers=(username)=>{
  return users.find((user)=>user.username===username);
}

module.exports={addUsers,removeUsers,getUsers}