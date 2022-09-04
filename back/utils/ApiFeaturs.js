class ApiFeaturs {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  } 


  search(){
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      :{};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  
  filter() {
const queryCopy={...this.queryStr}

     //removing some field
     const removeField=['keyword','page','limit'];
     removeField.forEach(key=>delete queryCopy[key])

     //price filter

     let queryStr=JSON.stringify(queryCopy);
     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
     this.query =this.query.find(JSON.parse(queryStr));
     return this


  }
  pagination(resultPP){
    const current = Number(this.queryStr.page) || 1;
    const skip=resultPP *(current-1)
    this.query =this.query.limit(resultPP).skip(skip)
    return this;

  }
}

module.exports = ApiFeaturs;
