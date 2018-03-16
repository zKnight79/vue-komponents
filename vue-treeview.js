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
                  '<vue-treeview v-if="node.isOpen" v-bind:data-nodes="node.children"' +
                                                  ' v-bind:icon="icon"' +
                                                  ' v-bind:icon-folder-closed="iconFolderClosed"' +
                                                  ' v-bind:icon-folder-open="iconFolderOpen"' +
                                                  ' v-bind:loading-indicator="loadingIndicator"' +
                  ' />' +
                '</li>' +
              '</ul>',
    props: {
        dataNodes: {
            type: Array,
            default: function () {
                return [];
            }
        },
        icon: {
            type: String,
            default: 'far fa-file'
        },
        iconFolderClosed: {
            type: String,
            default: 'far fa-folder'
        },
        iconFolderOpen: {
            type: String,
            default: 'far fa-folder-open'
        },
        loadingIndicator: {
            type: String,
            default: 'fas fa-spinner fa-pulse'
        }
    },
    methods: {
        getNodeClass: function(node) {
            if(node.isFolder) {
                if(node.isOpen) {
                    return node.iconFolderOpen ? node.iconFolderOpen : this.iconFolderOpen;
                } else {
                    return node.iconFolderClosed ? node.iconFolderClosed : this.iconFolderClosed;
                }
            } else {
                return node.icon ? node.icon : this.icon;
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
                        Vue.set(node, 'loadingIndicator', this.loadingIndicator);
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