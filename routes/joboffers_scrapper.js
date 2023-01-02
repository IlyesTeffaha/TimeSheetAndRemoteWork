

const { Cheerio } = require('cheerio')
const axios = require('axios');
const cheerio = require('cheerio');
const fetch =require('node-fetch')


const searchCache={};

const searchUrl = 'https://www.receptix.us/us/';

const joburl='https://www.receptix.us/applyjob.php?src=dGFscm9v&ju=aHR0cHM6Ly93d3cuam9iczJjYXJlZXJzLmNvbS9jbGljay5waHA/amlkPTU1YzUzMTJlZjEzZGIzZWY4ZTRlYTQ4MjEmcmk9OTYyZThkNGRiNmUwNDZkOWI2ZmU0NDMzODc3NTA2ODUmam9iX2xvYz1LYW5zYXMrQ2l0eSUyQ01PJnE9RWNvbW1lcmNlK1BwYytBZ2VuY3kmc3BsPVM2JTJGZEtEJTJGT04lMkJXZGNQNUMlM0FhSzAlMkJIZjB0Nm5pbnZDakhKaHRXN0ElM0QlM0QlM0FkaE0zbVJ5QVpyUE01bUx3WWFTMEFwOHZlSkxuWnNMQTY5WDBkcm1MOUc3TFFzajNkMGZCTFpWSEQwQ0Fwb0k0ZXE2ZGFKbm1sTG9STFFrUzlkR29MNmN2cDN6ZHc1R0tjbVY1SmdxMzl1MU5mb09kTmxIZnFHUjQwbllYc0VoUzQ4UmV6dFNXOVZrUDBIQXUmZW5jcnlwdD0wJmw9TGVhd29vZCZxdWVyeV9jYXRlZ29yeV9pZD00MDAwMDA=&cmp=aHR0cDovLy91cy9hbmd1bGFyP2FzPTI=&city=Kansas City, Kansas - US&company=TEKsystems&jobtitle=Angular Developer&date=2022-04-29&id='

function searchoffer(searchTerm){
  if(searchCache[searchTerm]){
    console.log('serving from cache',searchTerm)
    return Promise.resolve(searchCache[searchTerm]);
  }
  return fetch(`${searchUrl}${searchTerm}?as=2`)
  .then(response=>response.text())
  .then(body=>{
    const offers=[];
    const $ = cheerio.load(body);
    $('.job-item').each(function(i,element){

      const $element=$(element);

      const $title=$element.find('h2.itemHeader')
    //   const $qtid=$title.attr('href')
      const $qtlink=$element.find('a').attr('href')
    //   const $date=$element.find('span.modified')
      const $companyname=$element.find('div.css-tcffn8')
      const $place=$element.find('div.css-gbogy6')
    //   const $tags=$element.find('span.tags')
   
      const offer={
        // qtid:$qtid,
        title:$title.text(),
        qtlink:"https://www.receptix.us"+$qtlink,
        // index1:$qtlink.indexOf("d=")+2,
        // index2:$qtlink.indexOf("&hit"),
        id:$qtlink.substring($qtlink.indexOf("d=")+2,$qtlink.indexOf("&hit")),
        index1:$qtlink.indexOf("src="),
        jobid:$qtlink.substring($qtlink.indexOf("src=")+4,),
        // date:$date.text(),
        companyname:$companyname.text(),
        place:$place.text(),
        // tags:$tags.text().replace('\n\n\t\n\t\n','').replace('\n\t\n\t\n\n\t\n','').replace('\n','').replace('/n','').replace('\t\n\t','').replace('\t','')

      };
      offers.push(offer);
  
    });
    return offers;
  });
}

////////////////////
// function searchoffer(searchTerm){
//   if(searchCache[searchTerm]){
//     console.log('serving from cache',searchTerm)
//     return Promise.resolve(searchCache[searchTerm]);
//   }
//   return fetch(`${searchUrl}${searchTerm}-jobs`)
//   .then(response=>response.text())
//   .then(body=>{
//     const offers=[];
//     const $ = cheerio.load(body);
//     $('.jobTuple').each(function(i,element){

//       const $element=$(element);

//       console.log(body)
//       const $title=$element.find('div.info a')
//     //   const $qtid=$title.attr('href').match(/Questions\/(.*)\//)[1]
//     //   const $qtlink=$element.find('a.title').attr('href')
//     //   const $date=$element.find('span.modified')
//     //   const $author=$element.find('span.author')
//     //   const $desc=$element.find('div.summary')
//     //   const $tags=$element.find('span.tags')
   
//       const offer={
//         // qtid:$qtid,
//         title:$title.text(),
//         // qtlink:$qtlink,
//         // date:$date.text(),
//         // author:$author.text(),
//         // desc:$desc.text(),
//         // tags:$tags.text().replace('\n\n\t\n\t\n','').replace('\n\t\n\t\n\n\t\n','').replace('\n','').replace('/n','').replace('\t\n\t','').replace('\t','')

//       };
//       offers.push(offer);
//   console.log($element)
//     });
//     return offers;
//   });
// }



function getjoboffer(jobid){
  return fetch(`${joburl}${jobid}&hit=a`)
    .then(response=>response.text())
    .then(body=>{
        
      const $ = cheerio.load(body)
      const $title=$('h3.job-pos-title').text()
      const $companyname=$('div.company-name').text()
      const $jobdate=$('div.job-date') .text();
      const $joblocation=$('span.job-location').text()
      const $jobdesc0=$('div.view-job-description').remove().text();
    //   const $jobdes1=$('div.view-job-description').remove($('div.view-job-description').children('p')).text()
   


    //   .children('td').eq(1)

      const joblocation=$joblocation;  
      const jobdesc=$jobdesc0
      const companyname=$companyname;
      const jobdate=$jobdate;
      const title=$title;
   
 
      return {title,
        jobdate,
        companyname,
        joblocation,
        jobdesc,
        

    }
     
    });
}




module.exports={
    searchoffer,
    getjoboffer
  
}
