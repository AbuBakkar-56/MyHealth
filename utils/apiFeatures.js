class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['sort', 'page', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        for (const key in queryObj) {
            queryObj[key] = { $regex: queryObj[key], $options: 'i' };
        }
        this.query.find(queryObj);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query.sort('Expirience')
        }
        return this;
    }

    paginate() {
        if (this.queryString.page) {
            const page = this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 10;
            const skip = (page - 1) * limit;
            this.query.skip(skip).limit(limit);
        }
        return this;
    }    
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
}

module.exports = ApiFeatures;
