
// Import necessary modules and libraries

const PORT=8000;//port 
 
const OpenAI = require("openai"); //Import the OpenAI library
const dotenv= require('dotenv'); //dotenv is for api-key *.env*   //Enviroment variables
dotenv.config();    //Load Enviroment variables from .env file

const express=require('express');
const app=express();   //Instance of the express application

const axios=require('axios'); //Using Axios for making HTTP requests 
const cheerio=require('cheerio');  //cheerio for scraping
const cors = require('cors');   //Cross-Origin Resource Sharing.
const bodyParser = require('body-parser'); //Use bodyParser for parsing JSON request bodies


app.use(cors({
    origin: '*' // Allow any origin (for development purposes)
}));
app.use(express.json()); // Add JSON body parsing middleware

app.use(bodyParser.json()); //middleware for Json parsing


// Encapsulate the logic for fetching and populating the article string
async function fetchAndFillArticle(url) {
  
  
  try {
    let article ="";   //this will have the scraped data
    const response = await axios(url); //Making an Http req
    let data = response.data;

    const $ = cheerio.load(data);
    
    $('p, h1, h2, h3,li ', data).each(function (i, ele) {//scraping the main tags
      const $element = $(this);
      if (
        !$element.hasClass('sidebar') &&
        !$element.hasClass('sideBar') &&
        !$element.hasClass('navBar') &&   //ignoring the side, nav and footer
        !$element.hasClass('navbar') &&   //focusing on the main content of webpage
        !$element.hasClass('footer') &&
        !$element.is('aside') &&
        !$element.is('footer')
      )   {
      const text = $element.text().trim();

      if(article.length<=8000){   //limiting the length because the 
                                  // GPT-3.5 turbo model can only handle 4096 tokens
      article+=text+' ';

      }
      
  
      } 
    });
    article = article.replace(/\s+/g, ' ').trim(); //ignoring the linebreaks and extra white spave
    return article

  } catch (err) {                           //catching errors
    console.log(err.message);
  }
  
}

// Initialize the OpenAI library with the API key from the environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

 
// POST method route
  app.post("/summarize", async (req, res) => {
    try{
     const url= req.body.url;              //extracting the URL from the req object
     const instruct=req.body.instruct;    //extracting the instruction form the req object
  
   const content=await fetchAndFillArticle(url);//scraping the webpage data
  
      if(content!==null){
        //getting response from the openai api
      const completion = await openai.chat.completions.create({
    
      model: "gpt-3.5-turbo",
      messages: [
       
        {"role": "user", "content": `${instruct}: ${content} .`},
       ],
       
      
      temperature: 0.8, 
      
    });

    res.send(completion.choices[0].message.content); //sending data to client
    
    }}
    catch(err){              
      console.log(err.message);
      res.status(500).send("Internal Server Error");      //catching errors

    }
  });  
 
 // Start the Express server on the specified port
  app.listen(PORT, () => {//app listening
    console.log(`The app is running on http://localhost:${PORT}`);
});

app.get('/',(req,res)=>{
res.send("backend is working")
});

