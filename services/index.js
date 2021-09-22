const axios = require('axios');

async function getData(url){
    const options = {
        'method': 'GET',
        'url': url,
        'headers': {
          'Content-Type': 'application/json'
        }
      };
    const result = await axios(options);
    return result.data;
}

async function fetchRepo(keyword){
    const url = 'https://api.github.com/search/repositories?q=' + keyword;
    let data1 = await getData(url);
    const data = data1.items;
    let filterData = [];
    //console.log(data[0].name);
    let ownerData = null;
    if(data.length>0){
    ownerData = await getData(data[0].owner.url);
    }
    for(let i=0;i<data.length;i++){
        //const branchData = getData(data.branches_url);
        let obj = {
            'name': data[i].name,
            'full_name': data[i].full_name,
            'private': data[i].private,
            'owner':{
                'login': data[i].owner.login,
                'name': ownerData.name,
                'followerCount': ownerData.followers,
                'followingCount': ownerData.following,
            },
            'licenseName': data[i].license ? data[i].license.name : null,
            'score': data[i].score,
            'numberOfBranch': data[i].branches_url
        }
        filterData.push(obj);
    }
    return filterData;
}

module.exports = {
    fetchRepo,
}