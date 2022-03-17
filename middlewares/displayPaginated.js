const displayPagination = async (req, res, next) => {
    const dataPerPage = +req.query.limit
    const currentPage = +req.query.page
    //The data which are populated by other functions to populate
    const dataToPaginate = req.dataToPaginate.data
    const totalPage = req.dataToPaginate.totalPage

    //This is reference to the previous page
    let nextPage;

    if (currentPage < totalPage) {
        nextPage = {
            page: currentPage + 1,
            limit: dataPerPage
        }
    }
    //This is reference to the previous page
    let prevPage;

    if (currentPage > 1 && currentPage <= totalPage + 1) {
        prevPage = {
            page: currentPage - 1,
            limit: dataPerPage
        }
    }
    //Embedding paginated data to the res
    res.json({
        prevPage, products:dataToPaginate, nextPage, totalPage
    }
    )
}

module.exports = displayPagination 