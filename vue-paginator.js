/* 
 * Pagination using Vuejs
 * v0.1.0
 * By Guillaume JIBAUT
 */

Vue.component('vue-paginator', {
    template : '<ul class="vue-paginator">'
                +'<li v-bind:class="{ \'vue-paginator-active\': page.isActive, \'vue-paginator-disabled\': page.isDisabled }" v-for="page in pagination">'
                  +'<a href="#" v-on:click="changePage(page.targetPage)">'
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
            this.$emit('get-page-data', pageNum, this.itemsPerPage, this.updatePagination);
        },
        addToPagination : function(label, targetPage, isActive, isDisabled) {
            this.pagination.push({
                label: label,
                targetPage: targetPage,
                isActive: isActive,
                isDisabled: isDisabled
            });
        },
        updatePagination : function(totalItems, startIndex) {
            this.pagination = [];
            
            var currentPage = Math.ceil(startIndex / this.itemsPerPage);
            var lastPage = Math.ceil(totalItems / this.itemsPerPage);
            
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
        this.changePage(1);
    }
});
