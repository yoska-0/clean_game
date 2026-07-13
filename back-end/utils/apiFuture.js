class ApiFuture {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  paginate() {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFuture;
