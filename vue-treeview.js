/* 
 * Treeview using Vuejs
 * and default tree icons powered by Font Awesome 5 (CSS version)
 * v0.1.0
 * By Guillaume JIBAUT
 */

Vue.component('vue-treeview', {
    template: '<ul class="vue-treeview">' +
                '<li v-for="node in dataNodes">' +
                  '<a v-on:click="onNodeClick(node)">'+
                    '<i v-bind:class="getNodeClass(node)"></i>&nbsp;' +
                    '<span v-html="node.label" v-bind:title="node.title"></span>' +
                  '</a>' +
                  '<span v-if="node.__isLoading">' +
                    '&nbsp;<i v-bind:class="node.loadingIndicator"></i>&nbsp;' +
                  '</span>' +
                  '<vue-treeview v-if="node.isOpen" v-bind:data-nodes="node.children"' +
                                                  ' v-bind:icon="icon"' +
                                                  ' v-bind:icon-folder-closed="iconFolderClosed"' +
                                                  ' v-bind:icon-folder-open="iconFolderOpen"' +
                                                  ' v-bind:loading-indicator="loadingIndicator"' +
                                                  ' v-bind:dev-mode="devMode"' +
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
        },
        devMode: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        logInfo: function() {
            if(this.devMode) {
                console.log(...arguments);
            }
        },
        getNodeClass: function(node) {
            var nodeClass;
            
            if(node.isFolder) {
                if(node.isOpen) {
                    nodeClass = node.iconFolderOpen ? node.iconFolderOpen : this.iconFolderOpen;
                } else {
                    nodeClass = node.iconFolderClosed ? node.iconFolderClosed : this.iconFolderClosed;
                }
            } else {
                nodeClass = node.icon ? node.icon : this.icon;
            }
            
            this.logInfo('Class for node', node, nodeClass);

            return nodeClass;
        },
        onNodeClick: function(node) {
            this.logInfo('A node was clicked', node);
            if(node.isFolder) {
                this.logInfo('  it\'s a folder');
                if (node.hasOwnProperty('isOpen')) {
                    node.isOpen = !node.isOpen;
                    this.logInfo('  Folder toggled');
                } else {
                    Vue.set(node, 'isOpen', true);
                    this.logInfo('  Folder opened');
                }
                if(node.isOpen) {
                    this.logInfo('  The folder is now open');
                    if(node.lazyLoading && (typeof node.lazyLoadChildren === "function")) {
                        this.logInfo('  The folder supports lazy-loading');
                        if(!node.hasOwnProperty('loadingIndicator')) {
                            Vue.set(node, 'loadingIndicator', this.loadingIndicator);
                        }
                        Vue.set(node, '__isLoading', true);
                        node.lazyLoadChildren(this.lazyLoadingFinishedCallback);
                        this.logInfo('  lazyLoadChildren() called');
                    }
                } else {
                    this.logInfo('  The folder is now closed');
                }
            } else {
                this.logInfo('  it\'s not a folder');
                if(typeof node.onClick === "function") {
                    this.logInfo('  The node has an onClick method, so let\'s call it');
                    node.onClick();
                }
            }
        },
        lazyLoadingFinishedCallback: function(node) {
            this.logInfo('Lazy-loading is finished for', node);
            node.__isLoading = false;
        }
    }
});