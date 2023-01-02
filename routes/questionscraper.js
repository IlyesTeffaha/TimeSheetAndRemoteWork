const { Cheerio } = require('cheerio')
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const res = require('express/lib/response');

const searchCache={};

const searchUrl = 'https://www.codeproject.com/search.aspx?q=';
const questionUrl='https://www.codeproject.com/Questions/'

function searchqt(searchTerm){
  if(searchCache[searchTerm]){
    console.log('serving from cache',searchTerm)
    return Promise.resolve(searchCache[searchTerm]);
  }
  return fetch(`${searchUrl}${searchTerm}&doctypeid=4`)
  .then(response=>response.text())
  .then(body=>{
    const questions=[];
    const $ = cheerio.load(body);
    $('.entry').each(function(i,element){

      const $element=$(element);

      
      const $title=$element.find('span.title a')
      const $qtid=$title.attr('href').match(/Questions\/(.*)\//)[1]
      const $qtlink=$element.find('span.title a').attr('href')
      const $date=$element.find('span.modified')
      const $author=$element.find('span.author')
      const $desc=$element.find('div.summary')
      const $tags=$element.find('span.tags')
    
    
      const question={
        qtid:$qtid,
        title:$title.text(),
        qtlink:$qtlink,
        date:$date.text(),
        author:$author.text(),
        desc:$desc.text(),
        tags:$tags.text().replace('\n\n\t\n\t\n','').replace('\n\t\n\t\n\n\t\n','').replace('\n','').replace('/n','').replace('\t\n\t','').replace('\t','')

      };
      questions.push(question);
  
    });
    return questions;
  });
}



function getquestion(qtid,title){
  return fetch(`${questionUrl}${qtid}/${title}`)
    .then(response=>response.text())
    .then(body=>{
      const $ = cheerio.load(body)
      const $title=$('.header h1').text()
      const $content=$('.container-content div').text()
      return {$content}
    })
}



module.exports={
  searchqt,
  getquestion
}
