const prepareCategory = (data, parent = null) => {
    // a main list to return
    let myCategories = []

    let currrentCategory;

    //This will only run first time to get root categories
    if (parent === null) {
        currrentCategory = data.filter(category => category.parent === undefined)
    }
    //This will run to find the
    else {
        currrentCategory = data.filter(category => category.parent === parent)
    }

    for(let category of currrentCategory){
        myCategories.push({
            name: category.name,
            //recursive call to find the childs of current category
            children : prepareCategory(data, category.name)
        })
    }
    return myCategories
}

module.exports = prepareCategory