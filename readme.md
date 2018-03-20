<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">

[Font Awesome 5]: https://www.fontawesome.com
[VueJS]: https://vuejs.org/
[demo]: https://github.com/zKnight79/vue-komponents/tree/master/demo

Vue Komponents
==============

Vue Komponents are a set of reusable [VueJS] components. They can be used in any web site using VueJS <i class="fab fa-vuejs fa-lg"></i>.

Their design goal is :
- Simple to use
- Easily customizable

You can check the demo to find out how to use them.

Vue Paginator
-------------

Pagination component, compatible with lazy loading, used to manage pagination of data.

You can customise the number of elements per page, the number of pages to display before displaying ellipsis, ...

To use it, you need to include VueJS and both JS and CSS files :
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
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

A treeview component, using [Font Awesome 5] (Web Fonts with CSS) for the icons <i class="fab fa-font-awesome-flag"></i> .

It supports lazy loading for folders. Icons can be customized.

The reason behind the "Web Fonts with CSS" version of Font Awesome 5 is simple :
When using the "SVG with JS" version, the `<i>` tag is replaced by a `<svg>` tag, and any VueJS binding for the tag will be broken.

To use it, you need to include VueJS, the "Web Fonts with CSS" version of Font Awesome 5, and both the treeview JS and CSS files :
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
<link rel="stylesheet" href="vue-treeview.css">
<script src="vue-treeview.js"></script>
```

Once done, create a VueJS app :
```javascript
var appTreeview = new Vue({
    el: '#treeview-app',
    data: {
        nodes: [{
                label: 'Root 1',
                isFolder: true,
                children: [
                    {
                        label: 'Folder 1.1',
                        isFolder: true,
                        children: [
                            {
                                label: 'Folder 1.1.1',
                                isFolder: true,
                                children: [{
                                        label: 'Node 1.1.1.1'
                                    },
                                    {
                                        label: 'Node 1.1.1.2'
                                    },
                                    {
                                        label: 'Node 1.1.1.3'
                                    }
                                ]
                            },
                            {
                                label: 'Node 1.1.2'
                            },
                            {
                                label: 'Node 1.1.3'
                            }
                        ]
                    },
                    {
                        label: 'Node 1.2'
                    },
                    {
                        label: 'Node 1.3'
                    }
                ]
            },
            {
                label: 'Root 2'
            },
            {
                label: 'Root 3'
            },
            {
                label: 'Root 4',
                isFolder: true,
                isOpen: true,
                children: [
                    {
                        label: 'Node 4.1'
                    },
                    {
                        label: 'Folder 4.2',
                        isFolder: true,
                        children: [
                            {
                                label: 'Node 4.2.1'
                            },
                            {
                                label: 'Node 4.2.2'
                            }
                        ]
                    },
                    {
                        label: 'Node 4.3',
                        onClick: function() {
                            alert('You clicked on Node 4.3');
                        }
                    }
                ]
            }
        ]
    }
});
```
You need to create an `Array` of `nodes` that will be used as the datasource of the treeview. I'll list nodes's fields below.

Now, just insert a `<vue-treeview>` tag inside the scope of your app :
```html
<div id="treeview-app">
    <vue-treeview v-bind:data-nodes="nodes" />
</div>
```
That's it.

The `<vue-treeview>` tag has several attributes :
+ `data-nodes` : An `Array` of nodes (default : `[]` )
+ `icon` : The default icon for non-folder nodes, as a css class that'll be put inside a `<i>` tag (default : `far fa-file` <i class="far fa-file"></i> )
+ `icon-folder-closed` : The default icon for closed folder nodes, as a css class that'll be put inside a `<i>` tag (default : `far fa-folder` <i class="far fa-folder"></i> )
+ `icon-folder-open` : The default icon for open folder nodes, as a css class that'll be put inside a `<i>` tag (default : `far fa-folder-open` <i class="far fa-folder-open"></i> )
+ `loading-indicator` : The default indicator displayed when a folder is currently lazy loading its children, as a css class that'll be put inside a `<i>` tag (default : `fas fa-spinner fa-pulse` <i class="fas fa-spinner fa-pulse"></i> )

The supported fields for a node are the following :
+ `label` : This is the text displayed for the node (ex: `"Node 1.2.3"`). This is the only field that is mandatory. You can use any html tag that can be put inside a `<span>`.
+ `title` : An optional title for the `<span>` that'll host the label. There'll be no title if the field is omitted.
+ `isFolder` : An optional boolean to indicate if the node is a folder or not. The node'll be a non-folder if the field is omitted.
+ `children` : An optional `Array` of sub-nodes, used if the node is set as a folder.
+ `lazyLoading` : An optional boolean to indicate if the node supports lazy loading. The node'll not support lazy loading if the field is omitted. Note that the `isFolder` field must be set to `true` in order to make the `lazyLoading` useful.
+ `lazyLoadChildren` : An optional method that'll be called to lazy load the children of the folder node when the end-user open it. The method takes one argument : a callback function that must be called when the loading is complete and which takes one argument, the reference of the node (`this`, in the method's scope).
+ `loadingIndicator` : An optional indicator for the node that replaces the global treeview `loading-indicator` (see the `loading-indicator` attribute of the `<vue-treeview>` for more details).
+ `icon` : An optional icon for the node that replaces the global treeview `icon` (see the `loading-indicator` attribute of the `<vue-treeview>` for more details).
+ `iconFolderClosed` : An optional icon for the node that replaces the global treeview `icon-folder-closed` (see the `icon-folder-closed` attribute of the `<vue-treeview>` for more details).
+ `iconFolderOpen` : An optional icon for the node that replaces the global treeview `icon-folder-open` (see the `icon-folder-open` attribute of the `<vue-treeview>` for more details).
+ `onClick` :  An optional method that'll be called when the node, if non-folder, is clicked.

Check the sources in the [demo] folder to find an example for both components.