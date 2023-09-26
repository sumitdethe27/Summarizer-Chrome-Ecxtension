// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", async()=>{


    //  Declare variables 
    let address = await getCurrentTabUrl(); //sending current page url to server
    let output=document.querySelector("#output");//the server content displays here
    let loading=document.querySelector('.loading');//loading bar
    
    let summary_btn=document.querySelector("#summaryButton");//summary button
    let majorPoints_btn=document.querySelector("#pointsButton");//major points

    // Event listener for the "Major Points" button
    majorPoints_btn.addEventListener('click',async ()=>{//getting major points
        loading.style.display='block'
        progressBar();//Display a progress bar
       
        // Request object for the backend
        let requestObj={
            url:address,

            // prompt for the backend
            instruct:"Create a list of Main points(less than 10 points), about the topic discussed here : :"
        }
        let response = await fetch('http://localhost:8000/summarize', {
            method: "POST", // Use POST method
            mode: 'cors',       // Set the mode to 'cors'
            headers: {
                'Content-Type': 'application/json' // Set the Content-Type header
            },
            credentials: 'same-origin', // Set the credentials to 'same-origin'
            body:JSON.stringify(
                requestObj
            )
            
            });
                
                if(response.ok){
                    loading.style.display='none' //Hiding the loading bar
                    // formatting the output to display
                    let article= await response.text()
                    let paragrapgharr=article.split('\n');
                    let strings=paragrapgharr.map(str=>`<li> ${str} </li> `).join('');

                    output.innerHTML=`<ul>${strings}</ul>`;
                }else{
                    output.textContent = "Error fetching data" 
                }   
    
    })

    // summary event 
    summary_btn.addEventListener('click',async ()=>{
        loading.style.display='block'
        progressBar();  //progress bar

       // request object for the backend
        let requestObj={
            url:address,

            // prompt for the backend
            instruct:"Create a Summary (in less than 300 words), for this webpage data : "
        }
        let response = await fetch('http://localhost:8000/summarize', {
            method: "POST", // Use POST method
            mode: 'cors',       // Set the mode to 'cors'
            headers: {
                'Content-Type': 'application/json' // Set the Content-Type header
            },
            credentials: 'same-origin', // Set the credentials to 'same-origin'
            body:JSON.stringify(
                requestObj
            )
            
            });
                
                if(response.ok){
                loading.style.display='none'
                    //formatting output 
                    let article= await response.text();
                      let paragrapgharr=article.split('\n');
                    let strings=paragrapgharr.map(str=>`<p> ${str} </p>`).join('');

                    output.innerHTML=strings;
                   
                }else{
                    output.textContent = "Error fetching data" 
                }   
    })
    
    // implementation of the copy button( to copy the output text)
    // IIFE
    let copy=document.getElementById('copy');
    (function(){   copy.addEventListener('click', () => {
        navigator.clipboard.writeText(output.innerText)
          .then(() => {
            copyAnimation()
      
            console.log('Text copied to clipboard');
          })
          .catch(err => {
            console.log('Error copying text: ', err);
          });
      });
    })();
    // copy button animation
    function copyAnimation(){
        let copyText=document.querySelector('#copy-text');
        let ogtext=copyText.textContent;
        let ogcolor=copy.style.background;
        copyText.textContent="Copied  ";
        copy.style.background = "linear-gradient(to right , green,green)";

        setTimeout(()=>{
            copyText.textContent=ogtext;
            copy.style.background=ogcolor;
        },3000)   
        }
    })

    // chrome tab api to get the url of the current tab
    async function getCurrentTabUrl() {
        return new Promise((resolve) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs[0];
                const url = tab.url
              
                resolve(url);
            });
        });
    }