const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Data = {
"login": "Ashutoshbirje",
"id": 145191261,
"node_id": "U_kgDOCKdxXQ",
"avatar_url": "https://avatars.githubusercontent.com/u/145191261?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/Ashutoshbirje",
"html_url": "https://github.com/Ashutoshbirje",
"followers_url": "https://api.github.com/users/Ashutoshbirje/followers",
"following_url": "https://api.github.com/users/Ashutoshbirje/following{/other_user}",
"gists_url": "https://api.github.com/users/Ashutoshbirje/gists{/gist_id}",
"starred_url": "https://api.github.com/users/Ashutoshbirje/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/Ashutoshbirje/subscriptions",
"organizations_url": "https://api.github.com/users/Ashutoshbirje/orgs",
"repos_url": "https://api.github.com/users/Ashutoshbirje/repos",
"events_url": "https://api.github.com/users/Ashutoshbirje/events{/privacy}",
"received_events_url": "https://api.github.com/users/Ashutoshbirje/received_events",
"type": "User",
"user_view_type": "public",
"site_admin": false,
"name": "Ashutosh Birje",
"company": null,
"blog": "https://ashutoshbirje.netlify.app/",
"location": "Sangli",
"email": null,
"hireable": null,
"bio": "Hello ! I'm Ashutosh Birje, a passionate Full Stack Web Developer with a strong background in programming, problem-solving, and analytical skills.",
"twitter_username": null,
"public_repos": 57,
"public_gists": 0,
"followers": 2,
"following": 2,
"created_at": "2023-09-16T08:26:38Z",
"updated_at": "2025-09-24T10:15:20Z"
};

dotenv.config();

app.use(express.json());

app.get('/',(req,res)=>{
   res.send("Hello World")
})

app.get('/home',(req,res)=>{
   res.send("<h1>Home Page</h1>")
})

app.get('/github',(req,res)=>{
   res.json(Data)
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at ${process.env.PORT} port`);
})

