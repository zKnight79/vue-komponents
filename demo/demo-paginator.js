var appPaginator = new Vue({
    el: '#paginator-app',
    data: {
        totalItems: 300,
        startIndex: 1,
        updatePaginationCallback: undefined
    },
    methods: {
        getDataList: function (pageNum, itemsPerPage) {
            this.startIndex = (pageNum - 1) * itemsPerPage + 1;

            if (this.updatePaginationCallback !== undefined) {
                this.updatePaginationCallback(
                    this.totalItems,
                    this.startIndex,
                    itemsPerPage
                );
            }
        },
        setPaginationCallback(updatePaginationCallback) {
            this.updatePaginationCallback = updatePaginationCallback;
        }
    }
});
