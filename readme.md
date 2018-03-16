Vue Komponents
==============

Vue Komponents are a set of reusable VueJS components. They can be used in any web site using VueJS.

Their design goal is :
- Simple to use
- Easily customizable

You can check the demo to find out how to use them.

Vue Paginator
-------------

Pagination component, compatible with lazy loading, used to manage pagination of data.

You can customise the number of elements per page, the number of pages to display before displaying ellipsis, ...

To use it, you need to include both JS and CSS files :
```html
<link rel="stylesheet" href="vue-paginator.css">
<script src="vue-paginator.js"></script>
```

Once done, create a VueJS app :
```javascript
var appPaginator = new Vue({
    el: '#paginator-app',
    methods: {
        getDataList: function (pageNum, itemsPerPage, updatePaginationCallback) {
            var startIndex = (pageNum - 1) * itemsPerPage + 1;
            var totalItems = 300;
            if (typeof updatePaginationCallback === 'function') {
                updatePaginationCallback(
                    totalItems,
                    startIndex
                );
            }
        }
    }
});
```
All that you need, is at least a method that accepts 3 arguments :
+ The number of the page to load, 1-based
+ The number of items per page
+ A callback function, to update the pagination when the data are loaded

The callback function accepts 2 arguments :
+ the total number of items (used to compute the total number of pages)
+ The starting index of the data, 1-based (used to compute the number of the current page)

Now, just insert a `<vue-paginator>` tag inside the scope of your app :
```html
<div id="paginator-app">
    <vue-paginator v-on:get-page-data="getDataList" v-bind:items-per-page="12" v-bind:ellipsis-delta="3" previous-label="<-" next-label="->" />
</div>
```
There are 4 attributes and 1 event for the `<vue-paginator>` tag :
+ `items-per-page` : The number of items per page (default : `10`)
+ `ellipsis-delta` : The number of pages displayed around the current page (included) before displaying an ellipsis (default : `3`)
+ `previous-label` : The label for the previous page button (default : `<`)
+ `next-label` : The label for the next page button (default : `>`)
+ `get-page-data` : The method to call on page change event, in order to load page data. See the `getDataList` method in the VueJS app example above.

Vue Treeview
------------

A treeview component, using
[Font Awesome 5]
(Web Fonts with CSS) for the icons.

It supports lazy loading for folders.

Icons can be customized.

*Documentation coming soon ...*

[Font Awesome 5]: https://www.fontawesome.com