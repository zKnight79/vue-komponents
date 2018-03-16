var appPaginator = new Vue({
    el: '#paginator-app',
    data: {
        totalItems: 300,
        startIndex: 1
    },
    methods: {
        getDataList: function (pageNum, itemsPerPage, updatePaginationCallback) {
            this.startIndex = (pageNum - 1) * itemsPerPage + 1;

            if (typeof updatePaginationCallback === 'function') {
                updatePaginationCallback(
                    this.totalItems,
                    this.startIndex,
                    itemsPerPage
                );
            }
        }
    }
});
