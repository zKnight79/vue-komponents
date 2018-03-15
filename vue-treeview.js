/* 
 * Treeview using Vuejs
 * and default tree icons powered by Font Awesome 5 (CSS version)
 * v0.1.0
 * By Guillaume JIBAUT
 */

Vue.component('vue-treeview', {
    template: '<ul class="vue-treeview">' +
                '<li v-for="node in dataNodes">' +
                  '<a v-if="node.isFolder" v-on:click="onFolderClick(node)">'+
                    '<i v-bind:class="getNodeClass(node)"></i>&nbsp;' +
                  '</a>' +
                  '<span v-else>'+
                    '<i v-bind:class="getNodeClass(node)"></i>&nbsp;' +
                  '</span>' +
                  '<span v-html="node.label" v-bind:title="node.title"></span>' +
                  '<span v-if="node.__isLoading">' +
                    '&nbsp;<i v-bind:class="node.loadingIndicator"></i>&nbsp;' +
                  '</span>' +
                  '<vue-treeview v-if="node.isOpen" v-bind:data-nodes="node.children"></vue-treeview>' +
                '</li>' +
              '</ul>',
    props: {
        dataNodes: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    methods: {
        getNodeClass: function(node) {
            if(node.isFolder) {
                if(node.isOpen) {
                    return node.iconFolderOpen ? node.iconFolderOpen : 'far fa-folder-open';
                } else {
                    return node.iconFolderClosed ? node.iconFolderClosed : 'far fa-folder';
                }
            } else {
                return node.icon ? node.icon : 'far fa-file';
            }
        },
        onFolderClick: function(node) {
            if (node.hasOwnProperty('isOpen')) {
                node.isOpen = !node.isOpen;
            } else {
                Vue.set(node, 'isOpen', true);
            }
            if(node.isOpen) {
                if(node.lazyLoading) {
                    if(!node.hasOwnProperty('loadingIndicator')) {
                        Vue.set(node, 'loadingIndicator', 'fas fa-spinner fa-pulse');
                    }
                    Vue.set(node, '__isLoading', true);
                    if(typeof node.lazyLoadChildren === "function") {
                        node.lazyLoadChildren(this.lazyLoadingFinishedCallback);
                    }
                }
            }
        },
        lazyLoadingFinishedCallback: function(node) {
            node.__isLoading = false;
        }
    }
});

/*
Node fields
- label : The label to display for the node
- title (optional) : The title (often tooltip) of the node
- children (optional) : An array of sub-nodes
- isFolder (optional) : The node can be a folder, even if empty, can be used for lazy-loading
- isOpen (optional) : The folder is open
- icon (optional) : The icon to display, instead of default file icon, if the node is not a folder
- iconFolderClosed (optional) : The icon to display, instead of default closed folder icon, if the node is a folder and is not open
- iconFolderOpen (optional) : The icon to display, instead of default open folder icon, if the node is a folder and is open
- loadingIndicator (optional) : The information to display when the node is loading children data
- lazyLoadChildren (optional method) : 
*/