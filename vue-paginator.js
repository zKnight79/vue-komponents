/* 
 * Pagination using Vuejs and Bootstrap 4.0.0
 * v0.1.0
 * By Guillaume JIBAUT
 */

Vue.component('vue-paginator', {
    template : '<ul class="pagination mb-0">'
                +'<li class="page-item" v-bind:class="{ active: page.isActive, \'disabled\': page.isDisabled }" v-for="page in pagination">'
                  +'<a class="page-link" href="#" v-on:click="changePage(page.targetPage)">'
                    +'{{ page.label }}'
                  +'</a>'
                +'</li>'
              +'</ul>',
    props : {
        itemsPerPage : {
            type : Number,
            default: 10
        },
        ellipsisDelta : {
            type : Number,
            default: 3
        },
        previousLabel : {
            type : String,
            default : "<"
        },
        nextLabel : {
            type : String,
            default : ">"
        }
    },
    data : function() {
        return {
            pagination: []
        };
    },
    methods : {
        changePage : function(pageNum) {
            this.$emit('get-page-data', pageNum, this.itemsPerPage);
        },
        addToPagination : function(label, targetPage, isActive, isDisabled) {
            this.pagination.push({
                label: label,
                targetPage: targetPage,
                isActive: isActive,
                isDisabled: isDisabled
            });
        },
        updatePagination : function(totalItems, startIndex, itemsPerPage) {
            this.pagination = [];
            
            var currentPage = Math.ceil(startIndex / itemsPerPage);
            var lastPage = Math.ceil(totalItems / itemsPerPage);
            
            var previousPage = Math.max(1, currentPage - 1);
            this.addToPagination(this.previousLabel, previousPage, false, (previousPage === currentPage));
            
            var ellipsisBefore = false;
            var ellipsisAfter = false;
            for(var i = 1; i <= lastPage; ++i) {
                if((Math.abs(i - currentPage) < this.ellipsisDelta) || (i===1) || (i === lastPage)) {
                    this.addToPagination("" + i, i, (i === currentPage), false);
                } else if(!ellipsisBefore && (i < currentPage)) {
                    this.addToPagination("...", 0, false, true);
                    ellipsisBefore = true;
                } else if(!ellipsisAfter && (i > currentPage)) {
                    this.addToPagination("...", 0, false, true);
                    ellipsisAfter = true;
                }
            }
            
            var nextPage = Math.min(lastPage, currentPage + 1);
            this.addToPagination(this.nextLabel, nextPage, false, (nextPage === currentPage));
        }
    },
    created : function() {
        this.$emit('set-pagination-callback', this.updatePagination);
        this.changePage(1);
    }
});
